/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';

import { useAppDispatch } from '../../../app/store';
import { cliCommonConfig } from '../../../features/flows/commonResources';
import { Back } from '../../Back';
import Main from '../../Main';
import { Next } from '../../Next';
import { Resource } from '../../Resource';
import { DevelopState, setDevelopState } from './developSlice';

export default () => {
    const dispatch = useAppDispatch();

    return (
        <Main>
            <Main.Content heading="Set up the nRF Connect SDK for command line">
                <div className="tw-flex tw-flex-col tw-gap-6">
                    {cliCommonConfig.map(resource => (
                        <Resource
                            label={resource.label}
                            description={resource.description}
                            link={resource.link}
                            key={resource.label}
                        />
                    ))}
                </div>
            </Main.Content>
            <Main.Footer>
                <Back
                    onClick={() => {
                        dispatch(setDevelopState(DevelopState.CHOOSE));
                    }}
                />
                <Next />
            </Main.Footer>
        </Main>
    );
};
