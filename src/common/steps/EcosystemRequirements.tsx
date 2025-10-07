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
                heading={`Complete the requirements for the ${ecosystem?.name}`}
                subHeading="You are going to need the following devices and tools to use
                    this ecosystem:"
            >
                <Requirement
                    mediaSrc={[
                        {
                            path: [ecosystem?.hubImage],
                            alt: [ecosystem?.hubName],
                            text: 'Home Hub with Thread Border Router support',
                            description: `This guide uses <b>${ecosystem?.hubName}</b> device, but you can use any other Home Hub compatible with <b>${ecosystem?.name}</b> that supports Matter and Thread Border Router.`,
                            visit_note: (
                                <>
                                    Visit the{' '}
                                    {ecosystem?.hubManual ? (
                                        <a
                                            href={ecosystem.hubManual}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tw-font-italic tw-text-primary"
                                        >
                                            {ecosystem.name}
                                        </a>
                                    ) : (
                                        ''
                                    )}{' '}
                                    webpage to learn more about the Matter and
                                    supported Home Hub devices.
                                </>
                            ),
                        },
                        {
                            path: ecosystem?.appImage,
                            alt: ecosystem.appImageAlt,
                            text: `Smartphone with <b>${ecosystem?.name}</b> Application installed`,
                            description: `The <b>${ecosystem?.name}</b> app supports <b>${ecosystem.appSystemSupport}</b>.`,
                            visit_note: (
                                <div>
                                    Visit the{' '}
                                    {ecosystem?.appManual ? (
                                        <a
                                            href={ecosystem.appManual}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontStyle: 'italic',
                                                color: 'rgb(0, 169, 206)',
                                            }}
                                        >
                                            {ecosystem.name}
                                        </a>
                                    ) : (
                                        ecosystem?.name
                                    )}{' '}
                                    webpage to learn more about the application.
                                </div>
                            ),
                        },
                    ]}
                    note=""
                    footer=""
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
