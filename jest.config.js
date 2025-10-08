/*
 * Copyright (c) 2022 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

const baseConfig =
    require('@nordicsemiconductor/pc-nrfconnect-shared/config/jest.config')();

module.exports = {
    ...baseConfig,
    setupFilesAfterEnv: [
        ...(baseConfig.setupFilesAfterEnv || []),
        '<rootDir>/jest.setup.js',
    ],
    transformIgnorePatterns: [
        'node_modules/(?!(@nordicsemiconductor/pc-nrfconnect-shared|remark-gfm|micromark-extension-gfm|micromark-util-.*|micromark-.*|mdast-util-.*|unist-.*|ccount|escape-string-regexp|decode-named-character-reference|character-entities|markdown-table)/)',
    ],
};
