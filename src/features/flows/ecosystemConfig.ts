/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export interface EcosystemConfig {
    name: string;
    description: string;
    appManual: string;
    pairingManual: string;
    hubManual: string;
    hubImage: string;
    hubName: string;
    appImage: string[];
    appImageAlt: string[];
    appSystemSupport: string;
    setupVideo: string;
    setupManual: string[];
    supportedDeviceTypes: string[];
    ecosystemVersion: string;
}

let selectedEcosystem: EcosystemConfig;

export const ecosystemConfig: EcosystemConfig[] = [
    {
        name: 'Apple Home',
        description: 'Work with Apple Home',
        appManual: 'https://www.apple.com/home-app/',
        pairingManual: 'https://support.apple.com/en-us/104998',
        hubManual: 'https://support.apple.com/en-us/102557',
        hubImage: '../resources/ecosystems/Apple/apple_hub.png',
        hubName: 'Apple HomePod Mini',
        appImage: ['../resources/ecosystems/Apple/apple_home_qr_code.png'],
        appImageAlt: ['Get iOS version from App Store'],
        appSystemSupport: 'iOS system',
        setupVideo: '../resources/ecosystems/Apple/apple_hub.mp4',
        setupManual: [
            'Power on the <b>Apple HomePod Mini</b>',
            'Make sure that your smartphone is connected to the Wi-Fi network',
            'Open the <b>Apple Home</b> app',
            'The nearby hub will be detected automatically and you will be asked to confirm the setup',
            'Tap the <b> Set Up </b> tile',
            'Center the HomePod Mini device top part in the middle of the frame displayed on the screen',
            'Select <b>Home</b> that you want to add the device to',
            'Select <b>Room</b> that you want to add the device to',
            'Agree to the usage terms and conditions',
            'The device will be added to the Apple Home app and it should be visible in the selected room',
        ],
        supportedDeviceTypes: [
            'Matter Door Lock',
            'Matter Light Bulb',
            'Matter Temperature Sensor',
            'Matter Weather Station',
            'Matter Contact Sensor',
        ],
        ecosystemVersion: '18.6',
    },
    {
        name: 'Google Home',
        description: 'Work with Google Home',
        appManual: 'https://home.google.com/welcome/',
        pairingManual:
            'https://support.google.com/googlenest/answer/9159862?hl=en',
        hubManual: 'https://home.google.com/get-inspired/matter-and-thread/',
        hubImage: '../resources/ecosystems/Google/google_hub.png',
        hubName: 'Google Nest Hub 2nd Gen',
        appImage: ['../resources/ecosystems/Google/google_home_android_qr_code.png', '../resources/ecosystems/Google/google_home_ios_qr_code.png'],
        appImageAlt: ['Get Android version from Google Play', 'Get iOS version from App Store'],
        appSystemSupport: 'Android and iOS systems',
        setupVideo: '../resources/ecosystems/Google/google_hub.mp4',
        setupManual: [
            'Power on the <b>Google Nest Hub 2nd Gen</b>',
            'Make sure that your smartphone is connected to the Wi-Fi network',
            'Open the <b>Google Home</b> app',
            'Go to <b>Devices</b> section',
            'Tap the <b>Add device</b> button',
            'Tap the <b>Google Nest or partner device</b> option',
            'Select <b>Home</b> that you want to add the device to',
            'The nearby hub will be detected automatically and you will be asked to confirm the by tapping <b>Yes</b>',
            'Scan the QR code displayed on the screen of the hub',
            'Decide if you want to help improving Nest Hub by sharing statistics or not',
            'Tap <b>Proceed</b> button when asked about your country compatibility',
            'Select <b>Room</b> that you want to add the device to',
            'Choose the Wi-Fi network that you want to use for the device. It should be the same as the one that you are currently using on your smartphone',
            'Click <b>Next</b> button on next few screens that instruct you how to use the device',
            'The device will be added to the Google Home app and it should be visible in the selected room',
        ],
        supportedDeviceTypes: [
            'Matter Door Lock',
            'Matter Light Bulb',
            'Matter Temperature Sensor',
            'Matter Weather Station',
            'Matter Contact Sensor',
        ],
        ecosystemVersion: '3.38.53.1',
    },
    {
        name: 'Amazon Alexa',
        description: 'Work with Amazon Alexa',
        appManual:
            'https://www.amazon.com/Alexa-App/b?ie=UTF8&node=18354642011',
        pairingManual:
            'https://www.amazon.com/gp/help/customer/display.html?nodeId=G3RKPNRKF33ECTW7',
        hubManual:
            'https://developer.amazon.com/en-US/docs/alexa/smarthome/matter-support.html#compatible-echos',
        hubImage: '../resources/ecosystems/Amazon/amazon_hub.png',
        hubName: 'Amazon Echo 4th Gen',
        appImage: ['../resources/ecosystems/Amazon/amazon_alexa_android_qr_code.png', '../resources/ecosystems/Amazon/amazon_alexa_ios_qr_code.png'],
        appImageAlt: ['Get Android version from Google Play', 'Get iOS version from App Store'],
        appSystemSupport: 'Android and iOS systems',
        setupVideo: '../resources/ecosystems/Amazon/alexa_hub.mp4',
        setupManual: [
            'Power on the <b>Amazon Echo 4th Gen</b>',
            'Make sure that your smartphone is connected to the Wi-Fi network',
            'Open the <b>Alexa</b> app',
            'Go to the <b>Devices</b> section',
            'Tap <b>+</b>',
            'Tap <b>Add Device</b> button',
            'Select <b>Amazon Echo</b> from the list of <b>All Devices</b>',
            'Select <b>Echo, Echo Dot, Echo Pop and more</b>',
            'Make sure that the Echo device is displaying an orange light and tap <b>Yes</b>',
            'The nearby hub will be detected automatically. Tap on it once listed',
            'Tap <b>Continue</b> after connecting to Wi-Fi network',
            'Tap <b>Skip</b> once informed that application could not detect your location',
            'Select <b>Room</b> that you want to add the device to',
            'Tap the <b>Google Nest or partner device</b> option',
            'Select <b>Home</b> that you want to add the device to',
            'You can setup voice ID, or tap <b>Remind me later</b>',
            "Tap <b>Let's go</b>",
            'The device will be added to the Alexa app and it should be visible in the selected room',
        ],
        supportedDeviceTypes: [
            'Matter Door Lock',
            'Matter Light Bulb',
            'Matter Temperature Sensor',
            'Matter Weather Station',
            'Matter Contact Sensor',
        ],
        ecosystemVersion: '2025.16',
    },
    {
        name: 'SmartThings',
        description: 'Work with SmartThings',
        appManual: 'https://www.samsung.com/uk/smartthings/app/',
        pairingManual:
            'https://support.smartthings.com/hc/en-us/articles/360052390111-Devices-in-SmartThings',
        hubManual: 'https://partners.smartthings.com/matter',
        hubImage: '../resources/ecosystems/SmartThings/smartthings_hub.png',
        hubName: 'Aeotec Smart Home Hub',
        appImage: ['../resources/ecosystems/SmartThings/smartthings_android_qr_code.png', '../resources/ecosystems/SmartThings/smartthings_ios_qr_code.png'],
        appImageAlt: ['Get Android version from Google Play', 'Get iOS version from App Store'],
        appSystemSupport: 'Android and iOS systems',
        setupVideo: '../resources/ecosystems/SmartThings/smartthings_hub.mp4',
        setupManual: [
            'Power on the <b>Aeotec Smart Home Hub</b>',
            'Make sure that your smartphone is connected to the Wi-Fi network',
            'Open the <b>SmartThings</b> app',
            'Go to the <b>Devices</b> section',
            'Tap the <b>Add device</b> button',
            'Tap the <b>Add</b> button in the <b>Samsung devices</b> section',
            'Select <b>Smart Home Hub</b> from the list',
            'Scan the QR code printed on the bottom of the hub',
            'You can <b>Skip</b> the geolocationsetup',
            'Select <b>Wi-Fi</b> connection type',
            'Make sure that the light on the Hub is bliking red and green and tap <b>Next</b>',
            'Choose the Wi-Fi network that you want to use for the device. It should be the same as the one that you are currently using on your smartphone',
            'Select the location, room and the name for the device, and tap <b>Done</b>',
            'You will be navigated to the device detailed view. Tap <b><</b> to go back to the room view',
            'The device will be added to the SmartThings app and it should be visible in the selected room',
        ],
        supportedDeviceTypes: [
            'Matter Door Lock',
            'Matter Light Bulb',
            'Matter Temperature Sensor',
            'Matter Weather Station',
            'Matter Contact Sensor',
        ],
        ecosystemVersion: '1.8.34.21',
    },
];

export const getSelectedEcosystem = (): EcosystemConfig => selectedEcosystem;

export const setSelectedEcosystem = (ecosystem: EcosystemConfig) => {
    selectedEcosystem = ecosystem;
};
