/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { classNames } from '@nordicsemiconductor/pc-nrfconnect-shared';
import { toWords } from 'number-to-words';

import { useAppDispatch } from '../../app/store';
import { setFlowContext } from '../../features/flow/flowSlice';
import { Back } from '../Back';
import Main from '../Main';
import { overWriteA } from '../Markdown';
import { Next } from '../Next';

interface Option {
    dkName: string;
    dkImage: string;
    dkDescription: string;
}

interface Props {
    title: string;
    options: Option[];
    dkTechnologiesImage: string;
    SoCDescription: string;
    additionalInformation: string;
    documentationLink: string;
    persistSelectedOptionKey?: string;
}

const MultiInfoStep = ({
    title,
    options,
    dkTechnologiesImage,
    SoCDescription,
    additionalInformation,
    documentationLink,
    persistSelectedOptionKey,
}: Props) => {
    const dispatch = useAppDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Main>
            <Main.Content
                heading={title}
                subHeading={`This device is available in ${toWords(
                    options.length
                )} variants. Please select the variant you want to use:`}
            >
                <div className="tw-flex tw-flex-col tw-gap-6">
                    <div
                        className="tw-grid tw-gap-6"
                        style={{
                            gridTemplateColumns: `repeat(${
                                options.length || 1
                            }, 1fr)`,
                        }}
                    >
                        {options.map((option, index) => {
                            const selected = selectedIndex === index;
                            return (
                                <div
                                    key={option.dkName}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedIndex(index)}
                                    onKeyDown={e => {
                                        if (
                                            e.key === ' ' ||
                                            e.key === 'Enter'
                                        ) {
                                            e.preventDefault();
                                            setSelectedIndex(index);
                                        }
                                    }}
                                    className={classNames(
                                        'tw-flex tw-cursor-pointer tw-flex-col tw-items-center tw-gap-4 tw-border-2 tw-p-4 tw-transition-colors',
                                        selected
                                            ? 'tw-border-primary tw-bg-primary/5'
                                            : 'tw-border-gray-200 hover:tw-border-gray-300'
                                    )}
                                >
                                    <div
                                        className="tw-text-lg tw-font-bold"
                                        key={option.dkName}
                                    >
                                        {' '}
                                        {option.dkName}{' '}
                                    </div>
                                    <span
                                        className={classNames(
                                            'tw-mb-1',
                                            selected
                                                ? 'mdi-radiobox-marked tw-text-primary'
                                                : 'mdi-radiobox-blank tw-text-gray-400',
                                            'mdi tw-text-xl/5'
                                        )}
                                        aria-hidden
                                    />
                                    <img
                                        src={option.dkImage}
                                        alt="DK"
                                        className="tw-block tw-max-h-[200px] tw-max-w-md"
                                    />
                                    <ReactMarkdown className="tw-text-gray-700">
                                        {option.dkDescription}
                                    </ReactMarkdown>
                                </div>
                            );
                        })}
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-6">
                        {' '}
                        {SoCDescription}
                    </div>
                    <img
                        src={dkTechnologiesImage}
                        alt="DK Technologies"
                        className="tw-mx-auto tw-block tw-max-w-md"
                    />
                    <ReactMarkdown className="tw-text-gray-700">
                        {additionalInformation}
                    </ReactMarkdown>
                    <ReactMarkdown
                        components={{
                            a: overWriteA,
                        }}
                    >
                        {`Learn more on the [documentation](${documentationLink}) page.`}
                    </ReactMarkdown>
                </div>
            </Main.Content>
            <Main.Footer>
                <Back />
                <Next
                    onClick={next => {
                        if (persistSelectedOptionKey != null) {
                            const selectedOption = options[selectedIndex];
                            dispatch(
                                setFlowContext({
                                    key: persistSelectedOptionKey,
                                    value: selectedOption,
                                })
                            );
                        }
                        next();
                    }}
                />
            </Main.Footer>
        </Main>
    );
};

export default (props: Props) => ({
    name: 'Info',
    component: () => MultiInfoStep(props),
});
