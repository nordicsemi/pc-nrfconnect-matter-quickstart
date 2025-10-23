/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import { getSelectedDeviceUnsafely } from '../../../features/device/deviceSlice';
import { goToNextStep } from '../../../features/flow/flowSlice';
import { Back } from '../../Back';
import Guide from '../../Guide';
import Main from '../../Main';

const VerifyBootloaderStep = () => {
    const device = useAppSelector(getSelectedDeviceUnsafely);
    const dispatch = useAppDispatch();
    const hasNavigatedRef = useRef(false);
    const guideManual = [
        "Remove the top part of the Thingy:53's cover.",
        'Power off the device using **SW1** switch.',
        'Find the small **SW2** button that is located near the big center button.',
        'Press and hold the **SW2** button.',
        'Power on the device using **SW1** switch (keep pressing **SW2** button).',
        'Release the **SW2** button.',
    ];

    useEffect(() => {
        if (device.traits.mcuBoot === true && !hasNavigatedRef.current) {
            hasNavigatedRef.current = true;
            dispatch(goToNextStep());
        } else if (device.traits.mcuBoot === false && hasNavigatedRef.current) {
            hasNavigatedRef.current = false;
        }
    }, [device.traits.mcuBoot, dispatch]);

    return (
        <Main>
            <Main.Content
                heading="Enter bootloader mode"
                subHeading="Make sure that the device is in bootloader mode, which is required to program it using Device Firmware Upgrade."
            >
                <div className="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8">
                    <Guide steps={guideManual} />
                    <img
                        src="../resources/devices/images/thingy53_bootloader_mode.png"
                        alt="Enabling bootloader mode"
                        className="tw-mx-5 tw-mt-[10px] tw-max-h-[200px] tw-w-auto tw-rounded-lg"
                    />
                    <div className="tw-text-sm tw-font-light">
                        Once the device is in bootloader mode, the app will
                        automatically proceed to the next step.
                    </div>
                </div>
            </Main.Content>
            <Main.Footer>
                <Back />
            </Main.Footer>
        </Main>
    );
};

export default () => ({
    name: 'Verify Bootloader',
    component: () => VerifyBootloaderStep(),
});
