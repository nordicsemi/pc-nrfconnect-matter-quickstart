/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';

import { useAppSelector } from '../../../app/store';
import { Choice } from '../../../features/device/deviceSlice';
import { SampleWithRefAndDescription } from '../../../features/flows/commonResources';
import Program from './Program';
import { getProgrammingProgress } from './programSlice';
import SelectFirmware from './SelectFirmware';

const ProgramStep = ({
    choices,
    sampleCommonConfig,
}: {
    choices: Choice[];
    sampleCommonConfig: SampleWithRefAndDescription[];
}) => {
    const hasStartedProgramming = !!useAppSelector(getProgrammingProgress);

    return hasStartedProgramming ? (
        <Program />
    ) : (
        <SelectFirmware
            choices={choices}
            sampleCommonConfig={sampleCommonConfig}
        />
    );
};

export default (
    choices: Choice[],
    sampleCommonConfig: SampleWithRefAndDescription[]
) => ({
    name: 'Program',
    component: () => ProgramStep({ choices, sampleCommonConfig }),
});
