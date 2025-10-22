/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';

import { getSelectedEcosystem } from '../../features/flows/ecosystemConfig';
import { Back } from '../Back';
import Main from '../Main';
import { Next } from '../Next';
import Requirement from '../Requirement';

const EcosystemRequirementsStep = () => {
    const ecosystem = getSelectedEcosystem();

    return (
        <Main>
            <Main.Content
                heading={`Gather requirements for ${ecosystem?.name}`}
                subHeading="Prepare the following devices and tools to set up this ecosystem:"
            >
                <Requirement
                    content={[
                        {
                            path: [ecosystem?.hubImage],
                            alt: [ecosystem?.hubName],
                            text: 'Home Hub with Thread Border Router support',
                            description: `This guide uses **${ecosystem?.hubName}** device, but you can use any other Home Hub compatible with **${ecosystem?.name}** that supports Matter and Thread Border Router.`,
                            visit_note: `Visit the [${ecosystem?.name}](${
                                ecosystem?.hubManual ?? '#'
                            }) webpage to learn more about the Matter and supported Home Hub devices.`,
                        },
                        {
                            path: ecosystem?.appImage,
                            alt: ecosystem.appImageAlt,
                            text: `Smartphone with the **${ecosystem?.name}** app installed`,
                            description: `The **${ecosystem?.name}** app supports **${ecosystem.appSystemSupport}**.`,
                            visit_note: `Visit the [${ecosystem?.name}](${
                                ecosystem?.appManual ?? '#'
                            }) webpage to learn more about the application.`,
                        },
                    ]}
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
    name: 'Requirements',
    component: EcosystemRequirementsStep,
});
