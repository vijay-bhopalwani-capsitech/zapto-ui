'use client';

import { Inter, Outfit } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';
import { ReactNode, useMemo } from 'react';
import { persistor, store } from '@/redux/store';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp } from 'antd';

import { UiSettingsProvider } from 'ant-ui/settings';

import { AntThemeProvider } from '@/components/ui/AntdThemeProvider';
import StyledAntdThemeProvider from '@/components/ui/StyledAntdThemeProvider';
import { selectIsSidebarOpen, selectConfigSize, selectMultiTaskingEnabled } from '@/redux/slices/appConfigSlice';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@/assets/styles/ct-select.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const inter = Outfit({ subsets: ['latin'] });

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 10 minutes in milliseconds
            staleTime: 600000,
        },
    },
});

const ProvideAppSettingsToAntUi = ({ children }: { children: ReactNode }) => {
    const sidebarOpen = useSelector(selectIsSidebarOpen);
    const size = useSelector(selectConfigSize);
    const multiTasking = useSelector(selectMultiTaskingEnabled);
    const appConfig = useMemo(() => {
        return {
            sidebarOpen: sidebarOpen ?? false,
            size: size ?? 'small',
            multiTasking: multiTasking ?? false,
        };
    }, [sidebarOpen, size, multiTasking]);
    return <UiSettingsProvider value={appConfig}>{children}</UiSettingsProvider>;
};

export default function AppLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-full">
            {/* Include shared UI here e.g. a header or sidebar */}
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <AntThemeProvider>
                            <StyledAntdThemeProvider>
                                <ProvideAppSettingsToAntUi>
                                    <AntdApp className="h-full">{children}</AntdApp>
                                </ProvideAppSettingsToAntUi>
                            </StyledAntdThemeProvider>
                            <ToastContainer transition={Slide} hideProgressBar progressClassName="toastProgress" bodyClassName="toastBody" />
                        </AntThemeProvider>
                        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </main>
    );
}
