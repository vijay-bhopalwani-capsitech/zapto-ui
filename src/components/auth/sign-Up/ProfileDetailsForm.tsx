import { ATextField, ATelField, ADatePickerField, ALocationAutoCompleteField, FormikForm, AButton } from 'ant-ui';
import { Row, Col, Typography } from 'antd';
import { UserProfileZS, apiDefs } from 'api-definitions';
import { FormikHelpers, useFormikContext } from 'formik';
import React from 'react';
import { validateZodSchemaFormik } from 'ui-helpers';
import { z } from 'zod';

export const UserProfileFormValuesZS = UserProfileZS;
export type IUserProfileFormValuesZS = z.infer<typeof UserProfileFormValuesZS>;

const validateForm = async (values: IUserProfileFormValuesZS) => {
    let zodErrors: Partial<IUserProfileFormValuesZS> = validateZodSchemaFormik({
        schema: apiDefs?.organisationStaff.routes.updateProfile.req.body?.extend({}),
        values,
    });
    return zodErrors;
};

const ProfileDetailsFormContent = () => {
    const formik = useFormikContext();

    return (
        <div>
            <Row gutter={10}>
                <Col span={24}>
                    <Row gutter={10}>
                        <Col span={24}>
                            <Typography.Text>Name</Typography.Text>
                        </Col>
                        <Col span={8}>
                            <ATextField type="text" label="First" name="name.first" placeholder="First Name" />
                        </Col>
                        <Col span={8}>
                            <ATextField type="text" label="Middle" name="name.middle" placeholder="Middle Name" />
                        </Col>
                        <Col span={8}>
                            <ATextField type="text" label="Last" name="name.last" placeholder="Last Name" />
                        </Col>
                        <Col span={12}>
                            <ATextField type="text" label="Username" name="username" placeholder="Username" />
                        </Col>
                        <Col span={12}>
                            <ATextField type="text" label="Email" name="email" disabled placeholder="Email" />
                        </Col>
                        <Col span={12}>
                            <ATextField type="text" label="Designation" name="designation" placeholder="Designation" />
                        </Col>

                        <Col span={12}>
                            <ATelField type="text" label="Phone" name="phone" placeholder="Phone" />
                        </Col>
                        <Col span={12}>
                            <ATextField type="text" label="Gender" name="gender" placeholder="Gender" />
                        </Col>
                        <Col span={12}>
                            <ADatePickerField name={'dob'} label={'Date of Birth'} />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={10}>
                        {/* <Col span={24}>
                            <Typography.Text>Address</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <ALocationAutoCompleteField name={'address'} placeholder="Please provide address" />
                        </Col> */}

                        <Col span={12}>
                            <ATextField type="text" label="Website" name="website" placeholder="Website" />
                        </Col>
                        {/* <Col span={12}>
                            <ATextField type="text" label="Linkedin" name="linkedInLink" placeholder="Linkedin" />
                        </Col> */}
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: 'auto', borderTop: '1px solid #efefef' }}>
                <Col className="d-flex w-100 justify-content-end pt-3">
                    {/* <AButton className="me-2 px-4 btn-xs rounded-2" type="default" onClick={onBack}>
                        Cancel
                    </AButton> */}
                    <AButton type="primary" loading={formik.isSubmitting} htmlType="submit">
                        Save
                    </AButton>
                </Col>
            </Row>
        </div>
    );
};

export const ProfileDetailsForm = ({
    handleSubmit,
    initialValues,
    onBack,
}: {
    handleSubmit: (values: IUserProfileFormValuesZS, formikHelpers: FormikHelpers<IUserProfileFormValuesZS>) => Promise<void>;
    initialValues?: IUserProfileFormValuesZS;
    onBack?: () => void;
}) => {
    return (
        <FormikForm onSubmit={handleSubmit} validate={validateForm} initialValues={initialValues}>
            <ProfileDetailsFormContent  />
        </FormikForm>
    );
};
