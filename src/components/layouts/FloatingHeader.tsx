import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Row, Col, Menu, Space, Button as AButton, Drawer } from 'antd';
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps, DrawerProps } from 'antd';

const { Header, Content } = Layout;

// TypeScript interfaces and types
interface ThemeToken {
    colorBgBase: string;
    colorPrimary: string;
    colorBorder: string;
}

interface AppUrls {
    LOGIN: string;
    REGISTER?: string;
    HOME?: string;
    ABOUT?: string;
    CONTACT?: string;
    [key: string]: string | undefined;
}

interface Router {
    push: (url: string) => void | Promise<boolean>;
    replace?: (url: string) => void | Promise<boolean>;
    back?: () => void;
    forward?: () => void;
    pathname?: string;
    query?: Record<string, string | string[]>;
    asPath?: string;
    [key: string]: any;
}

interface MenuItem {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    children?: MenuItem[];
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent) => void;
}

interface ModernFloatingHeaderProps {
    children: React.ReactNode;
    themeToken: ThemeToken;
    isCollapsedView: boolean;
    collapsed: boolean;
    activeLinks: string[];
    sidebarItems: MenuProps['items'];
    router: Router;
    appUrls: any;
    LOGO_FULL: string;
    LOGO_HALF: string;
    cartItemCount?: number;
    onCartClick?: () => void;
    onMenuItemClick?: (key: string) => void;
    className?: string;
    style?: React.CSSProperties;
}

