/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useState } from 'react';
import { IssueBox } from '@nordicsemiconductor/pc-nrfconnect-shared';
import describeError from '@nordicsemiconductor/pc-nrfconnect-shared/src/logging/describeError';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import { getSelectedDeviceUnsafely } from '../../../features/device/deviceSlice';
import { getFlowContext } from '../../../features/flow/flowSlice';
import { Back } from '../../Back';
import Main from '../../Main';
import { Next } from '../../Next';
import Verifying from '../../Verifying';
import runVerificationRtt from './jlinkRtt';
import runVerification from './serialport';
import { getError, getResponse, reset, setError } from './verifySlice';

import './cursor.scss';

const stripLogFormatting = (s: string): string =>
    s
        // eslint-disable-next-line no-control-regex -- match ANSI escape sequences
        .replace(/\x1b\[[0-9;]*m/g, '')
        .replace(/\[\d+(;\d+)*m/g, '')
        .replace(/\[\d{2}:\d{2}:\d{2}\.\d{3},\d{3}\]\s*/g, '');

export default ({
    vComIndex,
    regex,
    ref,
}: {
    vComIndex: number;
    regex: RegExp;
    ref: string;
}) => {
    const dispatch = useAppDispatch();
    const device = useAppSelector(getSelectedDeviceUnsafely);
    const response = useAppSelector(getResponse);
    const error = useAppSelector(getError);
    const platformVariant = useAppSelector(state =>
        getFlowContext(state, 'selectedPlatformVariant')
    ) as { dkName?: string } | undefined;
    const useJLinkRtt = platformVariant?.dkName === 'nRF54L15 TAG';
    const [cleanup, setCleanup] = useState<() => void>();
    const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout>();
    const [validResponse, setValidResponse] = useState<string>();
    const waiting = !error && !validResponse;

    useEffect(() => {
        if (!error && !response) {
            // May receive the end of device output after programming reset if user pressed next too quickly
            const runVerificationThunk = useJLinkRtt
                ? runVerificationRtt(device)
                : runVerification(device, vComIndex);
            setTimeout(() => {
                dispatch(runVerificationThunk)
                    .then(cl => {
                        setCleanup(() => cl);
                        setErrorTimeout(
                            setTimeout(() => {
                                cl();
                                setErrorTimeout(undefined);
                                dispatch(
                                    setError(
                                        'Timed out or did not receive expected value'
                                    )
                                );
                            }, 5000)
                        );
                    })
                    .catch(e => dispatch(setError(describeError(e))));
            }, 5000);
        }
    }, [dispatch, response, error, device, vComIndex, useJLinkRtt, regex]);

    useEffect(() => {
        if (!validResponse) {
            const raw = response || '';
            const normalized = stripLogFormatting(raw);
            const [, match] = normalized.match(regex) ?? [];
            if (match) {
                // Extract Product Name from the response
                const productNameMatch = raw.match(/Product Name:\s*(.+)/);
                if (productNameMatch) {
                    const productName = productNameMatch[1]
                        // eslint-disable-next-line no-control-regex -- strip ANSI
                        .replace(/\x1b\[[0-9;]*m/g, '')
                        .replace(/\[\d+(;\d+)*m/g, '')
                        .trim();
                    // Verify Product Name matches the expected ref value
                    if (productName !== ref) {
                        if (cleanup) cleanup();
                        if (errorTimeout) clearTimeout(errorTimeout);
                        setCleanup(undefined);
                        setErrorTimeout(undefined);
                        dispatch(
                            setError(
                                `Product Name mismatch: Expected "${ref}" but got "${productName}"`
                            )
                        );
                        return;
                    }
                }
                setValidResponse(match);
            }
        }
    }, [response, validResponse, regex, errorTimeout, cleanup, ref, dispatch]);

    useEffect(() => {
        if (!(validResponse && cleanup && errorTimeout)) return;
        const delayMs = 150;
        const id = setTimeout(() => {
            cleanup();
            clearTimeout(errorTimeout);
            setCleanup(undefined);
            setErrorTimeout(undefined);
        }, delayMs);
        return () => clearTimeout(id);
    }, [validResponse, cleanup, errorTimeout]);

    const getHeading = () => {
        if (error) {
            return 'Verification failed';
        }
        if (!waiting) {
            return 'Verification successful';
        }
        return 'Verifying';
    };

    const filterAndCleanLogs = (logs: string) => {
        const relevantKeywords = [
            'Serial Number',
            'Vendor Id',
            'Product Id',
            'Product Name',
            'Hardware Version',
            'Setup Pin Code',
            'Setup Discriminator',
        ];

        return logs
            .split('\n')
            .filter(line =>
                relevantKeywords.some(keyword => line.includes(keyword))
            )
            .map(line => {
                const cleaned = stripLogFormatting(line);
                return cleaned
                    .replace(/^I:\s*\d+\s*\[DL\]\s*/, '')
                    .replace(/^<inf>\s+\w+:\s*\[DL\]\s*/, '')
                    .replace(/^\[DL\]\s*/, '')
                    .trim();
            })
            .filter(Boolean);
    };

    return (
        <Main>
            <Main.Content heading={getHeading()}>
                {waiting && (
                    <Verifying jlinkRtt={useJLinkRtt && !validResponse} />
                )}
                {validResponse && (
                    <div className="tw-flex tw-flex-col tw-gap-1">
                        <div className="tw-font-medium">
                            {useJLinkRtt
                                ? 'J-Link RTT output from the sample:'
                                : 'Serial output from the sample:'}
                        </div>
                        <div className="alt-font tw-relative tw-mt-4 tw-min-h-[4rem] tw-break-words tw-bg-gray-700 tw-p-4 tw-pr-14 tw-text-gray-50">
                            {filterAndCleanLogs(response || '').map(line => (
                                <p key={line.slice(0, 40)}>{line}</p>
                            ))}
                            <div className="tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2">
                                <span className="mdi mdi-circle tw-top-0.5 tw-z-0 tw-text-4xl tw-text-green" />
                                <span className="mdi-check-bold mdi tw-absolute tw-left-1.5 tw-top-1 tw-z-10 tw-text-2xl tw-text-white" />
                            </div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="tw-pt-4">
                        <IssueBox
                            mdiIcon="tw-mdi-alert"
                            color="tw-text-red"
                            title={error}
                        />
                    </div>
                )}
            </Main.Content>
            <Main.Footer>
                <Back disabled={waiting} />
                {error ? (
                    <Next label="Retry" onClick={() => dispatch(reset())} />
                ) : (
                    <Next disabled={waiting || !!error} />
                )}
            </Main.Footer>
        </Main>
    );
};
