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
        description: 'Apple Home',
        appManual: 'https://www.apple.com/home-app/',
        pairingManual: 'https://support.apple.com/en-us/104998',
        hubManual: 'https://support.apple.com/en-us/102557',
        hubImage: '../resources/ecosystems/Apple/apple_hub.png',
        hubName: 'Apple HomePod Mini',
        appImage: ['../resources/ecosystems/Apple/apple_home_qr_code.png'],
        appImageAlt: ['Get the iOS version from App Store'],
        appSystemSupport: 'iOS system',
        setupVideo: '../resources/ecosystems/Apple/apple_hub.mp4',
        setupManual: [
            'Power on the **Apple HomePod Mini**.',
            'Make sure that your smartphone is connected to the Wi-Fi network.',
            'Open the **Apple Home** app.\n&nbsp;  \nThe nearby hub is detected automatically and you are asked to confirm the setup.',
            'Tap **Set Up**.',
            'Center the HomePod Mini device top part in the middle of the frame displayed on the screen.',
            'Select **Home** that you want to add the device to.',
            'Select **Room** that you want to add the device to.',
            'Agree to the usage terms and conditions.\n&nbsp;  \nThe device is added to the Apple Home app and is visible in the selected room.',
        ],
        supportedDeviceTypes: [
            'Matter Door Lock',
            'Matter Light Bulb',
            'Matter Temperature Sensor',
            'Matter Weather Station',
            'Matter Contact Sensor',
        ],
        ecosystemVersion: '26.0.1',
    },
    {
        name: 'Google Home',
        description: 'Google Home',
        appManual: 'https://home.google.com/welcome/',
        pairingManual:
            'https://support.google.com/googlenest/answer/9159862?hl=en',
        hubManual: 'https://home.google.com/get-inspired/matter-and-thread/',
        hubImage: '../resources/ecosystems/Google/google_hub.png',
        hubName: 'Google Nest Hub 2nd Gen',
        appImage: [
            '../resources/ecosystems/Google/google_home_android_qr_code.png',
            '../resources/ecosystems/Google/google_home_ios_qr_code.png',
        ],
        appImageAlt: [
            'Get the Android version from Google Play',
            'Get the iOS version from App Store',
        ],
        appSystemSupport: 'Android and iOS systems',
        setupVideo: '../resources/ecosystems/Google/google_hub.mp4',
        setupManual: [
            'Power on the **Google Nest Hub 2nd Gen**.',
            'Make sure that your smartphone is connected to the Wi-Fi network.',
            'Open the **Google Home** app.',
            'Go to the **Devices** section.',
            'Tap **Add device**.',
            'Tap **Google Nest or partner device**.',
            'Select **Home** that you want to add the device to.\n&nbsp;  \nThe nearby hub is detected automatically and you are asked to confirm by tapping **Yes**.',
            'Scan the QR code displayed on the screen of the hub.',
            'Decide if you want to help improve Nest Hub by sharing statistics or not.',
            'When asked about your country compatibility, tap **Proceed**.',
            'Select **Room** that you want to add the device to.',
            'Choose the Wi-Fi network that you want to use for the device.\n&nbsp;  \nMake sure it is the same network as the one you are currently using on your smartphone.',
            'Click **Next** on the next few screens that instruct you how to use the device.\n&nbsp;  \nThe device is added to the Google Home app and is visible in the selected room.',
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
        description: 'Amazon Alexa',
        appManual:
            'https://www.amazon.com/Alexa-App/b?ie=UTF8&node=18354642011',
        pairingManual:
            'https://www.amazon.com/gp/help/customer/display.html?nodeId=G3RKPNRKF33ECTW7',
        hubManual:
            'https://developer.amazon.com/en-US/docs/alexa/smarthome/matter-support.html#compatible-echos',
        hubImage: '../resources/ecosystems/Amazon/amazon_hub.png',
        hubName: 'Amazon Echo 4th Gen',
        appImage: [
            '../resources/ecosystems/Amazon/amazon_alexa_android_qr_code.png',
            '../resources/ecosystems/Amazon/amazon_alexa_ios_qr_code.png',
        ],
        appImageAlt: [
            'Get the Android version from Google Play',
            'Get the iOS version from App Store',
        ],
        appSystemSupport: 'Android and iOS systems',
        setupVideo: '../resources/ecosystems/Amazon/alexa_hub.mp4',
        setupManual: [
            'Power on the **Amazon Echo 4th Gen**.',
            'Make sure that your smartphone is connected to the Wi-Fi network.',
            'Open the **Alexa** app.',
            'Go to the **Devices** section.',
            'Tap **+**.',
            'Tap **Add Device**.',
            'Select **Amazon Echo** from the list of **All Devices**.',
            'Select **Echo, Echo Dot, Echo Pop and more**.\n&nbsp;  \nThe Echo device starts displaying an orange light.',
            'Tap **Yes**.\n&nbsp;  \nThe nearby hub is detected automatically.',
            'Tap the hub tile once listed.\n&nbsp;  \nThe device starts connecting to the Wi-Fi network.',
            'After connecting to Wi-Fi network, tap **Continue**.',
            'When informed that application could not detect your location, tap **Skip**.',
            'Select **Room** that you want to add the device to.',
            'Tap the **Google Nest or partner device** option.',
            'Select **Home** that you want to add the device to.',
            'When prompted, set up voice ID or tap **Remind me later**.',
            "Tap **Let's go**.\n&nbsp;  \nThe device is added to the Alexa app and is visible in the selected room.",
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
        description: 'Samsung SmartThings',
        appManual: 'https://www.samsung.com/uk/smartthings/app/',
        pairingManual:
            'https://support.smartthings.com/hc/en-us/articles/360052390111-Devices-in-SmartThings',
        hubManual: 'https://partners.smartthings.com/matter',
        hubImage: '../resources/ecosystems/SmartThings/smartthings_hub.png',
        hubName: 'Aeotec Smart Home Hub',
        appImage: [
            '../resources/ecosystems/SmartThings/smartthings_android_qr_code.png',
            '../resources/ecosystems/SmartThings/smartthings_ios_qr_code.png',
        ],
        appImageAlt: [
            'Get the Android version from Google Play',
            'Get the iOS version from App Store',
        ],
        appSystemSupport: 'Android and iOS systems',
        setupVideo: '../resources/ecosystems/SmartThings/smartthings_hub.mp4',
        setupManual: [
            'Power on the **Aeotec Smart Home Hub**.',
            'Make sure that your smartphone is connected to the Wi-Fi network.',
            'Open the **SmartThings** app.',
            'Go to the **Devices** section.',
            'Tap **Add device**.',
            'Tap **Add** in the **Samsung devices** section.',
            'Select **Smart Home Hub** from the list.',
            'Scan the QR code printed on the bottom of the hub.',
            'Tap **Skip** to skip the geolocation setup.',
            'Select the connection type **Wi-Fi**.',
            'Make sure that the light on the Hub is blinking red and green and tap **Next**.',
            'Choose the Wi-Fi network that you want to use for the device.\n&nbsp;  \nMake sure it is the same network as the one you are currently using on your smartphone.',
            'Select the location, room and the name for the device, and tap **Done**.\n&nbsp;  \nYou will be navigated to the device detailed view.',
            'Tap **<** to go back to the room view.\n&nbsp;  \nThe device will be added to the SmartThings app and it should be visible in the selected room.',
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
