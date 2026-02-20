/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';

export default ({ jlinkRtt }: { jlinkRtt?: boolean }) => (
    <p className="ellipsis">
        {jlinkRtt
            ? 'Please do not unplug the nRF54L15 TAG device from the nRF54L15 DK during the verification process.'
            : 'Please wait'}
    </p>
);
