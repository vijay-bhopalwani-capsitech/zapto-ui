'use client';
import React, { useState } from 'react';
import { Card, Button, Drawer, Row, Col, Space, Typography, Avatar, Divider, theme } from 'antd';
import { EditOutlined, UserOutlined, RightOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import * as z from 'zod';
import { ADatePickerField, AFileUploadButtonField, ATelField, ATextField } from 'ant-ui';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '@/redux/slices/authSlice';
import { convertNameObjectToString } from 'ui-helpers';

const { Title, Text } = Typography;

// Mock components for custom form fields (you can replace these with your actual components)
// const ATextField = ({ label, name, placeholder, disabled, type = 'text', ...props }) => (
//     <div style={{ marginBottom: 16 }}>
//         <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>{label}</label>
//         <input
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             disabled={disabled}
//             style={{
//                 width: '100%',
//                 padding: '8px 12px',
//                 border: '1px solid #d9d9d9',
//                 borderRadius: '6px',
//                 fontSize: '14px',
//                 backgroundColor: disabled ? '#f5f5f5' : 'white',
//             }}
//             {...props}
//         />
//     </div>
// );

// const ADatePickerField = ({ label, name, disabled, ...props }) => (
//     <div style={{ marginBottom: 16 }}>
//         <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>{label}</label>
//         <input
//             name={name}
//             type="date"
//             disabled={disabled}
//             style={{
//                 width: '100%',
//                 padding: '8px 12px',
//                 border: '1px solid #d9d9d9',
//                 borderRadius: '6px',
//                 fontSize: '14px',
//                 backgroundColor: disabled ? '#f5f5f5' : 'white',
//             }}
//             {...props}
//         />
//     </div>
// );

// const ATelField = ({ label, name, placeholder, disabled, ...props }) => (
//     <div style={{ marginBottom: 16 }}>
//         <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>{label}</label>
//         <input
//             name={name}
//             type="tel"
//             placeholder={placeholder}
//             disabled={disabled}
//             style={{
//                 width: '100%',
//                 padding: '8px 12px',
//                 border: '1px solid #d9d9d9',
//                 borderRadius: '6px',
//                 fontSize: '14px',
//                 backgroundColor: disabled ? '#f5f5f5' : 'white',
//             }}
//             {...props}
//         />
//     </div>
// );

// const AFileUploadButtonField = ({ children, ...props }) => (
//     <Button size="small" type="primary" {...props}>
//         {children}
//     </Button>
// );

// Backpack SVG Component
const BackpackIcon = ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="backpackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="100%" stopColor="#ff5252" />
            </linearGradient>
        </defs>
        {/* Main backpack body */}
        <path d="M50 60 L150 60 L150 160 Q150 170 140 170 L60 170 Q50 170 50 160 Z" fill="url(#backpackGradient)" />
        {/* Top flap */}
        <path d="M60 50 L140 50 Q145 50 145 55 L145 70 Q145 75 140 75 L60 75 Q55 75 55 70 L55 55 Q55 50 60 50 Z" fill="#ff5252" />
        {/* Straps */}
        <rect x="45" y="40" width="8" height="80" rx="4" fill="#444" />
        <rect x="147" y="40" width="8" height="80" rx="4" fill="#444" />
        {/* Front pocket */}
        <rect x="70" y="90" width="60" height="40" rx="8" fill="#ff3333" />
        {/* Buckle */}
        <rect x="85" y="52" width="30" height="8" rx="4" fill="#ffd700" />
        {/* Side details */}
        <circle cx="40" cy="100" r="6" fill="#ff3333" />
        <circle cx="160" cy="100" r="6" fill="#ff3333" />
    </svg>
);

