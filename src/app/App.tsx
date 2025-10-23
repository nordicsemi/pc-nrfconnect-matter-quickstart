/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect } from 'react';
import { getCurrentWindow } from '@electron/remote';
import { logger, telemetry } from '@nordicsemiconductor/pc-nrfconnect-shared';
import { setNrfutilLogger } from '@nordicsemiconductor/pc-nrfconnect-shared/nrfutil';
import { NrfutilDeviceLib } from '@nordicsemiconductor/pc-nrfconnect-shared/nrfutil/device';

import { startWatchingDevices } from '../features/device/deviceLib';
import { addDevice, removeDevice } from '../features/device/deviceSlice';
import Flow from '../features/flow';
import { startWatchingFormattedThingyDevices } from '../features/flow/connect/DetectThingy';
import Header from './Header';
import { useAppDispatch } from './store';

import './App.scss';

telemetry.enableTelemetry();

const useDevicesInStore = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Watch regular devices
        const stopWatchingDevicesPromise = startWatchingDevices(
            device => dispatch(addDevice(device)),
            deviceId => dispatch(removeDevice(deviceId))
        );

        // Watch Thingy devices with proper formatting for deviceInfo
        const currentThingyDevices = new Map();
        const stopWatchingThingyPromise = startWatchingFormattedThingyDevices(
            formattedThingyDevices => {
                // Handle removed devices
                currentThingyDevices.forEach((device, deviceId) => {
                    if (!formattedThingyDevices.find(d => d.id === deviceId)) {
                        dispatch(removeDevice(deviceId));
                    }
                });

                // Handle added/updated devices
                formattedThingyDevices.forEach(formattedDevice => {
                    const existingDevice = currentThingyDevices.get(
                        formattedDevice.id
                    );
                    // Only dispatch if device is new OR if mcuBoot trait has changed
                    const shouldUpdate =
                        !existingDevice ||
                        existingDevice.traits?.mcuBoot !==
                            formattedDevice.traits?.mcuBoot;

                    if (shouldUpdate) {
                        dispatch(addDevice(formattedDevice));
                    }
                    currentThingyDevices.set(
                        formattedDevice.id,
                        formattedDevice
                    );
                });
            },
            error => {
                logger.error('Thingy device watching error:', error);
            }
        );

        return () => {
            stopWatchingDevicesPromise.then(stopWatchingDevices =>
                stopWatchingDevices()
            );
            stopWatchingThingyPromise.then(stopWatchingThingy =>
                stopWatchingThingy()
            );
        };
    }, [dispatch]);
};

export const App = () => {
    useEffect(() => {
        logger.initialise();
        setNrfutilLogger(logger);
        NrfutilDeviceLib.setLogLevel('error');

        // Set window as non-resizable with fixed size
        // TODO: Remove this workaround once Launcher supports fixed size windows
        const window = getCurrentWindow();
        window.setResizable(false);
        window.setContentSize(1200, 768);
    }, []);
    useDevicesInStore();

    return (
        <div className="tw-flex tw-h-full tw-w-full tw-flex-col">
            <Header />
            <div className="tw-flex tw-h-full tw-flex-row tw-overflow-hidden">
                <Flow />
            </div>
        </div>
    );
};
