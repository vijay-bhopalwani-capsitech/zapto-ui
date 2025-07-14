import { AButton, APasswordField, ATextField, FormikForm } from 'ant-ui';
import { Col, Row, theme } from 'antd';
import { useFormikContext } from 'formik';
import { validateZodSchemaFormik } from 'ui-helpers';
import { z } from 'zod';
import { sendOtpRequest } from '@/services/authService';
import { callApi } from '@/utils/apiUtils/callApi';

const ResetPasswordFormContent = ({ onBack }: { onBack: () => void }) => {
    const { values, errors, isSubmitting, setTouched } = useFormikContext<IResetPasswordFormValuesZS>();
    const { token: themeToken } = theme.useToken();

    return (
        <>
            <Row>
                <Col xs={24}>
                    <APasswordField name="oldPassword" label="Old Password" placeholder="Old Password" />
                </Col>
                <Col xs={24}>
                    <APasswordField name="newPassword" label="New Password" placeholder="New Password" />
                </Col>
                <Col xs={24}>
                    <APasswordField name="confirmNewPassword" label="Confirm New Password" placeholder="Confirm New Password" />
                </Col>
            </Row>

            <Row justify="end">
                <Col>
                    <AButton type="primary" loading={isSubmitting} htmlType="submit">
                        Save
                    </AButton>
                </Col>
            </Row>
        </>
    );
};

const ResetPasswordFormValuesZS = z
    .object({
        oldPassword: z.string().min(4).nonempty('Please enter old password'),
        newPassword: z.string().min(4).nonempty('Please enter password'),
        confirmNewPassword: z.string().min(4).nonempty('Please re-enter password'),
    })
    .superRefine((values, ctx) => {
        if (values?.oldPassword && values?.newPassword && values?.oldPassword === values?.newPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['newPassword'],
                message: "Old and new password can't be same",
            });
        }
        if (values?.confirmNewPassword && values?.newPassword && values?.confirmNewPassword !== values?.newPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmNewPassword'],
                message: 'Passwords did not match',
            });
        }
    });

export type IResetPasswordFormValuesZS = z.infer<typeof ResetPasswordFormValuesZS>;

const validateForm = (values: IResetPasswordFormValuesZS) => {
    const zodError = validateZodSchemaFormik({
        schema: ResetPasswordFormValuesZS,
        values,
    });
    return zodError;
};

const ResetPasswordForm = ({ initialValues, handleSubmit, onBack }: { initialValues: IResetPasswordFormValuesZS; handleSubmit: (values: IResetPasswordFormValuesZS) => Promise<void>; onBack: () => void }) => {
    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <ResetPasswordFormContent onBack={onBack} />
        </FormikForm>
    );
};

export default ResetPasswordForm;
