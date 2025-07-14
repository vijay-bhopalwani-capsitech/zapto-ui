import React, { useEffect, useMemo, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, Layout, Menu, MenuProps, Row, Space, theme, Typography } from 'antd';
import { LOGO_FULL, LOGO_HALF, LOGO_WHITE, SIGN_UP_INDIVIDUAL } from '@/assets/images/imgAssets';
import { appUrls, sidebarUrls, useGetSidebarItems } from '@/config/navigationConfig';
import { createBreakpoint } from 'react-use';
import { useResponsive } from 'ahooks';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logoutUser, selectLinkedCompanies, selectUserDesignation, selectUserName, selectUserProfileImage, selectUserStaffRoles, selectUserType } from '@/redux/slices/authSlice';
import { BsBuildingAdd, BsPower } from 'react-icons/bs';
import { IoMoonOutline, IoSettingsOutline, IoSunnyOutline } from 'react-icons/io5';
import { AppDispatch } from '@/redux/store';
// import { AbilityContext, useGetUserAbility } from '@/components/ui/ability';
import { hexToRgba, useModalState } from 'ui-helpers';
import { IAntTheme } from '@/theme/themeConfig';
import { usePathname, useRouter } from 'next/navigation';
import { MdLockReset } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import ResetPasswordModal from '@/components/settings/staff/password/ResetPasswordModal';
import PageContainer from '@/utils/PageContainer';
import { selectCurrentTheme, themeChanged } from '@/redux/slices/appConfigSlice';
import { AButton } from 'ant-ui';
import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineSetting } from 'react-icons/ai';
import { BellOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { FaChevronDown } from "react-icons/fa";

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

const StyledLayout = styled(Layout)`
    height: 100%;
`;

const StyledSider: typeof Sider & { themeToken: IAntTheme } = styled(Sider)`
    //border-right: 1px solid #dee2e6;
    z-index: 4;

    // margin: ${({ themeToken }: { themeToken: IAntTheme }) => themeToken.paddingXXS}px !important;
    border-radius: ${({ themeToken }: { themeToken: IAntTheme }) => themeToken.borderRadius}px !important;
    //border-right: 1px solid rgba(5, 5, 5, 0.06);
    .ant-menu {
        border-inline-end: none !important;
    }

    .ant-menu-inline-collapsed .ant-menu-item-group-title {
        display: none;
    }

    @media (max-width: ${breakpoints.md}) {
        position: absolute !important;
        .ant-layout-sider-children {
            height: 100vh !important;
        }

        .ant-layout-sider-zero-width-trigger-left {
            top: 0 !important;
            border: none !important;
        }
    }

    .ant-menu-root {
        // height: 100% !important;
    }

    .ant-layout-sider-trigger {
        //border-right: 1px solid #dee2e6;
    }

    .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
    }
` as unknown as typeof Sider & { themeToken: IAntTheme };

const StyledHeader: typeof Header = styled(Header)`
    height: 40px !important;
    line-height: 40px !important;
    //background-color: ${(props) => hexToRgba(props.theme.colorBgElevated, 0.5)} !important;
    background-color: ${({ theme }: { theme: IAntTheme }) => theme.colorFillQuaternary} !important;
    border-bottom: 1px solid #dee2e6;
`;

const LogoContainer = styled.div`
    // display: flex;
    // justify-content: start;
    // align-items: center;
    margin: ${({ theme }: { theme: IAntTheme }) => theme.padding}px !important;
    border-right: 1px solid #d9d9d9;
`;

const SiderUserInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: auto;
    background-color: ${({ theme, collapsed }: { theme: IAntTheme; collapsed: boolean }) => (collapsed ? 'none' : theme.colorFillQuaternary)};
    padding: ${({ theme }: { theme: IAntTheme }) => theme.paddingSM}px ${({ theme }: { theme: IAntTheme }) => theme.paddingLG}px;
    margin-left: ${({ theme }: { theme: IAntTheme }) => theme.marginSM}px;
    margin-right: ${({ theme }: { theme: IAntTheme }) => theme.marginSM}px;
    border: ${({ theme, collapsed }: { theme: IAntTheme; collapsed: boolean }) => (collapsed ? 'none' : `1px solid  ${theme.colorBorder}`)};
    border-radius: ${({ theme }: { theme: IAntTheme }) => theme.borderRadiusLG}px;
`;

export const AuthLayout = ({ children }: IAdminLayoutProps) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getUserProfile());
    }, []);
    const userType = useSelector(selectUserType);

    const userRoles = useSelector(selectUserStaffRoles);

    const userName = useSelector(selectUserName);

    const userImage = useSelector(selectUserProfileImage);

    const linkedCompanies = useSelector(selectLinkedCompanies);

    const userDesignation = useSelector(selectUserDesignation);

    const currentConfigTheme = useSelector(selectCurrentTheme);

    const { isOpen: isNotificationModalOpen, handleOpen: handleNotificationModalOpen, handleClose: handleNotificationModalClose } = useModalState();
    const { isOpen: isStaffResetPasswordModalOpen, handleOpen: handleStaffResetPasswordModalOpen, handleClose: handleStaffResetPasswordModalClose } = useModalState();
    const breakpoint = useResponsive();
    const { xs, sm, md, lg, xl, xxl } = breakpoint;
    const isTablet = xs && sm && md && !lg && !xl && !xxl;
    const isPhone = xs && !md && !lg && !xl && !xxl;
    const isCollapsedView = isPhone || isTablet;
    const pathname = usePathname();

    const nestedLayoutRoutes = ['/flow-editor'];

    const isUsingNestedLayout = useMemo(() => {
        return nestedLayoutRoutes?.some((name) => pathname?.includes(name));
    }, [pathname]);

    const handleThemeChange = ({ value }: { value: string }) => {
        console.log('-> value', value);

        dispatch(
            themeChanged({
                theme: value,
            })
        );
    };

    const companyOptions = linkedCompanies.map((obj: { _id: string; name: string }) => ({
        label: obj.name,
        key: obj.name,
        // icon: <CgProfile />,
        onClick: () => router.push(`${appUrls.BUSINESS_PROFILE}/${obj._id}/feed`),
    }));
    // const ability = useGetUserAbility();

    const handleLogoutUser = () => {
        dispatch(logoutUser());
        router.push(appUrls.LOGIN);
    };
    const toggleSidebar = () => setCollapsed((prev) => !prev);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { token: themeToken } = theme.useToken();

    const profileMenu: MenuProps['items'] = [
        // {
        //     label: 'Profile',
        //     key: 'profile',
        //     type: 'group',
        //     children: [
        //         {
        //             label: '😎 Profile',
        //             key: 'individual-profile',
        //             // icon: <CgProfile style={{ fontSize: 15 }} />,
        //             onClick: () => router.push(appUrls.PROFILE),
        //         },
        //         {
        //             label: '⚙️ Settings',
        //             key: 'setting',
        //             // icon: <AiOutlineSetting style={{ fontSize: 15 }} />,
        //             onClick: () => router.push(appUrls.SETTING.PROFILE),
        //         },
        //         {
        //             label: '🔒 Reset Password',
        //             key: 'reset',
        //             // icon: <MdLockReset style={{ fontSize: 15 }} />,
        //             onClick: () => handleStaffResetPasswordModalOpen(),
        //         },
        //     ],
        // },
        // {
        //     label: 'Settings',
        //     key: 'setting',
        //     icon: <AiOutlineSetting style={{ fontSize: 15 }} />,
        //     onClick: () => router.push(appUrls.SETTING.PROFILE),
        // },
        // {
        //     label: 'Reset Password',
        //     key: 'reset',
        //     icon: <MdLockReset style={{ fontSize: 15 }} />,
        //     onClick: () => handleStaffResetPasswordModalOpen(),
        // },
        // {
        //     key: 'companies',
        //     label: 'Companies',
        //     type: 'group',
        //     children: [...companyOptions],
        // },
        {
            label: '😎 My Profile',
            key: 'individual-profile',
            // icon: <CgProfile style={{ fontSize: 15 }} />,
            onClick: () => router.push(appUrls.PROFILE),
        },
        // {
        //     label: '⚙️ Settings',
        //     key: 'setting',
        //     // icon: <AiOutlineSetting style={{ fontSize: 15 }} />,
        //     onClick: () => router.push(appUrls.SETTING.PROFILE),
        // },
        // {
        //     label: '🔒 Reset Password',
        //     key: 'reset',
        //     // icon: <MdLockReset style={{ fontSize: 15 }} />,
        //     onClick: () => handleStaffResetPasswordModalOpen(),
        // },
        {
            key: 'my-bookings',
            label: '📅 My Bookings',
            onClick: () => router.push(appUrls.MY_BOOKINGS),
        },
        {
            label: '🏃‍♂️ Logout',
            key: 'logout',
            // icon: <BsPower style={{ fontSize: 15 }} />,
            onClick: handleLogoutUser,
        },
    ];

    const profileMobileMenu: MenuProps['items'] = [
        {
            label: 'Operations',
            key: 'operations',
            type: 'group',
            children: [
                {
                    label: currentConfigTheme === 'blue' ? 'Light Mode' : 'Dark Mode',
                    key: 'theme',
                    icon:
                        currentConfigTheme === 'blue' ? (
                            <IoMoonOutline title="Dark Mode" style={{ fontSize: 15 }} onClick={() => handleThemeChange({ value: 'dark' })} />
                        ) : (
                            <IoSunnyOutline title="Light Mode" style={{ fontSize: 15 }} onClick={() => handleThemeChange({ value: 'blue' })} />
                        ),
                    onClick: currentConfigTheme === 'blue' ? () => handleThemeChange({ value: 'dark' }) : () => handleThemeChange({ value: 'blue' }),
                },
                {
                    label: 'Notifications',
                    key: 'notification',
                    icon: isNotificationModalOpen ? (
                        <IoIosNotifications title="Notifications" style={{ fontSize: 15, cursor: 'pointer', color: themeToken.colorPrimary }} />
                    ) : (
                        <IoIosNotificationsOutline title="Notifications" style={{ fontSize: 15, cursor: 'pointer' }} />
                    ),
                    onClick: isNotificationModalOpen ? () => handleNotificationModalClose() : () => handleNotificationModalOpen(),
                },
            ],
        },
        {
            label: 'Profile',
            key: 'profile',
            type: 'group',
            children: [
                {
                    label: 'Profile',
                    key: 'individual-profile',
                    icon: <CgProfile style={{ fontSize: 15 }} />,
                    onClick: () => router.push(appUrls.PROFILE),
                },
                {
                    label: 'Settings',
                    key: 'setting',
                    icon: <AiOutlineSetting style={{ fontSize: 15 }} />,
                    onClick: () => router.push(appUrls.SETTING.PROFILE),
                },
                {
                    label: 'Reset Password',
                    key: 'reset',
                    icon: <MdLockReset style={{ fontSize: 15 }} />,
                    onClick: () => handleStaffResetPasswordModalOpen(),
                },
            ],
        },

        {
            key: 'companies',
            label: 'Companies',
            type: 'group',
            children: [...companyOptions],
        },

        {
            label: 'Logout',
            key: 'logout',
            icon: <BsPower style={{ fontSize: 15 }} />,
            onClick: handleLogoutUser,
        },
    ];

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

    // if (userType === 'STUDENT') {
    //     handleLogoutUser();
    //     return <></>;
    // }

    if (isStaffResetPasswordModalOpen) {
        return <ResetPasswordModal isOpen={isStaffResetPasswordModalOpen} handleClose={handleStaffResetPasswordModalClose} />;
    }

    return (
        // <AbilityContext.Provider value={ability}>
        <Layout className="h-full">
            <Header
                style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    background: themeToken.colorBgBase,
                    borderBottom: `1px solid ${themeToken.colorBorder}`,
                }}
            >
                <Row className="container">
                    <Col span={20}>
                        <Row justify={'start'} align={'middle'}>
                            {/* <Col span={2}> */}
                            <div
                                style={{
                                    paddingRight: '10px',
                                    borderRight: `1px solid ${themeToken.colorBorder}`,
                                }}
                            >
                                {!isCollapsedView ? (
                                    <img
                                        src={currentConfigTheme === 'blue' ? LOGO_FULL : LOGO_WHITE}
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
                            {/* </Col> */}
                            <Col xs={1} lg={15}>
                                <Menu
                                    style={{
                                        background: themeToken.colorBgBase,
                                        borderBottom: `1px solid ${themeToken.colorBorder}`,
                                    }}
                                    mode="horizontal"
                                    selectedKeys={activeLinks}
                                    items={sidebarItems}
                                />
                            </Col>
                        </Row>
                    </Col>
                    {/* <Row justify={'end'}> */}
                    <Col span={4} className="">
                        <div className="flex w-full justify-end  border-1 ">
                            <Space align="center" size={[6, 10]} className="border-l-cyan-100">
                                {/* {!isCollapsedView && (
                                    <div style={{ paddingRight: `${themeToken.paddingSM}px`, borderRight: `1px solid ${themeToken.colorBorder}` }}>
                                        <AButton type="link" title="For Business" onClick={() => router.push(appUrls.FOR_BUSINESS)}>
                                            For Business
                                        </AButton>
                                    </div>
                                )} */}
                                <div className=''>
                                    <Dropdown menu={{ items: isCollapsedView ? profileMobileMenu : profileMenu, style: { width: 200 } }} trigger={['click']}>
                                        <Space className="cursor-pointer" align="center">
                                            {userImage !== '' ? <Avatar size="default" src={userImage} /> : '😎'}
                                            {!isCollapsedView && <Typography.Text className="truncate ">{userName ?? 'User'}</Typography.Text>}
                                            <FaChevronDown className="text-gray-500" />
                                        </Space>
                                    </Dropdown>
                                </div>
                                <>
                                    {!isCollapsedView && (
                                        <>
                                            <>
                                                {/* {currentConfigTheme === 'blue' ? (
                                                    <AButton type="text" shape="circle" icon={<MoonOutlined />} style={{ cursor: 'pointer' }} onClick={() => handleThemeChange({ value: 'dark' })} />
                                                ) : (
                                                    // <AButton type='text' shape='circle'>

                                                    //     <MoonOutlined title="Dark Mode" style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => handleThemeChange({ value: 'dark' })} />
                                                    // </AButton>
                                                    <AButton type="text" shape="circle" icon={<SunOutlined />} style={{ cursor: 'pointer' }} onClick={() => handleThemeChange({ value: 'blue' })} />

                                                    // <AButton type='text' shape='circle'>

                                                    //     <SunOutlined title="Light Mode" style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => handleThemeChange({ value: 'blue' })} />
                                                    // </AButton>
                                                )} */}
                                            </>
                                            <>
                                                {/* {isNotificationModalOpen ? (
                                                    <AButton type="text" shape="circle" icon={<IoIosNotifications />} style={{ cursor: 'pointer', color: themeToken.colorPrimary }} onClick={handleNotificationModalClose} />
                                                ) : (
                                                    // <AButton type='text' shape='circle'>

                                                    //     <IoIosNotifications title="Notifications" style={{ fontSize: 20, cursor: 'pointer', color: themeToken.colorPrimary }} onClick={handleNotificationModalClose} />
                                                    // </AButton>
                                                    <AButton type="text" shape="circle" icon={<BellOutlined />} style={{ cursor: 'pointer' }} onClick={handleNotificationModalOpen} />

                                                    // <AButton type='text' shape='circle' >

                                                    //     <BellOutlined title="Notifications" style={{ fontSize: 20, cursor: 'pointer' }} onClick={handleNotificationModalOpen} />
                                                    // </AButton>
                                                )} */}
                                            </>
                                        </>
                                    )}
                                </>
                            </Space>
                        </div>
                    </Col>
                    {/* </Row> */}
                </Row>
            </Header>
            <PageContainer style={{ height: 'calc(100vh - 64px)' }}>
                {isUsingNestedLayout ? (
                    <>{children}</>
                ) : (
                    <Content
                        className={'crm-layout-content container '}
                        style={{
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                )}
            </PageContainer>
        </Layout>
    );
};
