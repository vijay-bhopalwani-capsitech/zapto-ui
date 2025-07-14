'use client';
import React from 'react';
import { Col, Row, theme, Typography } from 'antd';
import SignUpForm from '@/components/auth/signUPForm';
import SignUpSteps from '@/components/auth/sign-Up/SignUpSteps';
import { BG_IMG, LOGIN_BANNER, LOGO_FULL, LOGO_WHITE } from '@/assets/images/imgAssets';
import { StyledLogoContainer } from '../login/page';
import { useRouter } from 'next/navigation';
import { appUrls } from '@/config/navigationConfig';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '@/redux/slices/appConfigSlice';
import { ACard } from 'ant-ui';

const SignUPPage = () => {
    const { token: themeToken } = theme.useToken();
    const currentTheme = useSelector(selectCurrentTheme);

    return (
        <div>
            {/* <Row justify={'center'} align={'middle'} style={{ backgroundImage: `url(${BG_IMG})`, height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className=" sm:justify-center lg:justify-center">
                <ACard style={{ maxHeight: '700px', maxWidth: '400px' }}>
                    <Row justify={'center'}>
                        <img src={currentTheme === 'blue' ? LOGO_FULL : LOGO_WHITE} alt="logo" style={{ height: '150px' }} className=" mb-3" />
                    </Row>
                    <h2 className="lg:text-3xl" style={{ color: currentTheme === 'blue' ? themeToken.colorPrimary : themeToken.colorText, fontWeight: 'normal' }}>
                        Welcome to our boilerplate
                    </h2>
                    <Row justify={'center'} className=" md:mt-10  sm:mt-2">
                        <Col sm={24} md={20} lg={24}> */}
                            <SignUpSteps />
                        {/* </Col>
                    </Row>
                </ACard>
            </Row> */}
        </div>
    );
};

export default SignUPPage;
