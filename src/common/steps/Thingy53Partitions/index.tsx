/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { NoticeBox } from '@nordicsemiconductor/pc-nrfconnect-shared';
import remarkGfm from 'remark-gfm';

import { Back } from '../../Back';
import Main from '../../Main';
import { overWriteA, tableComponents } from '../../Markdown';
import { Next } from '../../Next';

const internalFlashTable = `
| Partition                                 | Start Address | Size     |
|-------------------------------------------|--------------:|---------:|
| MCUboot Bootloader (mcuboot)              | 0x0           | 64 KB    |
| MCUboot padding (mcuboot_pad)             | 0x10000       | 512 B    |
| Application (mcuboot_primary_app)         | 0x10200       | 895.5 KB |
| Non-volatile storage (settings_storage)   | 0xF0000       | 64 KB    |
`;

const externalFlashTable = `
| Partition                                 | Start Address | Size     |
|-------------------------------------------|--------------:|---------:|
| Application DFU (mcuboot_secondary)       | 0x0           | 896 KB   |
| Network Core DFU (mcuboot_secondary_1)    | 0xE0000       | 256 KB   |
| Free space (external_flash)               | 0x120000      | 7040 KB  |
`;

const VerifyPartitionsStep = () => (
    <Main>
        <Main.Content
            heading="Ensuring compatible partitions layout"
            subHeading="The Thingy53 device does not have a programmer on board, so the software image is transferred to it using Device Firmware Upgrade (DFU) over serial. The bootloader is pre-installed on the device and the memory partitions are fixed."
        >
            <div className="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8">
                <div className="tw-text-sm tw-font-bold">
                    You must ensure that your Thingy53 device is currently
                    running a firmware that has the same partition layout, as
                    the application that is going to be transferred using DFU.
                    Otherwise, the firmware upgrade may fail, lead to undefined
                    behavior or problems with booting the application.
                </div>
                <NoticeBox
                    mdiIcon="mdi-information-outline"
                    color="tw-text-primary"
                    title="Note"
                    content="The default configuration of all applications present in nRF Connect SDK for Thingy:53 is compatible with the this partitions layout. If you have not customized the partitions layout of
                        a device, you can proceed to the next step."
                />
                <ReactMarkdown
                    components={{
                        a: overWriteA,
                    }}
                >
                    You can see the expected partitions layout below or you can
                    check the [Matter hardware and memory
                    requirements](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/protocols/matter/getting_started/hw_requirements.html#reference_matter_memory_layouts)
                    for a more detailed breakdown of memory layout.
                </ReactMarkdown>
                <div className="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-6">
                    <div>
                        <div className="tw-text-sm tw-font-bold">
                            Internal flash:
                        </div>
                        <ReactMarkdown
                            components={tableComponents}
                            remarkPlugins={[remarkGfm]}
                        >
                            {internalFlashTable}
                        </ReactMarkdown>
                    </div>
                    <div>
                        <div className="tw-text-sm tw-font-bold">
                            External flash:
                        </div>
                        <ReactMarkdown
                            components={tableComponents}
                            remarkPlugins={[remarkGfm]}
                        >
                            {externalFlashTable}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
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

export default () => ({
    name: 'Verify Partitions',
    component: () => VerifyPartitionsStep(),
});
