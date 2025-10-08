/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';

import Link from './Link';

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
    <div className="tw-flex tw-justify-center">
        <img src={src} alt={alt} className="tw-max-h-[200px] tw-max-w-md" />
    </div>
);

const TdComponent = (props: React.TdHTMLAttributes<HTMLTableCellElement>) => {
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
    table: ({ ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
        <table
            className="tw-w-full tw-border-collapse tw-border tw-text-sm"
            {...props}
        />
    ),
    thead: ({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead {...props} />
    ),
    tbody: ({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody {...props} />
    ),
    tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr {...props} />
    ),
    th: ({ ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
        <th
            className="tw-border tw-px-2 tw-py-1 tw-text-left tw-font-bold"
            {...props}
        />
    ),
    td: TdComponent,
};

export { overWriteA, overwriteEm, overwriteInfoImg, tableComponents };
