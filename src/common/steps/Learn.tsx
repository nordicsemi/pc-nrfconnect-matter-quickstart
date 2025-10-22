/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';

import { Back } from '../Back';
import Main from '../Main';
import { Next } from '../Next';
import { Resource, ResourceProps } from '../Resource';

const LearnStep = ({ resources }: { resources: ResourceProps[] }) => (
    <Main>
        <Main.Content heading="Learn about Matter and the nRF Connect SDK">
            <div className="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-0.5">
                {resources.map(props => (
                    <Resource {...props} key={props.label} />
                ))}
            </div>
        </Main.Content>
        <Main.Footer>
            <Back />
            <Next />
        </Main.Footer>
    </Main>
);

export default (resources: ResourceProps[]) => ({
    name: 'Learn',
    component: () => LearnStep({ resources }),
});
