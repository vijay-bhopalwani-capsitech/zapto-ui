import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';
import { messages } from '@/lang';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Col, Row, Space, theme, Typography, Card } from 'antd';
import { AButton, APasswordField, ATextField, FormikForm } from 'ant-ui';
import styled from 'styled-components';
import { IAntTheme } from '@/theme/themeConfig';
import Link from 'next/link';
import { appUrls } from '@/config/navigationConfig';
import { validateZodSchemaFormik } from 'ui-helpers';
import { z } from 'zod';
import Image from 'next/image';
import { LOGO_FULL } from '@/assets/images/imgAssets';

const validateSchema = z.object({
    email: z.string().min(1, 'Please provide email'),
    password: z.string().min(4, 'Please provide password'),
});

const StyledLoginCard = styled(Card)`
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
    max-width: 400px;
    margin: 0 auto;
    background: ${({ theme }: { theme: IAntTheme }) => theme?.colorBgContainer};
`;

const StyledButton = styled(Button)`
    margin-top: 24px;
    background-color: #D29022 !important;
    border-color: #D29022 !important;
    height: 44px;
    font-weight: 600;
    font-size: 16px;
    
    &:hover {
        background-color: #B8801E !important;
        border-color: #B8801E !important;
    }
    
    &:focus {
        background-color: #B8801E !important;
        border-color: #B8801E !important;
    }
`;

const StyledTitle = styled(Typography.Title)`
    color: #610E07 !important;
    font-weight: 700 !important;
    margin-bottom: 8px !important;
    text-align: center;
`;

const StyledSubtext = styled(Typography.Text)`
    color: #6B7280;
    font-size: 14px;
    text-align: center;
    display: block;
    margin-bottom: 32px;
`;

const StyledFormSpace = styled(Space)`
    width: 100%;
    
    .ant-form-item {
        margin-bottom: 20px;
    }
`;

const StyledSignUpLink = styled(Link)`
    color: #D29022 !important;
    font-weight: 600 !important;
    text-decoration: none;
    
    &:hover {
        color: #B8801E !important;
        text-decoration: underline;
    }
`;

const LoginContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #FFF9F5 0%, #FFF5F0 100%);
`;

const BackpackIcon = styled.div`
    font-size: 28px;
    text-align: center;
    margin-bottom: 16px;
    color: #D29022;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { token: themeToken } = theme.useToken();

    const validateLogIn = async (values: any) => {
        const errors: any = await validateZodSchemaFormik({
            schema: validateSchema,
            values: values,
        });
        return errors;
    };

    return (
        <LoginContainer>
            <StyledLoginCard theme={themeToken}>
                <div style={{ padding: '32px' }}>
                    <FormikForm
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validate={validateLogIn}
                        onSubmit={async (values: { email: string; password: string }) => {
                            const { email, password } = values;
                            const result = await dispatch(loginUser({ email, password }));
                        }}
                    >
                        {(formikProps: { isSubmitting: boolean | { delay?: number } | undefined }) => (
                            <StyledFormSpace 
                                className="animate__animated animate__fadeIn" 
                                size={0} 
                                direction="vertical"
                            >
                                <BackpackIcon>
                                <Image 
                                    src={LOGO_FULL} 
                                    alt="Zappotel Logo" 
                                    width={250} 
                                    height={200}
                                    onClick={() => router.push("/")}
                                    className='cursor-pointer'
                                />

                                </BackpackIcon>
                                
                                {/* <StyledTitle level={3}>
                                    Welcome Back, Explorer 👋
                                </StyledTitle>
                                 */}
                                <StyledSubtext>
                                    Log in to continue your journey.
                                </StyledSubtext>
                                
                                <ATextField 
                                    type="email" 
                                    name="email" 
                                    label="Email address" 
                                    placeholder="Enter your email"
                                    // disabled={formikProps.isSubmitting}
                                />
                                
                                <APasswordField 
                                    name="password" 
                                    label="Password" 
                                    placeholder="Enter your password"
                                    // disabled={formikProps.isSubmitting}
                                />
                                
                                <StyledButton 
                                    type="primary" 
                                    block 
                                    htmlType="submit" 
                                    loading={formikProps.isSubmitting}
                                >
                                    Login to Continue
                                </StyledButton>
                                
                                <Row justify={'center'} style={{ marginTop: '24px' }}>
                                    <Typography.Text>
                                        Don't have a account yet?
                                    </Typography.Text>
                                    <StyledSignUpLink href={appUrls.SIGN_UP}>
                                        &nbsp;Sign up now
                                    </StyledSignUpLink>
                                </Row>
                            </StyledFormSpace>
                        )}
                    </FormikForm>
                </div>
            </StyledLoginCard>
        </LoginContainer>
    );
};

export default LoginForm;