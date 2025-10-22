/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import path from 'path';

/**
 * This file contains the pairing configuration for the Matter devices.
 */

interface PairingEcosystem {
    name: string;
    guide: string[];
    video: string;
    qrcodeStep: number;
}

export interface PairingConfig {
    name: string;
    factoryData: string;
    autoAdvertise: boolean;
    pairingGuide: PairingEcosystem[];
}

export interface AdvertisingData {
    enablePairingImage: string;
    button: string;
}

const appleHomeGuideStartBase = [
    'Open the **Apple Home** app.',
    'Tap **+**. ',
    'Tap **Add Accessory**.',
    'Scan the QR code or tap **More options...** > **Matter Accessory**, and enter the setup code.',
    'Tap **Add to Home**. ',
    'Tap **Add Anyway** (since this sample is not certified). ',
    'Select a location for the device and tap **Continue**. ',
    'Name the device and tap **Continue**. ',
];

const appleHomeGuideEndBase = [
    'Tap **Done**.\nThe device will be visible in your selected room.',
];

const smartThingsGuideStartBase = [
    'Open the **SmartThings** app.',
    'Tap **+**.',
    'Tap **Add device**.',
    'Tap **Add** in the **Partner devices** section.',
    'Tap **Matter**.',
    'Tap **Scan QR code**.',
    'Scan the QR code and wait for the device to be added.\nAt the end of the process, a prompt about the device not being certified appears.',
    'Tap **Continue** and wait for the device to be added.',
    'Select a location for the device, set the name, and tap **Done**.',
];

const smartThingsGuideEndBase = [
    'Wait for plugins to be installed.\nWhen the installation is done, the device is visible in the selected room.',
];

const amazonAlexaGuideStartBase = [
    'Open the **Amazon Alexa** app.',
    'Tap **+**.',
    'Tap **Device** on the list.',
    'Tap the tile with the Matter logo.',
    'Confirm that the device have a Matter logo by tapping **YES**.',
    'Choose one of the available options:\n\n- Tap **Try Numeric Code Instead** and enter the setup code.\n\n- Tap **Scan QR Code** and scan the QR code from this page.',
    'Tap **Connect** to start the pairing process.',
    'Wait for the device to be added.',
    'Once device is connected, tap **Next**.',
];

const amazonAlexaGuideEndBase = [
    'Choose one of the available options:\n\n- Create a unique name for the device and tap **Update name**.\n\n- Skip this step by tapping **Skip**.',
    'Choose one of the available options:\n\n- Add the device to a group and tap **Add To Group**.\n\n- Skip this step by tapping **Skip**.',
    'Tap **Continue**.',
    'Tap **Done**.\nThe device is visible in your selected room.',
];

const googleHomeGuideStartBase = [
    'Open the **Google Home** app.',
    'Go to the **Devices** page.',
    'Tap **+ Add**.',
    'Tap **Matter-enabled device**.',
    'Choose one of the available options:\n\n- Tap **Scan the QR code** and scan the QR code from this page.\n\n- Tap **Set up without QR code** and enter the setup code.',
    "Read **Google's Privacy Policy** and tap **Agree** to continue.",
    "Tap **I'm ready** to start the pairing process.",
    'Wait for the device to be added.',
    'If the prompt about the device not being certified appears, tap **Set up anyway**.',
    'Once device is connected, tap **Done**.',
];

const googleHomeGuideEndBase = ['The device is visible in the selected room.'];

