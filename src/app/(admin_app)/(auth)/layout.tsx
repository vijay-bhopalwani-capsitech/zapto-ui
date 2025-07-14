'use client';

import { UnAuthLayout } from '@/components/layouts/UnAuthLayout';

export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    // return <UnAuthLayout>{children}</UnAuthLayout>;
    return <>{children}</>;
}
