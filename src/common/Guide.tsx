/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { NoticeBox } from '@nordicsemiconductor/pc-nrfconnect-shared';

import { EcosystemConfig } from '../features/flows/ecosystemConfig';
import { overWriteA, overwriteEm, overwriteInfoImg } from './Markdown';
import Video from './Video';

interface GuideProps {
    steps: string[];
    ecosystem?: EcosystemConfig;
    qrcode?: string;
    qrcodeStep?: number;
    manualCode?: string;
    mediaSrc?: string;
}

const NoteGuide = ({ ecosystem }: { ecosystem: EcosystemConfig }) => (
    <ReactMarkdown>
        {`This guide uses **${ecosystem?.hubName}** device, but you can use any other Home Hub compatible with **${ecosystem?.name}** that supports Matter and Thread Border Router.`}
    </ReactMarkdown>
);

const NoteVideo = ({ ecosystem }: { ecosystem: EcosystemConfig }) => (
    <ReactMarkdown>
        {`The video has been recorded with version **${ecosystem?.ecosystemVersion}** of the **${ecosystem?.name}** application. The user interface may look slightly different if you are using another version.`}
    </ReactMarkdown>
);

const Guide = ({
    qrcode,
    qrcodeStep,
    manualCode,
    steps,
    mediaSrc,
    ecosystem,
}: GuideProps) => (
    // Container
    <div className="tw-flex tw-flex-col tw-gap-8">
        {/* steps + video container */}
        <div className="tw-flex tw-flex-row tw-items-start tw-gap-8">
            {/* steps + notes container */}
            <div className="tw-flex tw-w-[680px] tw-shrink-0 tw-flex-col tw-gap-8">
                {/* steps container */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                    {steps.map((step, index) => (
                        // Single step
                        <div
                            key={
                                typeof step === 'string'
                                    ? step.slice(0, 40)
                                    : `step-${index}`
                            }
                        >
                            <div className="tw-flex tw-flex-row tw-gap-2">
                                <div className="tw-w-8 tw-shrink-0 tw-text-center tw-text-base tw-font-bold">
                                    {index + 1}.
                                </div>
                                <ReactMarkdown
                                    className="tw-text-base tw-font-light"
                                    components={{
                                        a: overWriteA,
                                        em: overwriteEm,
                                        img: overwriteInfoImg,
                                    }}
                                >
                                    {step}
                                </ReactMarkdown>
                            </div>
                            {qrcodeStep && qrcodeStep === index + 1 && (
                                <div className="tw-ml-10 tw-flex tw-flex-row tw-items-center tw-gap-8">
                                    {qrcode && (
                                        <img
                                            src={qrcode}
                                            alt="QR Code"
                                            className="tw-mt-[10px] tw-max-h-[100px] tw-w-auto tw-rounded-lg"
                                        />
                                    )}
                                    {manualCode && (
                                        <div className="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1">
                                            <div className="tw-font-bold tw-text-primary">
                                                Manual pairing code
                                            </div>
                                            <div className="tw-font-light">
                                                {manualCode}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* video */}
            {mediaSrc && <Video mediaSrc={mediaSrc} />}
        </div>
        {/* notes */}
        {ecosystem && (
            <>
                <NoticeBox
                    mdiIcon="mdi-information-outline"
                    color="tw-text-primary"
                    title="Note"
                    content={<NoteGuide ecosystem={ecosystem} />}
                />
                <NoticeBox
                    mdiIcon="mdi-information-outline"
                    color="tw-text-primary"
                    title="Note"
                    content={<NoteVideo ecosystem={ecosystem} />}
                />
            </>
        )}
    </div>
);

export default Guide;
