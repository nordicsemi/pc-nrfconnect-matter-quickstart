/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { logger } from '@nordicsemiconductor/pc-nrfconnect-shared';
import { type ChildProcess, spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { AppThunk, RootState } from '../../../app/store';
import {
    DeviceWithSerialnumber,
    reset,
} from '../../../features/device/deviceLib';
import { selectedDeviceIsConnected } from '../../../features/device/deviceSlice';
import { setResponse } from './verifySlice';

/** SEGGER J-Link RTT Logger CLI (part of J-Link Software Pack). Writes to a file (path as last arg). */
const JLINK_RTT_LOGGER =
    process.platform === 'win32' ? 'JLinkRTTLogger.exe' : 'JLinkRTTLogger';
const RTT_DEVICE = 'NRF54L15_M33';
const RTT_CHANNEL = 0;
const RTT_SPEED = 4000;

/** Poll the log file often to drain it quickly and avoid back-pressure */
const RTT_POLL_INTERVAL_MS = 50;

/** After logger exits (e.g. device reset), reconnect quickly so we don't miss boot logs */
const RTT_RESTART_DELAY_MS = 100;

/** First reset early to trigger a boot we can capture; Device Configuration prints ~1s into boot so we reconnect ASAP. */
const RTT_FIRST_RESET_DELAY_MS = 1000;
const RTT_RESET_INTERVAL_MS = 4000;
const RTT_RESET_COUNT = 3;

export default (
        device: DeviceWithSerialnumber
    ): AppThunk<RootState, Promise<() => void>> =>
    (dispatch, getState) => {
        if (!selectedDeviceIsConnected(getState())) {
            throw new Error('No development kit connected.');
        }

        const serialNumberStr = device.serialNumber;
        if (!serialNumberStr) {
            throw new Error('Device has no J-Link serial number.');
        }

        const baseArgs = [
            '-Device',
            RTT_DEVICE,
            '-if',
            'SWD',
            '-Speed',
            String(RTT_SPEED),
            '-RTTChannel',
            String(RTT_CHANNEL),
            '-SelectEmuBySN',
            serialNumberStr,
        ];

        let currentLogFilePath = path.join(
            os.tmpdir(),
            `jlink-rtt-${Date.now()}-${process.pid}.log`
        );

        let child: ChildProcess | undefined;
        let stopped = false;
        let lastReadSize = 0;
        let receivedFirstChunk = false;
        let pollId: ReturnType<typeof setInterval> | undefined;
        let restartTimeout: ReturnType<typeof setTimeout> | undefined;
        const resetTimeouts: ReturnType<typeof setTimeout>[] = [];

        const pollLogFile = () => {
            try {
                const logPath = currentLogFilePath;
                if (!fs.existsSync(logPath)) return;
                const stat = fs.statSync(logPath);
                if (stat.size < lastReadSize) lastReadSize = 0;
                if (stat.size <= lastReadSize) return;
                const readLen = stat.size - lastReadSize;
                const fd = fs.openSync(logPath, 'r');
                try {
                    const buf = new Uint8Array(readLen);
                    fs.readSync(
                        fd,
                        buf as NodeJS.ArrayBufferView,
                        0,
                        readLen,
                        lastReadSize
                    );
                    lastReadSize = stat.size;
                    const chunk = new TextDecoder().decode(buf);
                    if (chunk) {
                        if (!receivedFirstChunk) {
                            receivedFirstChunk = true;
                        }
                        dispatch(setResponse(chunk));
                    }
                } finally {
                    fs.closeSync(fd);
                }
            } catch (e) {
                logger.debug('J-Link RTT: poll read error', e);
            }
        };

        const startLogger = () => {
            if (stopped) return;
            currentLogFilePath = path.join(
                os.tmpdir(),
                `jlink-rtt-${Date.now()}-${process.pid}.log`
            );
            lastReadSize = 0;
            const args = [...baseArgs, currentLogFilePath];
            try {
                child = spawn(JLINK_RTT_LOGGER, args, {
                    // Keep stdin open (pipe, never closed) so JLinkRTTLogger stays in "Press any key to quit" and does not exit on EOF.
                    stdio: ['pipe', 'pipe', 'pipe'],
                });
                child.stdin?.on('error', () => {});
            } catch (e) {
                logger.error('J-Link RTT: failed to spawn JLinkRTTLogger', e);
                return;
            }
            child.on('close', () => {
                child = undefined;
                // Flush any remaining log file content from this session (next session will use a new file)
                try {
                    const logPath = currentLogFilePath;
                    if (fs.existsSync(logPath)) {
                        const stat = fs.statSync(logPath);
                        if (stat.size > lastReadSize) {
                            const readLen = stat.size - lastReadSize;
                            const fd = fs.openSync(logPath, 'r');
                            try {
                                const buf = new Uint8Array(readLen);
                                fs.readSync(
                                    fd,
                                    buf as NodeJS.ArrayBufferView,
                                    0,
                                    readLen,
                                    lastReadSize
                                );
                                const chunk = new TextDecoder().decode(buf);
                                if (chunk) dispatch(setResponse(chunk));
                            } finally {
                                fs.closeSync(fd);
                            }
                        }
                    }
                } catch {
                    // ignore flush read errors
                }
                lastReadSize = 0;
                if (stopped) return;
                restartTimeout = setTimeout(() => {
                    restartTimeout = undefined;
                    startLogger();
                }, RTT_RESTART_DELAY_MS);
            });
        };

        startLogger();
        pollId = setInterval(pollLogFile, RTT_POLL_INTERVAL_MS);

        const scheduleReset = (delayMs: number) => {
            resetTimeouts.push(
                setTimeout(() => {
                    if (stopped) return;
                    reset(device).catch(() => {
                        // ignore reset errors
                    });
                }, delayMs)
            );
        };
        for (let i = 0; i < RTT_RESET_COUNT; i += 1) {
            scheduleReset(RTT_FIRST_RESET_DELAY_MS + i * RTT_RESET_INTERVAL_MS);
        }

        const cleanup = () => {
            stopped = true;
            resetTimeouts.forEach(t => clearTimeout(t));
            resetTimeouts.length = 0;
            if (restartTimeout !== undefined) {
                clearTimeout(restartTimeout);
                restartTimeout = undefined;
            }
            if (pollId !== undefined) {
                clearInterval(pollId);
                pollId = undefined;
            }
            // Final read so we don't lose data written after the last poll
            try {
                const logPath = currentLogFilePath;
                if (fs.existsSync(logPath)) {
                    const stat = fs.statSync(logPath);
                    if (stat.size > lastReadSize) {
                        const readLen = stat.size - lastReadSize;
                        const fd = fs.openSync(logPath, 'r');
                        try {
                            const buf = new Uint8Array(readLen);
                            fs.readSync(
                                fd,
                                buf as NodeJS.ArrayBufferView,
                                0,
                                readLen,
                                lastReadSize
                            );
                            const chunk = new TextDecoder().decode(buf);
                            if (chunk) dispatch(setResponse(chunk));
                        } finally {
                            fs.closeSync(fd);
                        }
                    }
                }
            } catch {
                // ignore
            }
            if (child?.pid) {
                // Tell JLinkRTTLogger to quit (it waits for "Press any key") so it exits quickly
                try {
                    if (child.stdin?.writable) {
                        child.stdin.write('\n');
                        child.stdin.end();
                    }
                } catch {
                    // ignore stdin errors
                }
                // Force kill after short delay if it did not exit on its own
                const forceKillTimeout = setTimeout(() => {
                    if (child?.pid) {
                        try {
                            child.kill('SIGTERM');
                        } catch {
                            // ignore kill errors
                        }
                        child = undefined;
                    }
                }, 200);
                child.once('close', () => clearTimeout(forceKillTimeout));
            }
        };

        return Promise.resolve(cleanup);
    };
