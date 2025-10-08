/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { NoticeBox } from '@nordicsemiconductor/pc-nrfconnect-shared';

import { EcosystemConfig } from '../features/flows/ecosystemConfig';
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
    <div>
        {' '}
        This guide uses <b>{ecosystem?.hubName}</b> device, but you can use any
        other Home Hub compatible with <b>{ecosystem?.name}</b> that supports
        Matter and Thread Border Router.
    </div>
);

const NoteVideo = ({ ecosystem }: { ecosystem: EcosystemConfig }) => (
    <div>
        {' '}
        The video has been recorded with version{' '}
        <b>{ecosystem?.ecosystemVersion}</b> of the <b>{ecosystem?.name}</b>{' '}
        application. Please note that the user interface may lookslightly
        different if you are using another version on your device.
    </div>
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
                                <div className="tw-text-base tw-font-bold">
                                    {index + 1}.
                                </div>
                                <div
                                    className="tw-text-base tw-font-light"
                                    dangerouslySetInnerHTML={{
                                        __html: step,
                                    }}
                                />
                            </div>
                            {qrcodeStep && qrcodeStep === index + 1 && (
                                <div className="tw-justify-left tw-flex tw-flex-row tw-items-center tw-gap-8">
                                    {qrcode && (
                                        <img
                                            src={qrcode}
                                            alt="QR Code"
                                            className="tw-mx-5 tw-mt-[10px] tw-max-h-[100px] tw-w-auto tw-rounded-lg"
                                        />
                                    )}
                                    {manualCode && (
                                        <div className="tw-items-left tw-justify-left tw-flex tw-flex-col tw-gap-1">
                                            <div className="tw-font-bold tw-text-primary">
                                                Manual Code
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
                    content={<div> {NoteGuide({ ecosystem })}</div>}
                />
                <NoticeBox
                    mdiIcon="mdi-information-outline"
                    color="tw-text-primary"
                    title="Note"
                    content={<div> {NoteVideo({ ecosystem })}</div>}
                />
            </>
        )}
    </div>
);

export default Guide;