const ModernFloatingHeader: React.FC<ModernFloatingHeaderProps> = ({
    children,
    themeToken,
    isCollapsedView,
    collapsed,
    activeLinks,
    sidebarItems,
    router,
    appUrls,
    LOGO_FULL,
    LOGO_HALF,
    cartItemCount = 0,
    onCartClick,
    onMenuItemClick,
    className,
    style,
}) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    // Memoized event handlers for better performance
    const handleResize = useCallback((): void => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    const handleScroll = useCallback((): void => {
        setIsScrolled(window.scrollY > 50);
    }, []);

    const handleMobileMenuToggle = useCallback((): void => {
        setMobileMenuOpen((prev) => !prev);
    }, []);

    const handleMobileMenuClose = useCallback((): void => {
        setMobileMenuOpen(false);
    }, []);

    const handleCartClick = useCallback((): void => {
        if (onCartClick) {
            onCartClick();
        }
    }, [onCartClick]);

    const handleMenuClick = useCallback(
        ({ key }: { key: string }): void => {
            if (onMenuItemClick) {
                onMenuItemClick(key);
            }
        },
        [onMenuItemClick]
    );

    const handleNavigateToLogin = useCallback((): void => {
        if (appUrls.LOGIN) {
            router.push(appUrls.LOGIN);
        }
    }, [router, appUrls.LOGIN]);

    const handleNavigateToApp = useCallback((): void => {
        if (appUrls.REGISTER || appUrls.LOGIN) {
            router.push(appUrls.REGISTER || appUrls.LOGIN);
        }
    }, [router, appUrls.REGISTER, appUrls.LOGIN]);

    const handleMobileLoginClick = useCallback((): void => {
        handleNavigateToLogin();
        handleMobileMenuClose();
    }, [handleNavigateToLogin, handleMobileMenuClose]);

    const handleMobileAppClick = useCallback((): void => {
        handleNavigateToApp();
        handleMobileMenuClose();
    }, [handleNavigateToApp, handleMobileMenuClose]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return (): void => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleResize, handleScroll]);

    // Memoized class names for better performance
    const headerClasses: string = `
  fixed top-5 left-1/2 transform -translate-x-1/2 z-[1000]
  backdrop-blur-md bg-gradient-to-r from-[#D29022]/80 to-[#610E07]/80
  rounded-full shadow-lg
  px-6 py-3 w-[95%] max-w-[1280px]
  transition-all duration-500 ease-in-out
  ${isScrolled ? 'bg-gradient-to-r from-[#D29022]/90 to-[#610E07]/90 shadow-xl' : ''}
  hover:shadow-2xl ${className || ''}
`;
    const fallbackHeaderClasses: string = `
  fixed top-5 left-1/2 transform -translate-x-1/2 z-[1000]
  bg-gradient-to-r from-[#D29022] to-[#610E07]
  bg-opacity-80 rounded-full shadow-lg
  px-6 py-3 w-[95%] max-w-[1280px]
  transition-all duration-500 ease-in-out
  ${isScrolled ? 'bg-opacity-90 shadow-xl' : ''}
  hover:shadow-2xl
`;

    // Enhanced menu items with proper typing
    const enhancedMenuItems: MenuProps['items'] = sidebarItems?.map((item: any) => ({
        ...item,
        style: {
            color: 'white',
            borderRadius: '20px',
            margin: '0 4px',
            transition: 'all 0.3s ease',
            ...(item?.style || {}),
        },
        className: `hover:bg-white/20 hover:text-[#D29022] transition-all duration-300 ${item?.className || ''}`,
    }));

    const mobileMenuItems: MenuProps['items'] = sidebarItems?.map((item: any) => ({
        ...item,
        style: {
            color: 'white',
            borderRadius: '8px',
            margin: '4px 0',
            padding: '12px 16px',
            ...(item?.style || {}),
        },
        className: `hover:bg-white/20 hover:text-[#D29022] transition-all duration-300 ${item?.className || ''}`,
    }));

    const drawerProps: DrawerProps = {
        title: (
            <div className="flex items-center">
                <img src={LOGO_FULL} style={{ height: 28 }} alt="Logo" loading="lazy" />
            </div>
        ),
        placement: 'right',
        onClose: handleMobileMenuClose,
        open: mobileMenuOpen,
        className: 'mobile-menu-drawer',
        headerStyle: {
            background: '#3C0A05',
            color: 'white',
            borderBottom: '1px solid #D29022',
        },
        bodyStyle: {
            background: '#3C0A05',
            padding: 0,
        },
        width: isMobile ? '80%' : 400,
        destroyOnClose: true,
    };

    return (
        <Layout className="h-full" style={style}>
            {/* Floating Pill Header */}
            <div className={headerClasses}>
                {/* Fallback for browsers without backdrop-filter support */}
                {/* <div className={fallbackHeaderClasses} style={{ display: 'none' }} aria-hidden="true" /> */}

                <Row
                    justify="space-between"
                    align="middle"
                    className="w-full"
                    //   style={{ minHeight: '48px' }}
                >
                    {/* Logo Section */}
                    <Col xs={8} md={6} lg={4} className="flex items-center">
                        <div className="flex items-center">
                            <img
                                src={!isCollapsedView ? LOGO_FULL : LOGO_HALF}
                                style={{ height: 32 }}
                                alt="Company Logo"
                                className="transition-all duration-300 hover:scale-105 cursor-pointer"
                                loading="lazy"
                                onClick={() => router.push('/')}
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>
                    </Col>

                    {/* Navigation Menu - Desktop */}
                    {!isMobile && (
                        <Col xs={0} md={12} lg={14} className="flex justify-center">
                            <Menu
                                className="font-semibold bg-transparent border-0"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                }}
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={activeLinks}
                                items={enhancedMenuItems}
                                onClick={handleMenuClick}
                                role="navigation"
                                aria-label="Main navigation"
                            />
                        </Col>
                    )}

                    {/* Action Buttons Section */}
                    <Col xs={16} md={6} lg={6} className="flex justify-end">
                        {/* <Space size="small" direction='horizontal' align='center'> */}
                        <div className="flex justify-end items-center space-x-4">

                            {/* Get the App Button */}
                            <AButton
                                type="default"
                                size="large"
                                className="
                  transition-all duration-300 px-5 py-2 rounded-full 
                  border-2 border-[#D29022] text-[#D29022] bg-transparent 
                  hover:bg-[#D29022] hover:text-white hover:scale-105 
                  shadow hover:shadow-lg hover:border-[#B8791D]
                  font-semibold hidden sm:inline-flex
                "
                                onClick={handleNavigateToApp}
                                aria-label="Download mobile app"
                            >
                                📱 Get the App
                            </AButton>

                            {/* Login Button */}
                            <AButton
                                type="primary"
                                size="large"
                                className="
                  transition-all duration-300 px-5 py-2 rounded-full 
                  bg-[#D29022] border-2 border-[#D29022] text-white 
                  hover:bg-[#B8791D] hover:border-[#B8791D] hover:scale-105 
                  shadow-md hover:shadow-lg font-semibold
                "
                                onClick={handleNavigateToLogin}
                                aria-label="Login to your account"
                            >
                                Login
                            </AButton>

                            {/* Mobile Menu Toggle */}
                            {isMobile && (
                                <AButton
                                    type="text"
                                    size="large"
                                    className="
                    text-white hover:text-[#D29022] hover:bg-white/20 
                    rounded-full p-2 transition-all duration-300 
                    hover:scale-110 ml-2
                  "
                                    icon={<MenuOutlined />}
                                    onClick={handleMobileMenuToggle}
                                    aria-label="Open mobile menu"
                                    aria-expanded={mobileMenuOpen}
                                    aria-controls="mobile-menu"
                                />
                            )}
                            </div>
                        {/* </Space> */}
                    </Col>
                </Row>
            </div>

            {/* Mobile Menu Drawer */}
            <Drawer {...drawerProps}>
                <Menu
                    className="bg-transparent border-0"
                    style={{ background: 'transparent', border: 'none' }}
                    theme="dark"
                    mode="vertical"
                    selectedKeys={activeLinks}
                    items={mobileMenuItems}
                    onClick={handleMenuClick}
                    role="navigation"
                    aria-label="Mobile navigation menu"
                    id="mobile-menu"
                />

                {/* Mobile Action Buttons */}
                <div className="p-4 border-t border-[#D29022]/30 mt-4">
                    <Space direction="vertical" size="middle" className="w-full">
                        <AButton
                            type="default"
                            size="large"
                            block
                            className="
                transition-all duration-300 rounded-full 
                border-2 border-[#D29022] text-[#D29022] bg-transparent 
                hover:bg-[#D29022] hover:text-white hover:scale-105 
                shadow hover:shadow-lg font-semibold
              "
                            onClick={handleMobileAppClick}
                            aria-label="Download mobile app"
                        >
                            Get the App
                        </AButton>

                        <AButton
                            type="primary"
                            size="large"
                            block
                            className="
                transition-all duration-300 rounded-full 
                bg-[#D29022] border-2 border-[#D29022] text-white 
                hover:bg-[#B8791D] hover:border-[#B8791D] hover:scale-105 
                shadow-md hover:shadow-lg font-semibold
              "
                            onClick={handleMobileLoginClick}
                            aria-label="Login to your account"
                        >
                            Login
                        </AButton>
                    </Space>
                </div>
            </Drawer>

            {/* Custom Styles */}
            <style jsx global>{`
                /* Backdrop filter fallback */
                @supports not (backdrop-filter: blur(10px)) {
                    .floating-header-fallback {
                        background-color: rgba(60, 10, 5, 0.95) !important;
                    }
                }

                /* Smooth animations */
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-2px);
                    }
                }

                .floating-header:hover {
                    animation: float 2s ease-in-out infinite;
                }

                /* Custom scrollbar for mobile drawer */
                .mobile-menu-drawer .ant-drawer-body::-webkit-scrollbar {
                    width: 4px;
                }

                .mobile-menu-drawer .ant-drawer-body::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }

                .mobile-menu-drawer .ant-drawer-body::-webkit-scrollbar-thumb {
                    // background: #d29022;
                    border-radius: 2px;
                }

                /* Ensure proper z-index stacking */
                .ant-layout-header {
                    z-index: 999;
                }

                /* Menu item hover effects */
                .ant-menu-horizontal .ant-menu-item:hover {
                    background: rgba(255, 255, 255, 0.2) !important;
                    color: #610e07 !important;
                    transform: scale(1.05);
                }

                /* Button bounce animation */
                @keyframes bounce {
                    0%,
                    20%,
                    50%,
                    80%,
                    100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-3px);
                    }
                    60% {
                        transform: translateY(-2px);
                    }
                }

                .ant-btn:hover {
                    animation: bounce 0.6s ease-in-out;
                }

                /* Pulse animation for cart badge */
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-pulse {
                    animation: pulse 2s infinite;
                }
            `}</style>
        </Layout>
    );
};

export default ModernFloatingHeader;
