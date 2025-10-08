/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import pkg from '../../../package.json';
import {
    ResourceProps,
    ResourcesWithdDownloadAndGuide,
} from '../../common/Resource';

export interface SampleWithRefAndDescription {
    ref: string;
    sampleSource: string;
    description: string;
}

export const commonLearningResources: ResourceProps[] = [
    {
        label: 'nRF Connect SDK and Zephyr',
        description:
            'Learn about the application development in the nRF Connect SDK and Zephyr.',
        link: {
            label: 'Application development',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/app_dev.html',
        },
    },
    {
        label: 'Matter Specification',
        description: 'Matter is a standard for smart home devices.',
        link: {
            label: 'Matter',
            href: 'https://csa-iot.org/all-solutions/matter/',
        },
    },
    {
        label: 'Matter Repository',
        description: 'Connected Home Over IP (Matter) main repository',
        link: {
            label: 'Matter Repository',
            href: 'https://github.com/project-chip/connectedhomeip',
        },
    },
    {
        label: 'Matter protocol in nRF Connect SDK',
        description: 'Matter protocol in nRF Connect SDK',
        link: {
            label: 'Matter protocol in nRF Connect SDK',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/protocols/matter/index.html',
        },
    },
];

export const matterDevResources: ResourcesWithdDownloadAndGuide[] = [
    {
        label: 'CHIP Tool',
        description:
            'A command-line controller for Matter devices. Use CHIP Tool to commission, control, and interact with Matter-enabled devices during development and testing. This tool is available only for Linux systems.',
        downloadLink: {
            label: 'CHIP Tool',
            href: `https://github.com/nrfconnect/sdk-connectedhomeip/releases/download/v${pkg.ncs_revision}/chip-tool_x64`,
        },
        guideLink: {
            label: 'CHIP Tool user guide',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/matter/chip_tool_guide.html',
        },
    },
    {
        label: 'Matter OTA provider App',
        description:
            'A command-line application for providing Matter Over-the-Air (OTA) firmware updates. Use this tool to serve firmware images and manage OTA update processes for Matter devices. This tool is available only for Linux systems.',
        downloadLink: {
            label: 'Matter OTA provider App',
            href: `https://github.com/nrfconnect/sdk-connectedhomeip/releases/download/v${pkg.ncs_revision}/chip-ota-provider-app_x64`,
        },
        guideLink: {
            label: 'Matter OTA user guide',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/protocols/matter/overview/dfu.html',
        },
    },
    {
        label: 'CHIP Cert application',
        description:
            'A utility for generating, managing, and verifying Matter certificates. Essential for setting up device attestation and secure communication in Matter networks. This tool is available only for Linux systems.',
        downloadLink: {
            label: 'CHIP Cert application',
            href: `https://github.com/nrfconnect/sdk-connectedhomeip/releases/download/v${pkg.ncs_revision}/chip-cert_x64`,
        },
        guideLink: {
            label: 'CHIP Cert application user guide',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/matter/README.html',
        },
    },
    {
        label: 'ZapTool',
        description:
            'A graphical tool for creating, editing, and managing Matter data models and clusters. Use ZapTool to define device capabilities and generate configuration files for your Matter applications.',
        downloadLink: {
            label: 'ZapTool',
            href: `https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/protocols/matter/getting_started/tools.html#installing_the_zap_tool`,
        },
        guideLink: {
            label: 'ZapTool user guide',
            href: 'https://docs.silabs.com/zap-tool/1.0.0/zap-users-guide/',
        },
        buttonLabel: 'See download instructions',
    },
    {
        label: 'Online Power Profiler for Matter over Thread',
        description:
            'An online tool for profiling the power consumption of Matter devices operating over Thread. Use this tool to estimate and analyze the energy usage of your device under various scenarios, helping you optimize battery life and performance during development.',
        downloadLink: {
            label: 'Matter Online Profiler',
            href: `https://devzone.nordicsemi.com/power/w/opp/16/online-power-profiler-for-matter-over-thread`,
        },
        guideLink: {
            label: 'Online Power Profiler for Matter over Thread user guide',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/protocols/matter/getting_started/tools.html#online_power_profiler_for_matter_over_thread',
        },
        buttonLabel: 'Open the tool in your browser',
    },
    {
        label: 'Matter Cluster Editor Desktop App',
        description:
            'A desktop application for editing Matter clusters and attributes. Use this tool to create, modify, and validate Matter device configurations. This tool is installed via nRF Connect for Desktop launcher. You can install it in the next steps.',
        guideLink: {
            label: 'Matter Cluster Editor app overview and guide',
            href: 'https://docs.nordicsemi.com/bundle/nrf-connect-matter-cluster-editor/page/index.html',
        },
    },
];

export const sampleCommonConfig = [
    {
        ref: 'Matter Door Lock',
        description:
            'This sample demonstrates the usage of the Matter application layer to create a door lock device with one basic bolt.',
        sampleSource: 'nrf/samples/matter/lock',
    },
    {
        ref: 'Matter Light Bulb',
        description:
            'This sample demonstrates the usage of the Matter application layer to create a dimmable light bulb device.',
        sampleSource: 'nrf/samples/matter/light_bulb',
    },
    {
        ref: 'Matter Weather Station',
        description:
            'This sample demonstrates the usage of the Matter application layer to create a weather station device.',
        sampleSource: 'nrf/applications/weather_station',
    },
    {
        ref: 'Matter Temperature Sensor',
        description:
            'This sample demonstrates the usage of the Matter application layer to create a temperature sensor device.',
        sampleSource: 'nrf/samples/matter/temperature_sensor',
    },
    {
        ref: 'Matter Contact Sensor',
        description:
            'This sample demonstrates the usage of the Matter application layer to create a contact sensor device.',
        sampleSource: 'nrf/samples/matter/contact_sensor',
    },
];

export const appsCommonConfig = [
    'pc-nrfconnect-programmer',
    'pc-nrfconnect-serial-terminal',
    'pc-nrfconnect-board-configurator',
    'pc-nrfconnect-dtm',
    'pc-nrfconnect-matter-cluster-editor',
    'pc-nrfconnect-ppk',
];

export const cliCommonConfig = [
    {
        label: 'Installing the nRF Connect SDK',
        description: 'Install the nRF Connect toolchain and SDK.',
        link: {
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/installation/install_ncs.html',
            label: 'Manual installation instructions',
        },
    },
    {
        label: 'nRF Util',
        description:
            'A modular command line tool, enabling power users to manage Nordic Semiconductor devices and support automation.',
        link: {
            href: 'https://docs.nordicsemi.com/bundle/nrfutil/page/README.html',
            label: 'nRF Util documentation',
        },
    },
    {
        label: 'West',
        description:
            'A tool for managing multiple Git repositories and versions.',
        link: {
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/zephyr/develop/west/index.html',
            label: 'West overview',
        },
    },
];
