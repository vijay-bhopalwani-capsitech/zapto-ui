import { FormikHelpers, useFormikContext } from 'formik';
import { validateZodSchemaFormik } from 'ui-helpers';
import { z } from 'zod';
import { Alert, Button, Col, Row, Space, theme, Typography } from 'antd';
import { AButton, ACard, ADatePickerField, AFileUploadButtonField, ATelField, ATextField, FormikForm } from 'ant-ui';
import { handleFileUpload } from '@/utils/handleFileUpload';
import { FaUpload } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { MdEdit } from 'react-icons/md';
import { SIGN_UP_INDIVIDUAL, USER_PLACEHOLDER_SVG } from '@/assets/images/imgAssets';
import { UserProfileZS } from 'api-definitions';

export const UserProfileFormValuesZS = UserProfileZS;
export type IUserProfileFormValuesZS = z.infer<typeof UserProfileFormValuesZS>;

const validateForm = async (values: IUserProfileFormValuesZS) => {
    let zodErrors: Partial<IUserProfileFormValuesZS> = validateZodSchemaFormik({
        schema: z.object({
            name: z.object({
                first: z.string().min(1, 'Please provide first name'),
                middle: z.string().optional(),
                last: z.string().optional(),
            }),
            designation: z.string().min(3, 'Please provide designation'),
            username: z.string().min(3, 'Please provide userName'),
        }),
        values,
    });
    return zodErrors;
};

const UserProfileFormContent = ({ onBack, formDisabled, setFormDisabled }: { onBack?: () => void; formDisabled: boolean; setFormDisabled: (value: boolean) => void }) => {
    const formik = useFormikContext();
    const { token: themeToken } = theme.useToken();
    const { values, setFieldValue, isSubmitting } = useFormikContext<IUserProfileFormValuesZS>();

    return (
        <>
            <Alert
                message="Any updates made to the data will automatically reflect across the entire system, ensuring real-time synchronization and consistency.  "
                type="info"
                showIcon
                closable
                style={{ marginTop: `${themeToken.paddingLG}px` }}
            ></Alert>
            <Row style={{ paddingTop: `${themeToken.paddingLG}px` }}>
                <Col span={6}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: themeToken?.marginXS }}>
                            <img src={values.profileImage?.url ? values.profileImage?.url : SIGN_UP_INDIVIDUAL} alt="User Placeholder" style={{ borderRadius: '100%', width: 160, height: 160, objectFit: 'cover' }} />
                        </div>
                        <Row gutter={[themeToken?.paddingXS, themeToken?.paddingSM]} justify="center">
                            <Col>
                                <AFileUploadButtonField
                                    type="primary"
                                    name="profileImage"
                                    icon={<FaUpload size={15} />}
                                    allowedFileTypes={['image/png', 'image/jpg', 'image/jpeg', '']}
                                    typeErrorMessage="Only .png, .jpg and .jpeg are allowed"
                                    handleFileUpload={handleFileUpload}
                                >
                                    Upload
                                </AFileUploadButtonField>
                            </Col>
                            <Col>
                                <AButton icon={<GiCancel size={15} />} type="text" ghost onClick={() => setFieldValue('profileImage', null)}>
                                    Discard
                                </AButton>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={18}>
                    <ACard
                        title="Profile Details"
                        // variant={formDisabled ? 'default' : 'borderless'}
                        extra={
                            formDisabled && (
                                <Button
                                    icon={<MdEdit />}
                                    type="primary"
                                    onClick={() => {
                                        setFormDisabled((x) => !x);
                                    }}
                                >
                                    Edit
                                </Button>
                            )
                        }
                    >
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Row gutter={10}>
                                <Col span={24}>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Typography.Text>Name</Typography.Text>
                                        </Col>
                                        <Col span={8}>
                                            <ATextField disabled={formDisabled} type="text" label="First" name="name.first" placeholder="First Name" />
                                        </Col>
                                        <Col span={8}>
                                            <ATextField disabled={formDisabled} type="text" label="Middle" name="name.middle" placeholder="Middle Name" />
                                        </Col>
                                        <Col span={8}>
                                            <ATextField disabled={formDisabled} type="text" label="Last" name="name.last" placeholder="Last Name" />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField disabled={formDisabled ? true : values?.username !== '' ? true : false} type="text" label="Username" name="username" placeholder="Username" />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField type="text" label="Email" name="email" disabled placeholder="Email" />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField disabled={formDisabled} type="text" label="Designation" name="designation" placeholder="Designation" />
                                        </Col>

                                        <Col span={12}>
                                            <ATelField disabled={formDisabled} type="text" label="Phone" name="phone" placeholder="Phone" />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField disabled={formDisabled} type="text" label="Gender" name="gender" placeholder="Gender" />
                                        </Col>
                                        <Col span={12}>
                                            <ADatePickerField disabled={formDisabled} name={'dob'} label={'Date of Birth'} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Typography.Text>Address</Typography.Text>
                                        </Col>
                                        <Col span={12}>
                                            <ATextField type="text" label="Building" name="address.building" placeholder="Building" disabled={formDisabled} />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField type="text" label="Street" name="address.street" placeholder="Street" disabled={formDisabled} />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField type="text" label="City" name="address.city" placeholder="City" disabled={formDisabled} />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField type="text" label="County/State" name="address.county" placeholder="County/State" disabled={formDisabled} />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField type="text" label="Post Code" name="address.postCode" placeholder="Post Code" disabled={formDisabled} />
                                        </Col>
                                        <Col span={12}>
                                            <ATextField type="text" label="Country" name="address.country" placeholder="Country" disabled={formDisabled} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: 'auto', borderTop: `1px solid ${themeToken.colorBorder}` }} justify={'end'}>
                                {!formDisabled && (
                                    <Col>
                                        <Space style={{ paddingTop: `${themeToken.paddingSM}px` }}>
                                            <AButton className="me-2 px-4 btn-xs rounded-2" type="default" onClick={() => setFormDisabled((x) => !x)}>
                                                Cancel
                                            </AButton>
                                            <AButton type="primary" loading={formik.isSubmitting} htmlType="submit">
                                                Save
                                            </AButton>
                                        </Space>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    </ACard>
                </Col>
            </Row>
        </>
    );
};

export const UserProfileForm = ({
    handleSubmit,
    initialValues,
    onBack,
    formDisabled,
    setFormDisabled,
}: {
    handleSubmit: (values: IUserProfileFormValuesZS, formikHelpers: FormikHelpers<IUserProfileFormValuesZS>) => Promise<void>;
    initialValues?: IUserProfileFormValuesZS;
    onBack?: () => void;
    formDisabled: boolean;
    setFormDisabled: (value: boolean) => void;
}) => {
    return (
        <FormikForm onSubmit={handleSubmit} validate={validateForm} initialValues={initialValues}>
            <UserProfileFormContent onBack={onBack} formDisabled={formDisabled} setFormDisabled={setFormDisabled} />
        </FormikForm>
    );
};
