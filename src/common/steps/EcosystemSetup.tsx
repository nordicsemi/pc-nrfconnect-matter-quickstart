/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';

import { getSelectedEcosystem } from '../../features/flows/ecosystemConfig';
import { Back } from '../Back';
import Guide from '../Guide';
import Main from '../Main';
import { Next } from '../Next';

const EcosystemSetupStep = () => {
    const ecosystem = getSelectedEcosystem();

    return (
        <Main>
            <Main.Content
                heading={`Set up requirements for ${ecosystem?.name}`}
                subHeading={`Complete the following steps to set up ${ecosystem?.hubName} for ${ecosystem?.name}:`}
            >
                <Guide
                    ecosystem={ecosystem}
                    steps={ecosystem?.setupManual}
                    mediaSrc={ecosystem?.setupVideo}
                />
            </Main.Content>
            <Main.Footer>
                <Back />
                <Next
                    onClick={next => {
                        next();
                    }}
                />
            </Main.Footer>
        </Main>
    );
};

export default () => ({
    name: 'Setup',
    component: EcosystemSetupStep,
});
