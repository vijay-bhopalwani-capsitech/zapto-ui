import { ReactNode } from 'react';
import { useGenerateAntTheme } from '@/theme/themeConfig';
import locale from 'antd/lib/date-picker/locale/en_GB';
import { ConfigProvider, theme } from 'antd';
import { Locale } from 'antd/es/locale';

export function AntThemeProvider({ children }: { children: ReactNode }) {
    const theme = useGenerateAntTheme();

    return (
        <ConfigProvider theme={theme} locale={locale as unknown as Locale}>
            {children}
        </ConfigProvider>
    );
}
