import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';

import '@fontsource-variable/nunito-sans';
import '@fontsource-variable/outfit';
import './globals.css';
import 'animate.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';

import { QueryClient } from '@tanstack/query-core';

import { App as AntdApp } from 'antd';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Zappotel - Backpacking Redefined',
    description: 'Zappotel backpacking redefined',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </head>
            <body>
                <div>
                    <AntdRegistry>{children}</AntdRegistry>
                </div>
            </body>
        </html>
    );
}
