import styled from 'styled-components';
import PerfectScrollbar, { ScrollBarProps } from 'react-perfect-scrollbar';
import { IAntTheme } from '@/theme/themeConfig';

interface IPageContainerProps extends ScrollBarProps {
    isPageWrapper?: boolean;
}

const scrollbarOptions = {
    suppressScrollX: true,
    wheelPropagation: true,
    swipeEasing: false,
    wheelSpeed: 0.3,
};

const StyledContainer = styled.div`
    // padding: ${({ theme }: { theme: IAntTheme }) => theme.paddingSM}px;
`;

const PageContainer = ({ children, style, options, isPageWrapper = true, ...props }: IPageContainerProps) => {
    return (
        <PerfectScrollbar style={style ? style : { height: 'calc(100vh)' }} options={options ? options : scrollbarOptions} {...props}>
            {isPageWrapper ? <StyledContainer>{children}</StyledContainer> : children}
        </PerfectScrollbar>
    );
};

export default PageContainer;