export const pairingConfig: PairingConfig[] = [
    {
        name: 'Matter Door Lock',
        factoryData: path.resolve(
            __dirname,
            '../resources/devices/factory_data/lock.hex'
        ),
        autoAdvertise: false,
        pairingGuide: [
            {
                name: 'Apple Home',
                qrcodeStep: 4,
                guide: [
                    ...appleHomeGuideStartBase,
                    'Tap **Continue**.',
                    'Remember the personal code and tap **Continue**.',
                    'If you have guests saved on your Home app, select them to allow them to access the device and tap **Continue**.',
                    ...appleHomeGuideEndBase,
                ],
                video: '../resources/ecosystems/Apple/adding_device/apple_pairing_lock.mp4',
            },
            {
                name: 'SmartThings',
                qrcodeStep: 6,
                guide: [
                    ...smartThingsGuideStartBase,
                    ...smartThingsGuideEndBase,
                ],
                video: '../resources/ecosystems/SmartThings/adding_device/smartthings_lock.mp4',
            },
            {
                name: 'Amazon Alexa',
                qrcodeStep: 6,
                guide: [
                    ...amazonAlexaGuideStartBase,
                    ...amazonAlexaGuideEndBase,
                ],
                video: '../resources/ecosystems/Amazon/adding_device/alexa_lock.mp4',
            },
            {
                name: 'Google Home',
                qrcodeStep: 5,
                guide: [
                    ...googleHomeGuideStartBase,
                    'Select a location for the device, set the name, and tap **Next**.',
                    'Create a unique name for the device and tap **Next**.',
                    'Choose one of the available options:\n\n- Set a new passcode and tap **Continue**.\n\n- Skip this step by tapping **Skip**.',
                    'Tap **Done**.\nThe device is visible in the selected room.',
                    ...googleHomeGuideEndBase,
                ],
                video: '../resources/ecosystems/Google/adding_device/google_lock.mp4',
            },
        ],
    },
    {
        name: 'Matter Light Bulb',
        factoryData: path.resolve(
            __dirname,
            '../resources/devices/factory_data/light_bulb.hex'
        ),
        autoAdvertise: true,
        pairingGuide: [
            {
                name: 'Apple Home',
                qrcodeStep: 4,
                guide: [...appleHomeGuideStartBase, ...appleHomeGuideEndBase],
                video: '../resources/ecosystems/Apple/adding_device/apple_pairing_bulb.mp4',
            },
            {
                name: 'SmartThings',
                qrcodeStep: 6,
                guide: [
                    ...smartThingsGuideStartBase,
                    ...smartThingsGuideEndBase,
                ],
                video: '../resources/ecosystems/SmartThings/adding_device/smartthings_bulb.mp4',
            },
            {
                name: 'Amazon Alexa',
                qrcodeStep: 6,
                guide: [
                    ...amazonAlexaGuideStartBase,
                    ...amazonAlexaGuideEndBase,
                ],
                video: '../resources/ecosystems/Amazon/adding_device/alexa_bulb.mp4',
            },
            {
                name: 'Google Home',
                qrcodeStep: 5,
                guide: [
                    ...googleHomeGuideStartBase,
                    'Select a location for the device, set the name and tap **Next**',
                    'Create a unique name for the device and tap **Next**',
                    ...googleHomeGuideEndBase,
                ],
                video: '../resources/ecosystems/Google/adding_device/google_bulb.mp4',
            },
        ],
    },
    {
        name: 'Matter Weather Station',
        factoryData: path.resolve(
            __dirname,
            '../resources/devices/factory_data/weather_station.hex'
        ),
        autoAdvertise: true,
        pairingGuide: [
            {
                name: 'Apple Home',
                qrcodeStep: 4,
                guide: [
                    ...appleHomeGuideStartBase,
                    'Customize name or remove sensors as needed',
                    ...appleHomeGuideEndBase,
                ],
                video: '../resources/ecosystems/Apple/adding_device/apple_pairing_ws.mp4',
            },
            {
                name: 'SmartThings',
                qrcodeStep: 6,
                guide: [
                    ...smartThingsGuideStartBase,
                    ...smartThingsGuideEndBase,
                ],
                video: '../resources/ecosystems/SmartThings/adding_device/smartthings_ws.mp4',
            },
            {
                name: 'Amazon Alexa',
                qrcodeStep: 6,
                guide: [
                    ...amazonAlexaGuideStartBase,
                    'This device includes three sensors. Select a sensor tile and follow the next two steps for each sensor individually.',
                    ...amazonAlexaGuideEndBase,
                ],
                video: '../resources/ecosystems/Amazon/adding_device/alexa_ws.mp4',
            },
            {
                name: 'Google Home',
                qrcodeStep: 5,
                guide: [
                    ...googleHomeGuideStartBase,
                    ...googleHomeGuideEndBase,
                    'Tap the **not-specified(2)** device tile to open detailed view.',
                    'Tap the gear button to access settings.',
                    'Tap the **Name** field and change it to match the device type. For example, **Humidity Sensor**.',
                    'Navigate back to the **Devices** page.',
                    'Tap the **not-specified** device tile to open detailed view.',
                    'Tap the gear button to access settings.',
                    'Tap the **Name** field and change it to match the device type. For example, **Pressure Sensor**.',
                    'Navigate back to the **Devices** page.',
                    'Tap the **Test Thingy:53** device tile to open detailed view.',
                    'Tap the gear button to access settings.',
                    'Tap the **Name** field and change it to match the device type. For example, **Temperature Sensor**.',
                    'Navigate back to the **Devices** page.',
                ],
                video: '../resources/ecosystems/Google/adding_device/google_ws.mp4',
            },
        ],
    },
    {
        name: 'Matter Temperature Sensor',
        factoryData: path.resolve(
            __dirname,
            '../resources/devices/factory_data/temperature_sensor.hex'
        ),
        autoAdvertise: true,
        pairingGuide: [
            {
                name: 'Apple Home',
                qrcodeStep: 4,
                guide: [...appleHomeGuideStartBase, ...appleHomeGuideEndBase],
                video: '../resources/ecosystems/Apple/adding_device/apple_pairing_temperature.mp4',
            },
            {
                name: 'SmartThings',
                qrcodeStep: 6,
                guide: [
                    ...smartThingsGuideStartBase,
                    ...smartThingsGuideEndBase,
                ],
                video: '../resources/ecosystems/SmartThings/adding_device/smartthings_temperature.mp4',
            },
            {
                name: 'Amazon Alexa',
                qrcodeStep: 6,
                guide: [
                    ...amazonAlexaGuideStartBase,
                    ...amazonAlexaGuideEndBase,
                ],
                video: '../resources/ecosystems/Amazon/adding_device/alexa_temperature.mp4',
            },
            {
                name: 'Google Home',
                qrcodeStep: 5,
                guide: [
                    ...googleHomeGuideStartBase,
                    'Select a location for the device, set the name, and tap **Next**.',
                    'Create a unique name for the device and tap **Next**.',
                    ...googleHomeGuideEndBase,
                ],
                video: '../resources/ecosystems/Google/adding_device/google_temperature.mp4',
            },
        ],
    },
    {
        name: 'Matter Contact Sensor',
        factoryData: path.resolve(
            __dirname,
            '../resources/devices/factory_data/contact_sensor.hex'
        ),
        autoAdvertise: true,
        pairingGuide: [
            {
                name: 'Apple Home',
                qrcodeStep: 4,
                guide: [
                    ...appleHomeGuideStartBase,
                    'Select how the contact sensor will appear in the **Apple Home** app and tap **Continue**.',
                    ...appleHomeGuideEndBase,
                ],
                video: '../resources/ecosystems/Apple/adding_device/apple_pairing_contact.mp4',
            },
            {
                name: 'SmartThings',
                qrcodeStep: 6,
                guide: [
                    ...smartThingsGuideStartBase,
                    ...smartThingsGuideEndBase,
                ],
                video: '../resources/ecosystems/SmartThings/adding_device/smartthings_contact.mp4',
            },
            {
                name: 'Amazon Alexa',
                qrcodeStep: 6,
                guide: [
                    ...amazonAlexaGuideStartBase,
                    ...amazonAlexaGuideEndBase,
                ],
                video: '../resources/ecosystems/Amazon/adding_device/alexa_contact.mp4',
            },
            {
                name: 'Google Home',
                qrcodeStep: 5,
                guide: [
                    ...googleHomeGuideStartBase,
                    'Select a location for the device, set the name, and tap **Next**.',
                    'Create a unique name for the device and tap **Next**.',
                    ...googleHomeGuideEndBase,
                ],
                video: '../resources/ecosystems/Google/adding_device/google_contact.mp4',
            },
        ],
    },
];

export const getSelectedPairingGuide = (
    sampleName: string,
    ecosystemName: string
): PairingEcosystem | undefined => {
    const config = pairingConfig.find(cfg => cfg.name === sampleName);
    if (config) {
        const guide = config.pairingGuide.find(
            guideEntry => guideEntry.name === ecosystemName
        );
        if (guide) return guide;
    }
    return undefined;
};

export const getSelectedPairingConfig = (
    name: string
): PairingConfig | undefined =>
    pairingConfig.find(config => config.name === name);
