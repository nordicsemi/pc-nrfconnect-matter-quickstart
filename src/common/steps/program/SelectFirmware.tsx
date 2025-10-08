/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import {
    deviceInfo,
    telemetry,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import { selectFirmwareWithoutProgrammingOption } from '../../../app/devOptions';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import {
    Choice,
    getSelectedDeviceUnsafely,
    setChoice,
} from '../../../features/device/deviceSlice';
import { SampleWithRefAndDescription } from '../../../features/flows/commonResources';
import { Back } from '../../Back';
import Link from '../../Link';
import { RadioSelect } from '../../listSelect/RadioSelect';
import Main from '../../Main';
import { Next } from '../../Next';
import { startProgramming } from './programEffects';

export default ({
    choices,
    sampleCommonConfig,
}: {
    choices: Choice[];
    sampleCommonConfig: SampleWithRefAndDescription[];
}) => {
    const dispatch = useAppDispatch();
    const device = useAppSelector(getSelectedDeviceUnsafely);
    const [selected, setSelected] = React.useState<Choice | undefined>();

    const items = choices.map(choice => {
        const isSelected = selected?.name === choice.name;
        return {
            id: choice.name,
            selected: isSelected,
            content: (
                <div className="tw-flex tw-flex-row tw-items-start tw-justify-start">
                    <div className="tw-w-32 tw-flex-shrink-0 tw-pr-5">
                        <b>{choice.name}</b>
                    </div>
                    <div className="tw-flex tw-flex-col tw-justify-start">
                        <div className="tw-text-sm">
                            {
                                sampleCommonConfig.find(
                                    config => config.ref === choice.name
                                )?.description
                            }
                        </div>
                        {choice.documentation && (
                            <div className="tw-pt-px tw-text-xs">
                                <Link
                                    label={choice.documentation.label}
                                    href={choice.documentation.href}
                                    color={
                                        isSelected
                                            ? 'hover:tw-text-gray-50'
                                            : 'hover:tw-text-gray-700'
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            ),
        };
    });

    return (
        <Main>
            <Main.Content
                heading="Select an application to program"
                subHeading="Use one of the following samples as a reference for creating your application. This device works as a Matter accessory device, meaning it can be paired and controlled remotely over a Matter network built on top of a low-power 802.15.4 Thread network."
            >
                <RadioSelect
                    items={items}
                    onSelect={item =>
                        setSelected(
                            choices.find(choice => choice.name === item.id)
                        )
                    }
                />
            </Main.Content>
            <Main.Footer>
                <Back />
                {selectFirmwareWithoutProgrammingOption && (
                    <Next
                        label="Select (Don't program)"
                        disabled={!selected}
                        onClick={next => {
                            if (!selected) return;

                            dispatch(setChoice(selected));
                            next();
                        }}
                    />
                )}
                <Next
                    label="Program"
                    disabled={!selected}
                    onClick={() => {
                        if (!selected) return;

                        telemetry.sendEvent('Select firmware', {
                            fwName: selected.name,
                            deviceName:
                                deviceInfo(device).name ?? 'Unknown device',
                        });

                        dispatch(setChoice(selected));
                        dispatch(startProgramming());
                    }}
                />
            </Main.Footer>
        </Main>
    );
};
