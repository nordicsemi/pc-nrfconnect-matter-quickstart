/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useMemo } from 'react';

import { useAppSelector } from '../../../app/store';
import { Choice } from '../../../features/device/deviceSlice';
import { getFlowContext } from '../../../features/flow/flowSlice';
import { SampleWithRefAndDescription } from '../../../features/flows/commonResources';
import Program from './Program';
import { getProgrammingProgress } from './programSlice';
import SelectFirmware from './SelectFirmware';

export interface ProgramStepOptions {
    /** Filter choices by flow context (e.g. selected board). Receives full flowContext from Redux. */
    filterChoicesByContext?: (
        choices: Choice[],
        flowContext: Record<string, unknown>
    ) => Choice[];
}

const ProgramStep = ({
    choices,
    sampleCommonConfig,
    filterChoicesByContext,
}: {
    choices: Choice[];
    sampleCommonConfig: SampleWithRefAndDescription[];
    filterChoicesByContext?: ProgramStepOptions['filterChoicesByContext'];
}) => {
    const hasStartedProgramming = !!useAppSelector(getProgrammingProgress);
    const flowContext = useAppSelector(
        state => getFlowContext(state) as Record<string, unknown>
    );
    const effectiveChoices = useMemo(
        () =>
            filterChoicesByContext != null
                ? filterChoicesByContext(choices, flowContext ?? {})
                : choices,
        [choices, flowContext, filterChoicesByContext]
    );

    return hasStartedProgramming ? (
        <Program />
    ) : (
        <SelectFirmware
            choices={effectiveChoices}
            sampleCommonConfig={sampleCommonConfig}
        />
    );
};

export default (
    choices: Choice[],
    sampleCommonConfig: SampleWithRefAndDescription[],
    options?: ProgramStepOptions
) => ({
    name: 'Program',
    component: () =>
        ProgramStep({
            choices,
            sampleCommonConfig,
            filterChoicesByContext: options?.filterChoicesByContext,
        }),
});
