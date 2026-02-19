/*
 * Copyright (c) 2024 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import Verify from '../../../common/steps/5xFamilyVerify';
import Apps from '../../../common/steps/Apps';
import Develop from '../../../common/steps/develop';
import EcosystemRequirements from '../../../common/steps/EcosystemRequirements';
import EcosystemSetup from '../../../common/steps/EcosystemSetup';
import EnableAdvertising from '../../../common/steps/EnableAdvertising';
import Interaction from '../../../common/steps/Interaction';
import Learn from '../../../common/steps/Learn';
import MultiInfoStep from '../../../common/steps/MultiInfoStep';
import Pairing from '../../../common/steps/Pairing';
import Program from '../../../common/steps/program';
import Rename from '../../../common/steps/Rename';
import SelectEcosystem from '../../../common/steps/SelectEcosystem';
import { Choice } from '../../device/deviceSlice';
import {
    appsCommonConfig,
    commonLearningResources,
    matterDevResources,
    sampleCommonConfig,
} from '../commonResources';
import { AdvertisingData } from '../pairingConfig';

const multiOptionInfoConfig = {
    title: 'Next-level multiprotocol SoC',
    options: [
        {
            dkName: 'nRF54L15 DK',
            dkImage: '../resources/devices/images/54L15DK.png',
            dkDescription:
                'The nRF54L15 DK is the development kit for all three wireless SoC (System-on-Chip) options in the nRF54L Series. The nRF54L15 sits on the development board, while the nRF54L10 and nRF54L05 can be emulated. The affordable single-board development kit makes all features of the wireless SoC available to the developer.',
        },
        {
            dkName: 'nRF54L15 TAG',
            dkImage: '../resources/devices/images/54L15TAG.png',
            dkDescription:
                'The nRF54L15 TAG is a tag-like device running the nRF54L15 SoC. It is a small, low-cost tag that can be used for testing and development of Matter applications. This device needs to be connected to the nRF54L15 DK via DEBUG OUT connector during the flashing process. It is recommended to be powered externally by the CR2032 battery.',
        },
    ],
    dkTechnologiesImage: '../resources/devices/images/DKTech.png',
    SoCDescription:
        'nRF54L15 is the first System-on-Chip (SoC) in the nRF54L Series. It is an ultra-low power Bluetooth 6.0 SoC with a new best-in-class multiprotocol radio and advanced security features.',
    additionalInformation:
        'The nRF54L Series takes the popular nRF52 Series to the next level with excellent processing power and efficiency, expanded memory, and new peripherals, all in a more compact package.',
    documentationLink:
        'https://docs.nordicsemi.com/bundle/ps_nrf54L15/page/keyfeatures_html5.html',
};

/** Samples available only on nRF54L15 TAG (with TAG firmware paths). */
const programConfigTag = [
    {
        name: 'Matter Temperature Sensor',
        type: 'jlink' as const,
        documentation: {
            label: 'Matter Temperature Sensor',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/temperature_sensor/README.html',
        },
        firmware: [
            {
                core: 'Application' as const,
                file: 'nrf54l15tag/nrf54l15tag_temperature_sensor.hex',
                link: {
                    label: 'Matter Temperature Sensor',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/temperature_sensor/README.html',
                },
            },
        ],
    },
    {
        name: 'Matter Weather Station',
        type: 'jlink' as const,
        documentation: {
            label: 'Matter Weather Station',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/weather_station/README.html',
        },
        firmware: [
            {
                core: 'Application' as const,
                file: 'nrf54l15tag/nrf54l15tag_weather_station.hex',
                link: {
                    label: 'Matter Weather Station',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/weather_station/README.html',
                },
            },
        ],
    },
] as Choice[];

