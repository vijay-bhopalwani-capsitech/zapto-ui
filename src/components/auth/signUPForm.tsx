import { ValidateYupSchema } from '@/utils/formHelpers';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';
import { messages } from '@/lang';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Col, Row, Space, theme, Typography } from 'antd';
// import { AButton, APasswordField, ATextField, FormikForm } from 'ant-ui';
import styled from 'styled-components';
import { IAntTheme } from '@/theme/themeConfig';
import { LOGIN_IMG, LOGO_FULL } from '@/assets/images/imgAssets';
import { StyledLogoContainer } from '@/app/(admin_app)/(auth)/login/page';
import { APasswordField, ATextField, FormikForm } from '../../../packages/ant-ui';

const validateSchema = Yup.object().shape({
    email: Yup.string().email().required(messages.EMAIL_REQUIRED),
    password: Yup.string().required(messages.PASSWORD_REQUIRED),
});

const StyledButton = styled(Button)`
    margin-top: ${({ theme }: { theme: IAntTheme }) => theme?.marginSM}px;
`;

const SignUpForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { token: themeToken } = theme.useToken();

    const validateLogIn = async (values: any) => {
        const errors: any = await ValidateYupSchema({
            schema: validateSchema,
            data: values,
        });
        return errors;
    };
    console.log('themeToken', themeToken);

    return (
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
                <Row justify="space-around" align="bottom">
                    <Col
                        xl={8}
                        lg={10}
                        md={20}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'center',
                            paddingTop: 50,
                            paddingBottom: 50,
                            backgroundColor: themeToken.colorBgContainer,
                            borderRadius: 30,
                            paddingLeft: 50,
                            paddingRight: 50,
                        }}
                    >
                        <Space size={0} direction="vertical" style={{ width: '100%' }}>
                            <StyledLogoContainer theme={themeToken}>
                                <img src={LOGO_FULL} alt="logo" style={{ height: '50px' }} />
                            </StyledLogoContainer>
                            <Typography.Title level={3} style={{ marginBottom: 20 }}>
                                Sign Up here
                            </Typography.Title>
                            <ATextField type="email" name="email" label="Email address" placeholder="Enter your Email" />
                            <APasswordField name="password" label="Password" placeholder="Enter your Password" />
                            <StyledButton type="primary" theme={themeToken} block htmlType="submit" loading={formikProps.isSubmitting}>
                                Continue
                            </StyledButton>
                        </Space>
                    </Col>
                </Row>
            )}
        </FormikForm>
    );
};
export default SignUpForm;
