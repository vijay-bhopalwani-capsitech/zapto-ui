import { FormikHelpers, useFormikContext } from 'formik';
import { z } from 'zod';

import { Col, Row, Typography } from 'antd';
import { AOTPField, FormikForm } from '../../../../packages/ant-ui';
import { AButton } from '../../../../packages/ant-ui/buttons';
import { validateZodSchemaFormik } from '../../../../packages/ui-helpers';

export const IndividualVerificationWithOtpZS = z.object({
    email: z.string().min(1, 'Please provide email'),
    otp: z.string().min(4, 'OTP is required'),
});

export type IIndividualVerificationWithOtpZS = z.infer<typeof IndividualVerificationWithOtpZS>;

const VerificationWithOtpFormContent = () => {
    const { isSubmitting, values } = useFormikContext<IIndividualVerificationWithOtpZS>();
    console.log('val', values);
    return (
        <>
            {/* <h4 style={{ textAlign: 'center' }}>Verification</h4> */}
            <Row className="animate__animated animate__fadeInRight">
                <Col span={18} className="mb-5">
                    <Typography.Title level={4}>OTP Verification</Typography.Title>
                    <Typography.Text>
                        Enter the verification code we just sent to your email <Typography.Text strong>{values?.email}</Typography.Text>
                    </Typography.Text>
                </Col>
                <Col xs={24}>
                    <AOTPField name={'otp'} />
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

const validateForm = async (values: IIndividualVerificationWithOtpZS) => {
    let zodErrors: Partial<IIndividualVerificationWithOtpZS> = validateZodSchemaFormik({
        schema: IndividualVerificationWithOtpZS,
        values,
    });
    return zodErrors;
};

const VerificationWithOtpForm = ({
    initialValues,
    handleSubmit,
}: {
    initialValues: IIndividualVerificationWithOtpZS;
    handleSubmit: (values: IIndividualVerificationWithOtpZS, formikHelpers?: FormikHelpers<IIndividualVerificationWithOtpZS>) => Promise<void>;
}) => {
    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <VerificationWithOtpFormContent />
        </FormikForm>
    );
};

export default VerificationWithOtpForm;