const programConfig = [
    {
        name: 'Matter Door Lock',
        type: 'jlink',
        documentation: {
            label: 'Matter Door Lock',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/lock/README.html',
        },
        firmware: [
            {
                core: 'Application',
                file: 'nrf54l15/nrf54l15dk_lock.hex',
                link: {
                    label: 'Matter Door Lock',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/lock/README.html',
                },
            },
        ],
    },
    {
        name: 'Matter Light Bulb',
        type: 'jlink',
        documentation: {
            label: 'Matter Light Bulb',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/light_bulb/README.html',
        },
        firmware: [
            {
                core: 'Application',
                file: 'nrf54l15/nrf54l15dk_light_bulb.hex',
                link: {
                    label: 'Matter Light Bulb',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/light_bulb/README.html',
                },
            },
        ],
    },
    {
        name: 'Matter Temperature Sensor',
        type: 'jlink',
        documentation: {
            label: 'Matter Temperature Sensor',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/temperature_sensor/README.html',
        },
        firmware: [
            {
                core: 'Application',
                file: 'nrf54l15/nrf54l15dk_temperature_sensor.hex',
                link: {
                    label: 'Matter Temperature Sensor',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/temperature_sensor/README.html',
                },
            },
        ],
    },
    {
        name: 'Matter Contact Sensor',
        type: 'jlink',
        documentation: {
            label: 'Matter Contact Sensor',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/contact_sensor/README.html',
        },
        firmware: [
            {
                core: 'Application',
                file: 'nrf54l15/nrf54l15dk_contact_sensor.hex',
                link: {
                    label: 'Matter Contact Sensor',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/contact_sensor/README.html',
                },
            },
        ],
    },
] as Choice[];

const filterProgramChoicesByPlatform = (
    choices: Choice[],
    flowContext: Record<string, unknown>
): Choice[] => {
    const option = flowContext?.selectedPlatformVariant as
        | { dkName?: string }
        | undefined;
    const platformName = option?.dkName;
    if (platformName === 'nRF54L15 TAG') {
        return programConfigTag;
    }
    return choices;
};

const verifyConfig = [
    {
        ref: 'Matter Door Lock',
        config: {
            vComIndex: 1,
            regex: /(Using nRF Connect SDK[\s\S]*Init CHIP stack[\s\S]*Device Configuration:[\s\S]*Setup Discriminator \(0xFFFF for UNKNOWN\/ERROR\): 3840 \(0xF00\))/,
        },
    },
    {
        ref: 'Matter Light Bulb',
        config: {
            vComIndex: 1,
            regex: /(Using nRF Connect SDK[\s\S]*Init CHIP stack[\s\S]*Device Configuration:[\s\S]*Setup Discriminator \(0xFFFF for UNKNOWN\/ERROR\): 3840 \(0xF00\))/,
        },
    },
    {
        ref: 'Matter Temperature Sensor',
        config: {
            vComIndex: 1,
            regex: /(Using nRF Connect SDK[\s\S]*Init CHIP stack[\s\S]*Device Configuration:[\s\S]*Setup Discriminator \(0xFFFF for UNKNOWN\/ERROR\): 3840 \(0xF00\))/,
        },
    },
    {
        ref: 'Matter Contact Sensor',
        config: {
            vComIndex: 1,
            regex: /(Using nRF Connect SDK[\s\S]*Init CHIP stack[\s\S]*Device Configuration:[\s\S]*Setup Discriminator \(0xFFFF for UNKNOWN\/ERROR\): 3840 \(0xF00\))/,
        },
    },
    {
        ref: 'Matter Weather Station',
        config: {
            vComIndex: 1,
            regex: /(Using nRF Connect SDK[\s\S]*Init CHIP stack[\s\S]*Device Configuration:[\s\S]*Setup Discriminator \(0xFFFF for UNKNOWN\/ERROR\): 3840 \(0xF00\))/,
        },
    },
];

const learnConfig = [
    ...commonLearningResources,
    {
        label: 'Developing with nRF54L Series',
        description:
            'Device-specific information about features, DFU solution, and development.',
        link: {
            label: 'Developing with nRF54L Series',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/app_dev/device_guides/nrf54l/index.html',
        },
    },
];

const advertisingData = {
    enablePairingImage: '../resources/devices/images/54L15DK_pairing.png',
    button: 'Button 0',
} as AdvertisingData;

export default {
    device: 'nRF54L15 DK',
    programConfig,
    learnConfig,
    advertisingData,
    flow: [
        MultiInfoStep({
            ...multiOptionInfoConfig,
            persistSelectedOptionKey: 'selectedPlatformVariant',
        }),
        Rename(),
        Program(programConfig, sampleCommonConfig, {
            filterChoicesByContext: filterProgramChoicesByPlatform,
        }),
        Verify(verifyConfig),
        SelectEcosystem(),
        EcosystemRequirements(),
        EcosystemSetup(),
        EnableAdvertising(advertisingData),
        Pairing(),
        Interaction({ led: 1, button: 0 }),
        Learn(learnConfig),
        Develop(sampleCommonConfig, matterDevResources),
        Apps(appsCommonConfig),
    ],
};
