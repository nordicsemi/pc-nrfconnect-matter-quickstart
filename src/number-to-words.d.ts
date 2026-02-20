/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

declare module 'number-to-words' {
    export function toWords(number: string | number): string;
    export function toOrdinal(number: string | number): string;
    export function toWordsOrdinal(number: string | number): string;
}
