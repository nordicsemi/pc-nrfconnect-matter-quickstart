/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

/**
 * This file contains the controlling configuration for the Matter devices.
 */

interface ControllingEcosystem {
    name: string;
    guide: string[];
    video: string;
    videoDeviceName: string;
}

export interface ControllingConfig {
    name: string;
    controllingGuide: ControllingEcosystem[];
}

export interface HardwareParams {
    led?: number;
    button?: number;
}

const replaceTemplateVars = (text: string, params: HardwareParams): string => {
    let result = text;
    if (params.led !== undefined) {
        result = result.replace(/\{LED\}/g, `LED ${params.led}`);
    } else {
        result = result.replace(/\{LED\}/g, 'LED');
    }
    if (params.button !== undefined) {
        result = result.replace(/\{BUTTON\}/g, `Button ${params.button}`);
    } else {
        result = result.replace(/\{BUTTON\}/g, 'button');
    }
    return result;
};

export const controllingConfig: ControllingConfig[] = [
    {
        name: 'Matter Door Lock',
        controllingGuide: [
            {
                name: 'Apple Home',
                guide: [
                    'Open the **Apple Home** app',
                    'Navigate to the room that contains the device that was previously paired',
                    'Tap the **Matter Accessory** Door Lock tile to open detailed view',
                    'Tap on the top part of the slider to unlock the Matter Door Lock',
                    `Observe that **{LED}** turns off`,
                    'Tap on the bottom part of the slider to lock the Matter Door Lock',
                    `Observe that **{LED}** turns on`,
                    'Click to the side to go back to the room view',
                    'Click on the lock symbol on the **Matter Accessory** tile to unlock the Matter Door Lock from the room view',
                    `Observe that **{LED}** turns off`,
                    'Click on the lock symbol on the **Matter Accessory** tile again to lock the Matter Door Lock from the room view',
                    `Observe that **{LED}** turns on`,
                ],
                video: '../resources/ecosystems/Apple/usage/apple_lock_usage.mp4',
                videoDeviceName: 'Matter Accessory',
            },
            {
                name: 'SmartThings',
                guide: [
                    'Open the **SmartThings** app',
                    'Go to the **Devices** page',
                    'Tap on the **MatterLock** tile to unlock the Matter Door Lock',
                    `Observe that **{LED}** turns off`,
                    `Tap on the **MatterLock** tile again to lock the Matter Door Lock`,
                    `Observe that **{LED}** turns on`,
                ],
                video: '../resources/ecosystems/SmartThings/usage/smartthings_lock_usage_short.mp4',
                videoDeviceName: 'MatterLock',
            },
            {
                name: 'Amazon Alexa',
                guide: [
                    'Open the **Amazon Alexa** app',
                    'Go to the **Devices** page',
                    'Tap the **First lock** Door Lock tile to open detailed view',
                    'Tap on the **Gear** icon on the right top to access settings',
                    'Tap on the **Enable** slider to allow unlock in the Alexa App',
                    'Go back to the **First lock** device detailed view',
                    'Tap on the lock symbol to unlock the Matter Door Lock',
                    `Observe that **{LED}** turns off`,
                    'Tap on the lock symbol again to lock the Matter Door Lock',
                    `Observe that **{LED}** turns on`,
                ],
                video: '../resources/ecosystems/Amazon/usage/alexa_lock_usage.mp4',
                videoDeviceName: 'First lock',
            },
            {
                name: 'Google Home',
                guide: [
                    'Open the **Google Home** app',
                    'Go to the **Devices** page',
                    'Tap the **Living Room device** Door Lock tile to open detailed view',
                    'Tap on the lock symbol to unlock the Matter Door Lock',
                    `Observe that **{LED}** turns off`,
                    'Tap on the lock symbol again to lock the Matter Door Lock',
                    `Observe that **{LED}** turns on`,
                ],
                video: '../resources/ecosystems/Google/usage/google_lock_usage.mp4',
                videoDeviceName: 'Living Room device',
            },
        ],
    },
    {
        name: 'Matter Light Bulb',
        controllingGuide: [
            {
                name: 'Apple Home',
                guide: [
                    'Open the **Apple Home** app',
                    'Navigate to the room that contains the device that was previously paired',
                    'Click on the light bulb symbol on the **Matter Accessory** tile to turn on the Matter Light Bulb from the room view',
                    `Observe that **{LED}** turns off`,
                    'Click on the light bulb symbol on the **Matter Accessory** tile again to turn off the Matter Light Bulb from the room view',
                    `Observe that **{LED}** turns on`,
                    'Tap the **Matter Accessory** Light Bulb tile to open detailed view',
                    'Tap on the slider to change the brightness of the Matter Light Bulb',
                    `Observe that **{LED}** *changed brightness level* accordingly`,
                ],
                video: '../resources/ecosystems/Apple/usage/apple_bulb_usage.mp4',
                videoDeviceName: 'Matter Accessory',
            },
            {
                name: 'SmartThings',
                guide: [
                    'Open the **SmartThings** app',
                    'Go to the **Devices** page',
                    'Tap the power symbol on the **MatterLight 1** Light Bulb tile to to turn on the Matter Light Bulb',
                    `Observe that **{LED}** turns on`,
                    'Tap on the **MatterLight 1** Light Bulb tile to open detailed view',
                    'Click on the power symbol again to turn off the Matter Light Bulb',
                    `Observe that **{LED}** turns off`,
                    'Move the slider to change the brightness of the Matter Light Bulb',
                    `Observe that **{LED}** *changed brightness level* accordingly`,
                ],
                video: '../resources/ecosystems/SmartThings/usage/smartthings_bulb_usage.mp4',
                videoDeviceName: 'MatterLight 1',
            },
            {
                name: 'Amazon Alexa',
                guide: [
                    'Open the **Amazon Alexa** app',
                    'Go to the **Devices** page',
                    'Tap the **First light** Light Bulb tile to open detailed view',
                    'Click on the power symbol to turn on the Matter Light Bulb',
                    `Observe that **{LED}** turns on`,
                    'Click on the power symbol again to turn off the Matter Light Bulb',
                    `Observe that **{LED}** turns off`,
                    'Clink on the power symbol again and move the slider to change the brightness of the Matter Light Bulb',
                    `Observe that **{LED}** *changed brightness level* accordingly`,
                ],
                video: '../resources/ecosystems/Amazon/usage/alexa_bulb_usage.mp4',
                videoDeviceName: 'First light',
            },
            {
                name: 'Google Home',
                guide: [
                    'Open the **Google Home** app',
                    'Go to the **Devices** page',
                    'Click on the light bulb symbol on the **Living Room device** tile to turn on the Matter Light Bulb from the room view',
                    `Observe that **{LED}** turns off`,
                    'Click on the light bulb symbol on the **Living Room device** tile again to turn off the Matter Light Bulb from the room view',
                    `Observe that **{LED}** turns on`,
                    'Press the **Living Room device** Light Bulb tile to open detailed view',
                    'Move the slider to change the brightness of the Matter Light Bulb',
                    `Observe that **{LED}** *changed brightness level* accordingly`,
                ],
                video: '../resources/ecosystems/Google/usage/google_bulb_usage.mp4',
                videoDeviceName: 'Living Room device',
            },
        ],
    },
    {
        name: 'Matter Weather Station',
        controllingGuide: [
            {
                name: 'Apple Home',
                guide: [
                    'Open the **Apple Home** app',
                    'Tap on the **Climate** tile on the top bar',
                    'Tap on the **Temperature** tile',
                    'You are going to see two **Temperature Sensor** tiles. The one is the in-built sensor of Apple Home hub, and the other is the sensor of Weather Station device.',
                    'Read the measurement of **Temperature Sensor** device that has battery symbol on the tile, as this is the Weather Station device.',
                    'Navigate back to the **Climate** view',
                    'Tap on the **Humidity** tile',
                    'You are going to see two **Humidity Sensor** tiles. The one is the in-built sensor of Apple Home hub, and the other is the sensor of Weather Station device.',
                    'Read the measurement of **Humidity Sensor** device that has battery symbol on the tile, as this is the Weather Station device.',
                ],
                video: '../resources/ecosystems/Apple/usage/apple_ws_usage.mp4',
                videoDeviceName: 'Temperature Sensor and Humidity Sensor',
            },
            {
                name: 'SmartThings',
                guide: [
                    'Open the **SmartThings** app',
                    'Go to the **Devices** page',
                    'Tap on the **MatterWeather** device tile to open detailed view',
                    'Observe the listed measurement values for **Temperature**, **Humidity**, and **Atmospheric pressure**',
                ],
                video: '../resources/ecosystems/SmartThings/usage/smartthings_ws_usage.mp4',
                videoDeviceName: 'MatterWeather',
            },
            {
                name: 'Amazon Alexa',
                guide: [
                    'Open the **Amazon Alexa** app',
                    'Go to the **Devices** page',
                    'Tap on the **First device** tile',
                    'Observe the measured temperature in Fahrenheit degrees',
                    'Navigate back to the **Devices** page',
                    'Tap on the **First humidity sensor** tile',
                    'Observe the measured humidity in percentages',
                ],
                video: '../resources/ecosystems/Amazon/usage/alexa_ws_usage.mp4',
                videoDeviceName: 'First device and First humidity sensor',
            },
            {
                name: 'Google Home',
                guide: [
                    'Open the **Google Home** app',
                    'Go to the **Devices** page',
                    `Tap on the **Humidity Sensor** device tile to open detailed view`,
                    `Observe the measured pressure in kPa`,
                    'Navigate back to the **Devices** page',
                    `Tap on the **Pressure Sensor** device tile to open detailed view`,
                    `Observe the measured humidity in percentages`,
                    'Navigate back to the **Devices** page',
                    `Tap on the **Temperature Sensor** device tile to open detailed view`,
                    `Observe the measured temperature in Celsius degrees`,
                    'Navigate back to the **Devices** page',
                    `Observe all the measured values visible also on the **Devices** view`,
                ],
                video: '../resources/ecosystems/Google/usage/google_ws_usage.mp4',
                videoDeviceName:
                    'Temperature Sensor, Humidity Sensor, and Pressure Sensor',
            },
        ],
    },
    {
        name: 'Matter Temperature Sensor',
        controllingGuide: [
            {
                name: 'Apple Home',
                guide: [
                    'Open the **Apple Home** app',
                    'Tap on the **Climate** tile on the top bar',
                    'Tap on the **Temperature** tile',
                    'You are going to see two **Temperature Sensor** tiles. The one is the in-built sensor of Apple Home hub, and the other is the sensor of Temperature Sensor device.',
                    'Find the **Temperature** tile with the name you assigned during commissioning and read its measurement.',
                    'The temperature reading will gradually increase from -20°C to 20°C in 1°C increments per each 10 seconds, repeating in a continuous loop.',
                ],
                video: '../resources/ecosystems/Apple/usage/apple_temperature_sensor_usage.mp4',
                videoDeviceName: 'Temperature',
            },
            {
                name: 'SmartThings',
                guide: [
                    'Open the **SmartThings** app',
                    'Go to the **Devices** page',
                    'Tap on the **Temperature sensor** device tile to open detailed view',
                    'Observe the simulated temperature in Celsius degrees. The temperature reading will gradually increase from -20°C to 20°C in 1°C increments per each 10 seconds, repeating in a continuous loop.',
                ],
                video: '../resources/ecosystems/SmartThings/usage/smartthings_temp_usage.mp4',
                videoDeviceName: 'Temperature sensor',
            },
            {
                name: 'Amazon Alexa',
                guide: [
                    'Open the **Amazon Alexa** app',
                    'Go to the **Devices** page',
                    'Tap on the **Temperature sensor** tile to open detailed view',
                    'Observe the simulated temperature in Celsius degrees. The temperature reading will gradually increase from -20°C to 20°C in 1°C increments per each 10 seconds, repeating in a continuous loop.',
                ],
                video: '../resources/ecosystems/Amazon/usage/alexa_temp_usage.mp4',
                videoDeviceName: 'Temperature sensor',
            },
            {
                name: 'Google Home',
                guide: [
                    'Open the **Google Home** app',
                    'Go to the **Devices** page',
                    'Tap on the **Temperature sensor** tile to open detailed view',
                    'Observe the simulated temperature in Celsius degrees. The temperature reading will gradually increase from -20°C to 20°C in 1°C increments per each 10 seconds, repeating in a continuous loop.',
                ],
                video: '../resources/ecosystems/Google/usage/google_temp_usage.mp4',
                videoDeviceName: 'Temperature Sensor',
            },
        ],
    },
    {
        name: 'Matter Contact Sensor',
        controllingGuide: [
            {
                name: 'Apple Home',
                guide: [
                    `Press the **{BUTTON}**`,
                    `Observe that **{LED}** turns on while pressing the button`,
                    'Release the button',
                    `Observe that **{LED}** turns off`,
                    'Open the **Apple Home** app',
                    'Navigate to the room that contains the device that was previously paired',
                    'Tap the **Activity History** tile to open a list of events',
                    `Press the **{BUTTON}** once again`,
                    'Wait for the update in the **Apple Home** app and observe that the event is added to the **Activity History** list as <bClosed/b>',
                    'Release the button',
                    'Wait for the update in the **Apple Home** app and observe that the event is removed from the **Activity History** list as <bOpened/b>',
                ],
                video: '../resources/ecosystems/Apple/usage/apple_contact_usage.mp4',
                videoDeviceName: 'Matter Accessory',
            },
            {
                name: 'SmartThings',
                guide: [
                    'Open the **SmartThings** app',
                    'Go to the **Devices** page',
                    'Tap on the **Open close sensor** tile to open detailed view',
                    `Press the **{BUTTON}**`,
                    `Observe that **{LED}** turns on and the Contact sensor tile in the **SmartThings** app is marked as **Closed**`,
                    'Release the button',
                    `Observe that **{LED}** turns off and the Contact sensor tile in the **SmartThings** app is marked as **Open**`,
                ],
                video: '../resources/ecosystems/SmartThings/usage/smartthings_contact_usage.mp4',
                videoDeviceName: 'Open close sensor',
            },
            {
                name: 'Amazon Alexa',
                guide: [
                    'Open the **Amazon Alexa** app',
                    'Go to the **Devices** page',
                    'Tap on the **Contact sensor** tile to open detailed view',
                    `Press the **{BUTTON}**`,
                    `Observe that **{LED}** turns on and the Contact sensor tile in the **Amazon Alexa** app is marked as **Closed**`,
                    'Release the button',
                    `Observe that **{LED}** turns off and the Contact sensor tile in the **Amazon Alexa** app is marked as **Open**`,
                ],
                video: '../resources/ecosystems/Amazon/usage/alexa_contact_usage.mp4',
                videoDeviceName: 'Contact sensor',
            },
            {
                name: 'Google Home',
                guide: [
                    'Open the **Google Home** app',
                    'Go to the **Devices** page',
                    `Press the **{BUTTON}**`,
                    `Observe that **{LED}** turns on and the Contact sensor tile in the **Google Home** app is marked as **Closed**`,
                    'Release the button',
                    `Observe that **{LED}** turns off and the Contact sensor tile in the **Google Home** app is marked as **Open**`,
                    'Tap on the **Contact sensor** tile to open detailed view',
                    `Press the **{BUTTON}**`,
                    `Observe that **{LED}** turns on and the Contact sensor tile in the **Google Home** app is marked as **Closed**`,
                    'Release the button',
                    `Observe that **{LED}** turns off and the Contact sensor tile in the **Google Home** app is marked as **Open**`,
                ],
                video: '../resources/ecosystems/Google/usage/google_contact_usage.mp4',
                videoDeviceName: 'Contact Sensor',
            },
        ],
    },
];

export const getSelectedControllingGuide = (
    sampleName: string,
    ecosystemName: string,
    hardwareParams?: HardwareParams
): ControllingEcosystem | undefined => {
    const config = controllingConfig.find(cfg => cfg.name === sampleName);
    if (config) {
        const guide = config.controllingGuide.find(
            guideEntry => guideEntry.name === ecosystemName
        );
        if (guide && hardwareParams) {
            // Return a copy with template variables replaced
            return {
                ...guide,
                guide: guide.guide.map(step =>
                    replaceTemplateVars(step, hardwareParams)
                ),
            };
        }
        return guide;
    }
    return undefined;
};

export const getSelectedControllingConfig = (
    name: string
): ControllingConfig | undefined =>
    controllingConfig.find(config => config.name === name);
