/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';

import Link from './Link';

/* eslint-disable @typescript-eslint/no-unused-vars */

const overWriteA = ({
    href,
    children,
}: {
    href?: string;
    children?: React.ReactNode;
}) => <Link color="tw-text-primary" label={children} href={href || ''} />;

const overwriteEm = ({ children }: { children: React.ReactNode }) => (
    <em className="tw-font-light">{children}</em>
);

const overwriteInfoImg = ({ src, alt }: { src?: string; alt?: string }) => (
    <img
        src={src}
        alt={alt}
        className="tw-mx-auto tw-block tw-max-h-[200px] tw-max-w-md"
    />
);

const TdComponent = ({
    isHeader,
    node,
    sourcePosition,
    index,
    siblingCount,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
    isHeader?: boolean;
    node?: unknown;
    sourcePosition?: unknown;
    index?: number;
    siblingCount?: number;
}) => {
    const ref = React.useCallback((element: HTMLTableCellElement | null) => {
        if (element) {
            const parent = element.parentElement;
            const isFirstColumn =
                parent && Array.from(parent.children).indexOf(element) === 0;
            if (isFirstColumn) {
                element.classList.remove(
                    'tw-text-center',
                    'tw-whitespace-nowrap'
                );
                element.classList.add('tw-text-left');
            } else {
                element.classList.remove('tw-text-left');
                element.classList.add('tw-text-center', 'tw-whitespace-nowrap');
            }
        }
    }, []);
    return <td ref={ref} className="tw-border tw-px-2 tw-py-1" {...props} />;
};

const tableComponents = {
    table: ({
        node,
        sourcePosition,
        index,
        siblingCount,
        ...props
    }: React.TableHTMLAttributes<HTMLTableElement> & {
        node?: unknown;
        sourcePosition?: unknown;
        index?: number;
        siblingCount?: number;
    }) => (
        <table
            className="tw-w-full tw-border-collapse tw-border tw-text-sm"
            {...props}
        />
    ),
    thead: ({
        node,
        sourcePosition,
        index,
        siblingCount,
        ...props
    }: React.HTMLAttributes<HTMLTableSectionElement> & {
        node?: unknown;
        sourcePosition?: unknown;
        index?: number;
        siblingCount?: number;
    }) => <thead {...props} />,
    tbody: ({
        node,
        sourcePosition,
        index,
        siblingCount,
        ...props
    }: React.HTMLAttributes<HTMLTableSectionElement> & {
        node?: unknown;
        sourcePosition?: unknown;
        index?: number;
        siblingCount?: number;
    }) => <tbody {...props} />,
    tr: ({
        node,
        sourcePosition,
        index,
        siblingCount,
        isHeader,
        ...props
    }: React.HTMLAttributes<HTMLTableRowElement> & {
        node?: unknown;
        sourcePosition?: unknown;
        index?: number;
        siblingCount?: number;
        isHeader?: boolean;
    }) => <tr {...props} />,
    th: ({
        isHeader,
        node,
        sourcePosition,
        index,
        siblingCount,
        ...props
    }: React.ThHTMLAttributes<HTMLTableCellElement> & {
        isHeader?: boolean;
        node?: unknown;
        sourcePosition?: unknown;
        index?: number;
        siblingCount?: number;
    }) => (
        <th
            className="tw-border tw-px-2 tw-py-1 tw-text-left tw-font-bold"
            {...props}
        />
    ),
    td: TdComponent,
};

export { overWriteA, overwriteEm, overwriteInfoImg, tableComponents };
