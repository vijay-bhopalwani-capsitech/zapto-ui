import React, { useEffect, useMemo, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, Layout, Menu, MenuProps, Row, Space, theme, Typography } from 'antd';
import { LOGO_FULL, LOGO_HALF, LOGO_WHITE } from '@/assets/images/imgAssets';
import { appUrls, sidebarUrls, useGetSidebarItems } from '@/config/navigationConfig';
import { createBreakpoint } from 'react-use';
import { useResponsive } from 'ahooks';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logoutUser, selectUserDesignation, selectUserName, selectUserProfileImage, selectUserStaffRoles, selectUserType } from '@/redux/slices/authSlice';
import { BsPower } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { AppDispatch } from '@/redux/store';
// import { AbilityContext, useGetUserAbility } from '@/components/ui/ability';
import { hexToRgba, useModalState } from 'ui-helpers';
import { IAntTheme } from '@/theme/themeConfig';
import { usePathname, useRouter } from 'next/navigation';
import { MdLockReset } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import ResetPasswordModal from '@/components/settings/staff/password/ResetPasswordModal';
import PageContainer from '@/utils/PageContainer';
import { AButton } from 'ant-ui';
import { selectCurrentTheme } from '@/redux/slices/appConfigSlice';
import ModernFloatingHeader from './FloatingHeader';

const { Text } = Typography;

const { Header, Sider, Content } = Layout;

interface IAdminLayoutProps {
    children: React.ReactNode;
}

const breakpoints = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
};

// @ts-ignore
const useBreakpoint = createBreakpoint(breakpoints);

export const UnAuthLayout = ({ children }: IAdminLayoutProps) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getUserProfile());
    }, []);
    const currentConfigTheme = useSelector(selectCurrentTheme);

    // const ability = useGetUserAbility();

    const toggleSidebar = () => setCollapsed((prev) => !prev);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { token: themeToken } = theme.useToken();
    const breakpoint = useResponsive();
    const { xs, sm, md, lg, xl, xxl } = breakpoint;
    const isTablet = xs && sm && md && !lg && !xl && !xxl;
    const isPhone = xs && !md && !lg && !xl && !xxl;
    const isCollapsedView = isPhone || isTablet;
    const pathname = usePathname();

    // const sidebarItems = useGetCrmUserSidebarItems({ ability });
    const sidebarItems = useGetSidebarItems({});
    const activeLinks = useMemo(() => {
        let urls: any[] = [];
        sidebarItems.map((item) => {
            if (item.type === 'group') {
                // @ts-ignore
                urls.push(...item.children);
            } else {
                urls.push(item);
            }
        });

        const activeKeys: string[] = [];
        urls.forEach((item) => {
            if ((item?.partialMatch && item?.activeUrls?.some((url: string) => pathname?.includes(url))) || item?.activeUrls?.includes(pathname)) {
                activeKeys.push(item.key);
            }
        });
        return activeKeys;
    }, [pathname, sidebarItems]);

    return (
        // <AbilityContext.Provider value={ability}>
        <Layout className="h-full">
            {/* <Header
                style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    background: themeToken.colorBgBase,
                    borderBottom: `1px solid ${themeToken.colorPrimary}`,
                }}
            >
                <Row className="container" >
                    <Col span={20}>
                        <Row justify={'start'} align={'middle'}>
                            <div
                                style={{
                                    paddingRight: '10px',
                                    borderRight: '1px solid #d9d9d9',
                                }}
                            >
                                {!isCollapsedView ? (
                                    <img
                                        src={LOGO_FULL}
                                        style={{
                                            height: 28,
                                        }}
                                        alt="Logo"
                                    />
                                ) : (
                                    <img
                                        src={LOGO_HALF}
                                        style={{
                                            height: 28,
                                        }}
                                        alt="Logo"
                                    />
                                )}
                            </div>
                            <Col xs={1} lg={15}>
                                <Menu
                                    className="font-semibold"
                                    style={{
                                        background: themeToken.colorBgBase,
                                        borderBottom: `1px solid ${themeToken.colorBorder}`,
                                    }}
                                    // theme={'light'}
                                    defaultOpenKeys={collapsed ? [] : ['operations']}
                                    mode="horizontal"
                                    selectedKeys={activeLinks}
                                    // defaultSelectedKeys={activeLinks}
                                    items={sidebarItems}
                                    // multiple
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4} className="">
                        <Space align="center" size={'middle'} className="border-l-cyan-100 flex w-full justify-end px-5 border-1">
                            <AButton type="default" size='large' style={{ color: '#D29022', borderColor: '#D29022' , background: 'transparent' }} className="px-4 py-2 border border-[#D29022] text-[#D29022] rounded-lg hover:bg-[#D29022] hover:text-white transition-colors duration-200" onClick={() => router.push(appUrls.LOGIN)}>
                                Get the App
                            </AButton>
                            <AButton type="primary" size='large'  className="px-4 py-2 border border-[#D29022] text-[#D29022] rounded-lg hover:bg-[#D29022] hover:text-white transition-colors duration-200" onClick={() => router.push(appUrls.LOGIN)}>
                                Login
                            </AButton>
                            <AButton type="link" size='large' className="px-4 py-2 border border-[#D29022] text-[#D29022] rounded-lg hover:bg-[#D29022] hover:text-white transition-colors duration-200" onClick={() => router.push(appUrls.REGISTER)}>
                                Register
                            </AButton>
                        </Space>
                    </Col>
                </Row>
            </Header> */}
            <ModernFloatingHeader
                themeToken={themeToken}
                isCollapsedView={isCollapsedView}
                collapsed={collapsed}
                activeLinks={activeLinks}
                sidebarItems={sidebarItems}
                router={router}
                LOGO_FULL={LOGO_FULL}
                LOGO_HALF={LOGO_HALF}
                children={undefined}
                appUrls={appUrls}
            />
            <PageContainer>
                <Content
                    className={'crm-layout-content'}
                    style={{
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </PageContainer>
        </Layout>
    );
};
