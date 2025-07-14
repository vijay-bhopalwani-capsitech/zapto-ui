import React, { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Typography, Select, ConfigProvider, Dropdown, Button } from 'antd';
import { MdDashboard, MdHotel, MdCalendarToday, MdSettings, MdNotificationsNone, MdBookOnline, MdAnnouncement, MdKeyboardArrowDown, MdLocationOn } from 'react-icons/md';
import { FaUsers, FaRupeeSign, FaStar, FaBed, FaChevronDown, FaGlobe, FaUser } from 'react-icons/fa';
import { BiBarChart, BiBuilding, BiGroup } from 'react-icons/bi';
import { HiOutlineUserGroup, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import Image from 'next/image';
import { LOGO_HALF } from '@/assets/images/imgAssets';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;
const { SubMenu } = Menu;

const HostelChainNavigation = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('global-dashboard');
    const [selectedProperty, setSelectedProperty] = useState('all');

    // Mock property data
    const properties = [
        { id: 'all', name: 'All Properties', location: 'Global View', count: 8 },
        { id: 'jaipur', name: 'Zappotel Jaipur', location: 'Jaipur, Rajasthan', occupancy: 85 },
        { id: 'rishikesh', name: 'Zappotel Rishikesh', location: 'Rishikesh, Uttarakhand', occupancy: 92 },
        { id: 'goa', name: "Backpacker's Paradise Goa", location: 'Arambol, Goa', occupancy: 78 },
        { id: 'manali', name: 'Mountain Stay Manali', location: 'Old Manali, HP', occupancy: 67 },
        { id: 'mcleodganj', name: 'Zostel McLeod Ganj', location: 'McLeod Ganj, HP', occupancy: 74 },
    ];

    const globalMenuItems = [
        {
            key: 'global-dashboard',
            icon: <MdDashboard size={18} />,
            label: 'Dashboard',
        },
        {
            key: 'bookings',
            icon: <MdBookOnline size={18} />,
            label: 'Bookings',
        },
        {
            key: 'revenue',
            icon: <FaRupeeSign size={16} />,
            label: 'Revenue Reports',
        },
        {
            key: 'staff',
            icon: <HiOutlineUserGroup size={18} />,
            label: 'Staff & Teams',
        },
        {
            key: 'reviews',
            icon: <FaStar size={16} />,
            label: 'Reviews & Feedback',
        },
        {
            key: 'properties',
            icon: <MdHotel size={18} />,
            label: 'Stays / Properties',
        },
        {
            key: 'calendar',
            icon: <MdCalendarToday size={18} />,
            label: 'Calendar View',
        },
        {
            key: 'announcements',
            icon: <MdAnnouncement size={18} />,
            label: 'Announcements',
        },
        {
            key: 'settings',
            icon: <MdSettings size={18} />,
            label: 'Settings',
        },
    ];

    const propertyMenuItems = [
        {
            key: 'property-dashboard',
            icon: <BiBarChart size={18} />,
            label: 'Dashboard',
        },
        {
            key: 'property-bookings',
            icon: <MdBookOnline size={18} />,
            label: 'Bookings',
        },
        {
            key: 'property-staff',
            icon: <FaUsers size={16} />,
            label: 'Staff',
        },
        {
            key: 'property-rooms',
            icon: <FaBed size={16} />,
            label: 'Rooms/Beds',
        },
        {
            key: 'property-reviews',
            icon: <HiOutlineChatBubbleLeftRight size={18} />,
            label: 'Reviews',
        },
    ];

    const theme = {
        token: {
            colorPrimary: '#D29022',
            colorBgBase: '#FAFAFA',
            borderRadius: 8,
            fontSize: 14,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
            Layout: {
                siderBg: '#ffffff',
                headerBg: '#ffffff',
                bodyBg: '#FAFAFA',
            },
            Menu: {
                itemBg: 'transparent',
                itemSelectedBg: '#FFF7E6',
                itemSelectedColor: '#D29022',
                itemHoverBg: '#FFF9F0',
                itemHoverColor: '#D29022',
                iconSize: 18,
                subMenuItemBg: '#FAFAFA',
                groupTitleColor: '#610E07',
            },
            Select: {
                optionSelectedBg: '#FFF7E6',
                optionSelectedColor: '#D29022',
            },
        },
    };

    const currentProperty = properties.find((p) => p.id === selectedProperty);

    const propertyDropdownItems = properties.map((property) => ({
        key: property.id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 4px' }}>
                <div
                    style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: property.id === 'all' ? '#D29022' : property.occupancy > 80 ? '#52c41a' : property.occupancy > 60 ? '#faad14' : '#ff4d4f',
                    }}
                ></div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{property.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {property.location}
                        {property.occupancy && <span style={{ marginLeft: '8px', color: '#D29022' }}>{property.occupancy}% occupied</span>}
                    </div>
                </div>
            </div>
        ),
        onClick: () => setSelectedProperty(property.id),
    }));

    const userMenuItems = [
        {
            key: 'profile',
            label: 'Profile Settings',
        },
        {
            key: 'account',
            label: 'Account Management',
        },
        {
            key: 'logout',
            label: 'Logout',
            onClick: () => {
                // Handle logout logic here
                dispatch(logoutUser());
                router.push('/login');
            },
            danger: true,
        },
    ];

    return (
        <ConfigProvider theme={theme}>
            <Layout style={{ minHeight: '100vh', background: '#FAFAFA' }}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    width={280}
                    style={{
                        background: '#ffffff',
                        boxShadow: '2px 0 12px rgba(0, 0, 0, 0.08)',
                        borderRight: '1px solid #f0f0f0',
                        position: 'fixed',
                        height: '100vh',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 200,
                    }}
                    breakpoint="lg"
                    collapsedWidth="80"
                >
                    {/* Logo Section */}
                    <div
                        style={{
                            padding: '24px 20px',
                            borderBottom: '1px solid #f0f0f0',
                            textAlign: collapsed ? 'center' : 'left',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                justifyContent: collapsed ? 'center' : 'flex-start',
                            }}
                        >
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'linear-gradient(135deg, #D29022 0%, #F4A261 100%)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(210, 144, 34, 0.25)',
                                }}
                            >
                                <MdHotel size={24} color="#ffffff" />
                                {/* <Image src={LOGO_HALF} alt="Hotel Logo" width={20} height={20} /> */}
                            </div>
                            {!collapsed && (
                                <div>
                                    <Title
                                        level={4}
                                        style={{
                                            margin: 0,
                                            color: '#610E07',
                                            fontSize: '18px',
                                            fontWeight: '700',
                                        }}
                                    >
                                        Zappotel
                                    </Title>
                                    <Text
                                        style={{
                                            fontSize: '12px',
                                            color: '#8b5a2b',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Chain Management
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Property Selector */}
                    {!collapsed && (
                        <div
                            style={{
                                padding: '16px 20px',
                                borderBottom: '1px solid #f0f0f0',
                                background: '#fafafa',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '12px',
                                    color: '#8b5a2b',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    display: 'block',
                                    marginBottom: '8px',
                                }}
                            >
                                Active Property
                            </Text>
                            <Dropdown menu={{ items: propertyDropdownItems }} trigger={['click']} placement="bottomLeft">
                                <Button
                                    style={{
                                        width: '100%',
                                        height: '44px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '0 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        background: '#ffffff',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: selectedProperty === 'all' ? '#D29022' : '#52c41a',
                                            }}
                                        ></div>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937' }}>{currentProperty?.name}</div>
                                            <div style={{ fontSize: '11px', color: '#6b7280' }}>{currentProperty?.location}</div>
                                        </div>
                                    </div>
                                    <FaChevronDown size={12} color="#6b7280" />
                                </Button>
                            </Dropdown>
                        </div>
                    )}

                    {/* Navigation Menu */}
                    <div style={{ height: 'calc(100vh - 200px)', overflowY: 'auto', paddingBottom: '20px' }}>
                        <Menu
                            theme="light"
                            mode="inline"
                            selectedKeys={[selectedKey]}
                            onClick={({ key }) => setSelectedKey(key)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                padding: '16px 0',
                            }}
                        >
                            {/* Global Tools */}
                            <Menu.ItemGroup
                                key="global"
                                title={!collapsed ? 'Global Tools' : ''}
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: '#610E07',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '8px',
                                }}
                            >
                                {globalMenuItems.map((item) => (
                                    <Menu.Item key={item.key} icon={item.icon} onClick={() => router.push(item.key)}>
                                        {item.label}
                                    </Menu.Item>
                                ))}
                            </Menu.ItemGroup>

                            {/* Property Specific Tools */}
                            {selectedProperty !== 'all' && (
                                <Menu.ItemGroup
                                    key="property"
                                    title={!collapsed ? 'Property Tools' : ''}
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#610E07',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        marginTop: '24px',
                                        marginBottom: '8px',
                                    }}
                                >
                                    {propertyMenuItems.map((item) => (
                                        <Menu.Item key={item.key} icon={item.icon} onClick={() => router.push(item.key)}>
                                            {item.label}
                                        </Menu.Item>
                                    ))}
                                </Menu.ItemGroup>
                            )}
                        </Menu>
                    </div>
                </Sider>

                <Layout
                    style={{
                        marginLeft: collapsed ? 80 : 280,
                        transition: 'all 0.3s ease',
                        background: '#FAFAFA',
                    }}
                >
                    <Header
                        style={{
                            background: '#ffffff',
                            padding: '0 32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #f0f0f0',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 100,
                            height: '72px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#6b7280',
                                    fontSize: '18px',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#f5f5f5';
                                    e.target.style.color = '#D29022';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.color = '#6b7280';
                                }}
                            >
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        gap: '3px',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '16px',
                                            height: '2px',
                                            background: 'currentColor',
                                            borderRadius: '1px',
                                            transition: 'transform 0.2s ease',
                                            transform: collapsed ? 'rotate(45deg) translate(2px, 2px)' : 'none',
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            width: '16px',
                                            height: '2px',
                                            background: 'currentColor',
                                            borderRadius: '1px',
                                            opacity: collapsed ? 0 : 1,
                                            transition: 'opacity 0.2s ease',
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            width: '16px',
                                            height: '2px',
                                            background: 'currentColor',
                                            borderRadius: '1px',
                                            transition: 'transform 0.2s ease',
                                            transform: collapsed ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
                                        }}
                                    ></div>
                                </div>
                            </button>

                            <div>
                                <Text
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: '#1f2937',
                                        letterSpacing: '-0.025em',
                                    }}
                                >
                                    Welcome
                                </Text>
                                {/* <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                  {currentProperty?.name} • {new Date().toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div> */}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {/* <Badge count={12} size="small" style={{ backgroundColor: '#D29022' }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280',
                  fontSize: '20px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#FFF7E6';
                  e.target.style.color = '#D29022';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#6b7280';
                }}>
                  <MdNotificationsNone />
                </button>
              </Badge> */}

                            <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <Avatar
                                        size={42}
                                        style={{
                                            backgroundColor: '#D29022',
                                            border: '2px solid #ffffff',
                                            boxShadow: '0 2px 8px rgba(210, 144, 34, 0.2)',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <FaUser size={16} color="#ffffff" />
                                        {/* {ownerName.split(' ').map(n => n[0]).join('')} */}
                                    </Avatar>
                                    <MdKeyboardArrowDown size={16} color="#6b7280" />
                                </div>
                            </Dropdown>
                        </div>
                    </Header>

                    <Content
                        style={{
                            padding: '18px',
                            background: '#FAFAFA',
                            minHeight: 'calc(100vh - 72px)',
                            overflow: 'auto',
                        }}
                    >
                        <div
                            style={{
                                background: '#ffffff',
                                borderRadius: '12px',
                                padding: '32px',
                                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                                border: '1px solid #f0f0f0',
                                // minHeight: '500px',
                                height:"calc(100vh - 110px)",
                                overflowY: 'auto',
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default HostelChainNavigation;
