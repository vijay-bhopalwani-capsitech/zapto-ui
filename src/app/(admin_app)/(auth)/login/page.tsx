'use client';

import React from 'react';
// import LoginForm from '@/components/auth/LoginForm';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserType } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { appUrls } from '@/config/navigationConfig';

import { Outfit } from '@next/font/google';
import { Col, Row, theme, Typography } from 'antd';
import styled from 'styled-components';
import { BG_IMG, LOGIN_BANNER, LOGO_FULL, LOGO_WHITE } from '@/assets/images/imgAssets';
import LoginForm from '@/components/auth/loginForm';
import { selectCurrentTheme } from '@/redux/slices/appConfigSlice';
import { ACard } from 'ant-ui';

const font = Outfit({
    // weight: "400",
    // weight: ["300", "400", "500", "700"],
    subsets: ['latin'],
});

const StyledLogoBg = styled.img`
    width: 407px;
    //height: 100px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
`;

export const StyledLogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    // margin-top: 50px;
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
`;

function LoginPage() {
    const router = useRouter();
    const { token: themeToken } = theme.useToken();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userType = useSelector(selectUserType);
    const currentTheme = useSelector(selectCurrentTheme);
    if (isAuthenticated) {
        router.push(appUrls.HOME);

        return <></>;
    }

    return (
        <>
            {/* <Row justify={'center'} align={'middle'} style={{ backgroundImage: `url(${BG_IMG})`, height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="">
                <ACard style={{ maxHeight: '700px', maxWidth: '400px' }}>
                    <Row justify={'center'}>
                        <img src={currentTheme === 'blue' ? LOGO_FULL : LOGO_WHITE} alt="logo" style={{ height: '150px' }} className=" mb-3" />
                    </Row>
                    <h2 className="lg:text-3xl" style={{ color: currentTheme === 'blue' ? themeToken.colorPrimary : themeToken.colorText, fontWeight: 'normal' }}>
                        Welcome to our boilerplate
                    </h2>
                    <Row justify={'center'} className=" md:mt-10  sm:mt-2">
                        <Col sm={24} md={20} lg={24}> */}
                            <LoginForm />
                        {/* </Col>
                    </Row>
                </ACard>
            </Row> */}
        </>
    );
}

export default LoginPage;
