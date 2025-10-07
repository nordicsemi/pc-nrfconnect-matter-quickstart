/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import fs from 'fs';
import path from 'path';

/* eslint-disable @typescript-eslint/no-explicit-any */
// Import configuration files
import { controllingConfig } from '../src/features/flows/controllingConfig';
import { ecosystemConfig } from '../src/features/flows/ecosystemConfig';
import nRF54L15Config from '../src/features/flows/nRF54L15';
import nRF54LM20Config from '../src/features/flows/nRF54LM20';
import nRF5340Config from '../src/features/flows/nRF5340';
import nRF52840Config from '../src/features/flows/nRF52840';
import { pairingConfig } from '../src/features/flows/pairingConfig';
import thingy53Config from '../src/features/flows/thingy53';

/**
 * Utility function to check if a file exists
 * @param {string} relativePath - Path relative to the project root
 * @returns {boolean} indicating if file exists
 */
const fileExists = (relativePath: string): boolean => {
    const fullPath = path.resolve(__dirname, '..', relativePath);
    return fs.existsSync(fullPath);
};

/**
 * Utility function to validate URL format
 * @param {string} url - URL string to validate
 * @returns {boolean} indicating if URL has valid format
 */
const isValidUrl = (url: string): boolean => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = new URL(url);
        return true;
    } catch {
        return false;
    }
};

