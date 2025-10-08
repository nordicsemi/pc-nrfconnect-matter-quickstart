/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import path from 'path';

import { getImageFolder } from '../../features/device/deviceGuides';
import { Back } from '../Back';
import Main from '../Main';
import { overWriteA, overwriteEm, overwriteInfoImg } from '../Markdown';
import { Next } from '../Next';

interface Props {
    title: string;
    markdownContent: string;
}

const InfoStep = ({ title, markdownContent }: Props) => (
    <Main>
        <Main.Content heading={title}>
            <ReactMarkdown
                components={{
                    a: overWriteA,
                    em: overwriteEm,
                    img: overwriteInfoImg,
                }}
                transformImageUri={src =>
                    src.startsWith('http')
                        ? src
                        : path.join(getImageFolder(), src)
                }
            >
                {markdownContent}
            </ReactMarkdown>
        </Main.Content>
        <Main.Footer>
            <Back />
            <Next />
        </Main.Footer>
    </Main>
);

export default (props: Props) => ({
    name: 'Info',
    component: () => InfoStep(props),
});
