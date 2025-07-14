import { FormikHelpers, useFormikContext } from 'formik';
import { z } from 'zod';
// import { AButton, AOTPField, APasswordField, ATextField, FormikForm } from 'ant-ui';
import { Col, Row, Typography } from 'antd';
import { validateZodSchemaFormik } from '../../../../packages/ui-helpers';
import { APasswordField, FormikForm } from '../../../../packages/ant-ui';
import { AButton } from '../../../../packages/ant-ui/buttons';

export const SignUPWithPasswordZS = z
    .object({
        name: z.object({}),
        email: z.string().min(1, 'Please provide email'),
        phone: z.any().optional(),
        password: z.string().min(4, 'Please provide password'),
        confirmNewPassword: z.string().min(4).nonempty('Please re-enter password'),
    })
    .superRefine((values, ctx) => {
        if (values?.confirmNewPassword && values?.password && values?.confirmNewPassword !== values?.password) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmNewPassword'],
                message: 'Passwords did not match',
            });
        }
    });

export type ISignUPWithPasswordZS = z.infer<typeof SignUPWithPasswordZS>;

const PasswordFormContent = () => {
    const { isSubmitting, values } = useFormikContext<ISignUPWithPasswordZS>();
    console.log('val', values);
    return (
        <>
            {/* <h4 style={{ textAlign: 'center' }}>Verification</h4> */}
            <Row className="animate__animated animate__fadeInRight">
                <Col span={18} className="mb-5">
                    <Typography.Title level={4}>Generate Password</Typography.Title>
                    <Typography.Text>
                        Please generate the password for your email <Typography.Text strong>{values?.email}</Typography.Text>
                    </Typography.Text>
                </Col>
                <Col xs={24}>
                    <APasswordField name="password" label="Password" placeholder="New Password" />
                </Col>
                <Col xs={24}>
                    <APasswordField name="confirmNewPassword" label="Confirm Password" placeholder="Confirm Password" />
                </Col>
                <Col xs={24} className="d-flex w-100 justify-content-end pt-3">
                    <AButton className="mt-none px-4 w-full" type="primary" loading={isSubmitting} htmlType="submit">
                        Save
                    </AButton>
                </Col>
            </Row>
        </>
    );
};

const validateForm = async (values: ISignUPWithPasswordZS) => {
    let zodErrors: Partial<ISignUPWithPasswordZS> = validateZodSchemaFormik({
        schema: SignUPWithPasswordZS,
        values,
    });
    return zodErrors;
};

const SignUPWithPasswordForm = ({
    initialValues,
    handleSubmit,
}: {
    initialValues: ISignUPWithPasswordZS;
    handleSubmit: (values: ISignUPWithPasswordZS, formikHelpers?: FormikHelpers<ISignUPWithPasswordZS>) => Promise<void>;
}) => {
    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <PasswordFormContent />
        </FormikForm>
    );
};

export default SignUPWithPasswordForm;