const UserProfilePage = () => {
    const userProfile = useSelector(selectUserProfile);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const { token } = theme.useToken();

    const initialValues = {
        name: { first: '', middle: '', last: '' },
        username: '',
        email: '',
        designation: '',
        phone: '+91XXXXXXXXXX',
        gender: 'Other',
        dob: '',
        address: {
            building: '',
            street: '',
            city: '',
            county: '',
            postCode: '',
            country: '',
        },
        profileImage: null,
        shortName: '',
        birthday: '',
        homeCity: '',
        aadhaar: '',
        pan: '',
        passport: '',
        cultures: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log('Form submitted:', values);
        setSubmitting(false);
        setDrawerOpen(false);
    };

    const ProfileInfoItem = ({ emoji, label, value, showAdd = false }) => (
        <Row align="middle" justify="space-between" style={{ marginBottom: 12 }}>
            <Col>
                <Space>
                    <span style={{ fontSize: '16px' }}>{emoji}</span>
                    <Text>{label}:</Text>
                    {value && <Text strong>{value}</Text>}
                </Space>
            </Col>
            {/* {showAdd && (
                <Col>
                    <Button type="default" size="small">
                        Add
                    </Button>
                </Col>
            )} */}
        </Row>
    );

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <Row gutter={[32, 32]}>
                {/* Left Side - Backpack Visual */}
                <Col xs={24} md={8}>
                    <Card style={{ textAlign: 'center', height: '100%' }}>
                        <div style={{ position: 'relative', marginBottom: 16 }}>
                            <BackpackIcon size={200} />
                            {/* Avatar overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '35%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                }}
                            >
                                <Avatar size={50} icon={<UserOutlined />} />
                            </div>
                        </div>
                        <Title level={4} style={{ marginBottom: 8, color: token.colorTextSecondary }}>
                            Default
                        </Title>
                        <Text type="secondary">Citizen of Zo World</Text>
                    </Card>
                </Col>

                {/* Right Side - About You */}
                <Col xs={24} md={16}>
                    <Card
                        title={
                            <Space>
                                <Title level={3} style={{ margin: 0 }}>
                                    About You
                                </Title>
                                {/* <Button type="text" icon={<EditOutlined />} onClick={() => setDrawerOpen(true)} style={{ marginLeft: 'auto' }}>
                                    Edit
                                </Button> */}
                            </Space>
                        }
                        extra={
                            <Button type="text" icon={<EditOutlined />} onClick={() => setDrawerOpen(true)}>
                                Edit
                            </Button>
                        }
                    >
                        <Row gutter={[32, 24]}>
                            {/* Personal Info */}
                            <Col xs={24} lg={12}>
                                <div>
                                    <Title level={4} style={{ marginBottom: 16 }}>
                                        👤 Personal Info
                                    </Title>
                                    <ProfileInfoItem emoji="🖊" label="Full Name" showAdd value={convertNameObjectToString(userProfile?.name)} />
                                    <ProfileInfoItem emoji="🧸" label="In short, call me" showAdd value={userProfile?.phone || '-'} />
                                    <ProfileInfoItem emoji="🎈" label="Birthday" showAdd value={userProfile?.dob} />
                                    <ProfileInfoItem emoji="🧑‍🤝‍🧑" label="Gender" value={userProfile?.gender || '-'} showAdd />
                                    <ProfileInfoItem emoji="📱" label="Phone number" value={userProfile?.phone || '-'} />
                                    <ProfileInfoItem emoji="📧" label="Email" showAdd value={userProfile?.email || '-'} />
                                    <ProfileInfoItem emoji="🏠" label="Home city" showAdd value={userProfile?.address?.city || '-'} />
                                </div>
                            </Col>

                            {/* Government IDs */}
                            <Col xs={24} lg={12}>
                                <div>
                                    <Title level={4} style={{ marginBottom: 16 }}>
                                        🪪 Government IDs
                                    </Title>
                                    <ProfileInfoItem emoji="🪪" label="Aadhaar" showAdd value={userProfile?.governmentIds?.aadhaar || '-'} />
                                    <ProfileInfoItem emoji="🆔" label="PAN" showAdd value={userProfile?.governmentIds?.pan || '-'} />
                                    <ProfileInfoItem emoji="🛂" label="Passport" showAdd value={userProfile?.governmentIds?.passport || '-'} />

                                    <Divider />

                                    <Title level={4} style={{ marginBottom: 16 }}>
                                        🌍 Cultures
                                    </Title>
                                    <ProfileInfoItem emoji="🎭" label="Cultures" showAdd value={"Hindu"}/>
                                </div>
                            </Col>
                        </Row>

                        <Divider />

                        {/* Zo Credits */}
                        <div>
                            <Title level={4} style={{ marginBottom: 16 }}>
                                💰 Zapp Credits
                            </Title>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <Text>
                                        Available Credits: <Text strong>₹0</Text>
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 12 }}>
                                <Col>
                                    <Button type="link" style={{ padding: 0 }}>
                                        <Space>
                                            <span>📒</span>
                                            <Text>View Transactions</Text>
                                            <RightOutlined />
                                        </Space>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Edit Drawer */}
            <Drawer
                title="Edit Profile"
                placement="right"
                width={600}
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
                            <Button type="primary" form="profileForm" htmlType="submit">
                                Save
                            </Button>
                        </Space>
                    </div>
                }
            >
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, setFieldValue, isSubmitting }) => (
                        <div id="profileForm">
                            <div style={{ marginBottom: 24 }}>
                                <Title level={4}>Profile Picture</Title>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <Avatar size={80} icon={<UserOutlined />} />
                                    <Space>
                                        <AFileUploadButtonField name="profileImage">Upload</AFileUploadButtonField>
                                        <Button size="small" type="text">
                                            Remove
                                        </Button>
                                    </Space>
                                </div>
                            </div>

                            <Divider />

                            <Title level={4}>Personal Information</Title>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <ATextField label="First Name" name="name.first" placeholder="First Name" />
                                </Col>
                                <Col span={8}>
                                    <ATextField label="Middle Name" name="name.middle" placeholder="Middle Name" />
                                </Col>
                                <Col span={8}>
                                    <ATextField label="Last Name" name="name.last" placeholder="Last Name" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Username" name="username" placeholder="Username" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Email" name="email" placeholder="Email" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Short Name" name="shortName" placeholder="What should we call you?" />
                                </Col>
                                <Col span={12}>
                                    <ATelField label="Phone" name="phone" placeholder="Phone Number" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Gender" name="gender" placeholder="Gender" />
                                </Col>
                                <Col span={12}>
                                    <ADatePickerField label="Date of Birth" name="dob" />
                                </Col>
                            </Row>

                            <Divider />

                            <Title level={4}>Address</Title>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <ATextField label="Building" name="address.building" placeholder="Building" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Street" name="address.street" placeholder="Street" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="City" name="address.city" placeholder="City" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="County/State" name="address.county" placeholder="County/State" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Post Code" name="address.postCode" placeholder="Post Code" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Country" name="address.country" placeholder="Country" />
                                </Col>
                            </Row>

                            <Divider />

                            <Title level={4}>Government IDs</Title>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <ATextField label="Aadhaar" name="aadhaar" placeholder="Aadhaar Number" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="PAN" name="pan" placeholder="PAN Number" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Passport" name="passport" placeholder="Passport Number" />
                                </Col>
                                <Col span={12}>
                                    <ATextField label="Cultures" name="cultures" placeholder="Cultural background" />
                                </Col>
                            </Row>
                        </div>
                    )}
                </Formik>
            </Drawer>
        </div>
    );
};

export default UserProfilePage;