describe('Resource Links Validation', () => {
    describe('ControllingConfig video paths', () => {
        it('should have valid video paths for all devices and ecosystems', () => {
            const missingVideos: string[] = [];

            controllingConfig.forEach(config => {
                config.controllingGuide.forEach(guide => {
                    if (!fileExists(path.join(__dirname, guide.video))) {
                        missingVideos.push(
                            `${config.name} - ${guide.name}: ${guide.video}`
                        );
                    }
                });
            });

            expect(missingVideos).toEqual([]);
        });
    });

    describe('EcosystemConfig image and video paths', () => {
        it('should have valid hub images for all ecosystems', () => {
            const missingImages: string[] = [];

            ecosystemConfig.forEach(ecosystem => {
                if (!fileExists(path.join(__dirname, ecosystem.hubImage))) {
                    missingImages.push(
                        `${ecosystem.name} - hubImage: ${ecosystem.hubImage}`
                    );
                }
            });

            expect(missingImages).toEqual([]);
        });

        it('should have valid app images for all ecosystems', () => {
            const missingImages: string[] = [];

            ecosystemConfig.forEach(ecosystem => {
                ecosystem.appImage.forEach((img, idx) => {
                    if (!fileExists(path.join(__dirname, img))) {
                        missingImages.push(
                            `${ecosystem.name} - appImage[${idx}]: ${img}`
                        );
                    }
                });
            });

            expect(missingImages).toEqual([]);
        });

        it('should have valid setup videos for all ecosystems', () => {
            const missingVideos: string[] = [];

            ecosystemConfig.forEach(ecosystem => {
                if (!fileExists(path.join(__dirname, ecosystem.setupVideo))) {
                    missingVideos.push(
                        `${ecosystem.name} - setupVideo: ${path.join(
                            __dirname,
                            '..',
                            'resources',
                            'ecosystems',
                            ecosystem.setupVideo
                        )}`
                    );
                }
            });

            expect(missingVideos).toEqual([]);
        });
    });

    describe('PairingConfig factory data and video paths', () => {
        it('should have valid factory data hex files for all devices', () => {
            const missingFactoryData: string[] = [];

            pairingConfig.forEach(config => {
                if (
                    !fileExists(
                        path.join(
                            __dirname,
                            '..',
                            'resources',
                            'devices',
                            'factory_data',
                            path.basename(config.factoryData)
                        )
                    )
                ) {
                    missingFactoryData.push(
                        `${config.name} - factoryData: ${path.join(
                            __dirname,
                            '..',
                            'resources',
                            'devices',
                            'factory_data',
                            path.basename(config.factoryData)
                        )}`
                    );
                }
            });

            expect(missingFactoryData).toEqual([]);
        });

        it('should have valid pairing videos for all devices and ecosystems', () => {
            const missingVideos: string[] = [];

            pairingConfig.forEach(config => {
                config.pairingGuide.forEach(guide => {
                    if (
                        !fileExists(
                            path.join(
                                __dirname,
                                '..',
                                'ecosystems',
                                guide.video
                            )
                        )
                    ) {
                        missingVideos.push(
                            `${config.name} - ${guide.name}: ${path.join(
                                __dirname,
                                '..',
                                'ecosystems',
                                guide.video
                            )}`
                        );
                    }
                });
            });

            expect(missingVideos).toEqual([]);
        });
    });

    describe('devices hex files paths', () => {
        it('should have valid firmware hex files for all devices', () => {
            const missingFirmware: string[] = [];

            const deviceConfigs = [
                nRF54L15Config,
                nRF54LM20Config,
                nRF52840Config,
                nRF5340Config,
                thingy53Config,
            ];

            deviceConfigs.forEach(deviceConfig => {
                if ((deviceConfig as any).programConfig) {
                    (deviceConfig as any).programConfig.forEach(
                        (device: any) => {
                            device.firmware.forEach((firmware: any) => {
                                if (
                                    !fileExists(
                                        path.join(
                                            __dirname,
                                            '..',
                                            'resources',
                                            'devices',
                                            'firmware',
                                            firmware.file
                                        )
                                    )
                                ) {
                                    missingFirmware.push(`${device.name} (${
                                        firmware.core
                                    }) - firmware: ${firmware.file}
                        ${path.join(
                            __dirname,
                            '..',
                            'resources',
                            'devices',
                            'firmware',
                            firmware.file
                        )}`);
                                }
                            });
                        }
                    );
                }
            });

            expect(missingFirmware).toEqual([]);
        });

        it('should have valid learning resource URLs for all devices', () => {
            const invalidUrls: string[] = [];

            const deviceConfigs = [
                nRF54L15Config,
                nRF54LM20Config,
                nRF52840Config,
                nRF5340Config,
                thingy53Config,
            ];

            deviceConfigs.forEach(deviceConfig => {
                if ((deviceConfig as any).learnConfig) {
                    (deviceConfig as any).learnConfig.forEach(
                        (resource: any) => {
                            if (resource.link && resource.link.href) {
                                if (!isValidUrl(resource.link.href)) {
                                    invalidUrls.push(
                                        `${deviceConfig.device} - ${resource.label}: ${resource.link.href}`
                                    );
                                }
                            }
                        }
                    );
                }
            });

            expect(invalidUrls).toEqual([]);
        });

        it('should have valid advertising/pairing image files for all devices', () => {
            const missingImages: string[] = [];

            const deviceConfigs = [
                nRF54L15Config,
                nRF54LM20Config,
                nRF52840Config,
                nRF5340Config,
                thingy53Config,
            ];

            deviceConfigs.forEach(deviceConfig => {
                const config = deviceConfig as any;
                if (
                    config.advertisingData &&
                    config.advertisingData.enablePairingImage
                ) {
                    if (
                        !fileExists(
                            path.join(
                                __dirname,
                                config.advertisingData.enablePairingImage
                            )
                        )
                    ) {
                        missingImages.push(
                            `${
                                deviceConfig.device
                            } - enablePairingImage: ${path.join(
                                __dirname,
                                config.advertisingData.enablePairingImage
                            )}`
                        );
                    }
                }
            });

            expect(missingImages).toEqual([]);
        });

        it('should have valid interactConfig device images for all devices', () => {
            const missingImages: string[] = [];

            const deviceConfigs = [
                nRF54L15Config,
                nRF54LM20Config,
                nRF52840Config,
                nRF5340Config,
                thingy53Config,
            ];

            deviceConfigs.forEach(deviceConfig => {
                const config = deviceConfig as any;
                if (config.interactConfig) {
                    config.interactConfig.forEach((conf: any) => {
                        // Only check dkImage if it exists
                        if (conf.dkImage) {
                            if (
                                !fileExists(path.join(__dirname, conf.dkImage))
                            ) {
                                missingImages.push(
                                    `${conf.name} - dkImage: ${path.join(
                                        __dirname,
                                        conf.dkImage
                                    )}`
                                );
                            }
                        }
                    });
                }
            });

            expect(missingImages).toEqual([]);
        });
    });
});
