import { appUrls } from '@/config/navigationConfig';
import { AButton, APasswordField, APhoneField, ATextField, FormikForm } from 'ant-ui';
import { Col, Row, Space, Typography } from 'antd';
import { FormikHelpers } from 'formik';
import Link from 'next/link';
import React from 'react';
import { validateZodSchemaFormik } from 'ui-helpers';
import { z } from 'zod';

export const BasicInfoStepZS = z.object({
    name: z.object({
        first: z.string().min(1, 'Please provide first name'),
        last: z.string().optional(),
    }),
    email: z.string().min(1, 'Please provide email'),
    phone: z.any().optional(),
    // password: z.string().min(4, 'Please provide password'),
    password: z.string().optional(),
});

export type IBasicInfoStepZS = z.infer<typeof BasicInfoStepZS>;
const validateForm = async (values: IBasicInfoStepZS) => {
    let zodErrors: Partial<IBasicInfoStepZS> = validateZodSchemaFormik({
        schema: BasicInfoStepZS,
        values,
    });
    return zodErrors;
};
const SendOTPByEmail = ({ isLoading, handleSubmit }: { isLoading: boolean; handleSubmit: (values: any) => Promise<void> }) => {
    return (
        <>
            {/* <Typography.Title level={4}>Enter Your Details Below</Typography.Title> */}
            <FormikForm initialValues={{ name: { first: '', last: '' }, email: '', password: '', phone: { number: '', countryCode: 1 } }} onSubmit={handleSubmit} validate={validateForm}>
                <Row gutter={10}>
                    <Col xs={12}>
                        <ATextField type="text" name="name.first" label="First Name" placeholder="Enter your first name" />
                    </Col>
                    <Col xs={12}>
                        <ATextField type="text" name="name.last" label="Last Name" placeholder="Enter your last name" />
                    </Col>
                </Row>

                <ATextField type="email" name="email" label="Email address" placeholder="Enter your Email" />
                <APhoneField name={'phone'} label="Phone number" placeholder="Enter your Phone number" />
                {/* <APasswordField name="password" label="Password" placeholder="Enter your Password" /> */}
                <Row justify={'start'}>
                    <AButton className="w-full" loading={isLoading} htmlType="submit" type="primary">
                        Next
                    </AButton>
                </Row>
                <Row justify={'center'} className="mt-2">
                    <Typography.Text strong>Already have an account?</Typography.Text>
                    <Link href={appUrls.LOGIN} className="font-bold">
                        &nbsp; Sign in
                    </Link>
                </Row>
            </FormikForm>
        </>
    );
};

export default SendOTPByEmail;
