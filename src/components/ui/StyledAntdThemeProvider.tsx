import React, { ReactNode } from 'react';
import { theme } from 'antd';
import { ThemeProvider } from 'styled-components';

function StyledAntdThemeProvider({ children }: { children: ReactNode }) {
    const { token: themeToken } = theme.useToken();
    return <ThemeProvider theme={themeToken}>{children}</ThemeProvider>;
}

export default StyledAntdThemeProvider;
