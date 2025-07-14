import React, { useMemo } from "react";
import { FormikHelpers, useFormikContext } from "formik";
import { z } from "zod";
import { Col, Row, Typography, theme } from "antd";
// import {
//   AButton,
//   ASelectField,
//   ATelField,
//   ATextField,
//   FormikForm,
// } from "ant-ui";

// import { validateZodSchemaFormik } from "ui-helpers";
// import { any } from "./StaffModule";
import { validateZodSchemaFormik } from "../../../../packages/ui-helpers";
import { ASelectField, ATextField, FormikForm } from "../../../../packages/ant-ui";
import { AButton } from "../../../../packages/ant-ui/buttons";

const validateForm = async (values: any) => {
  let zodErrors: Partial<any> =
    validateZodSchemaFormik({
      schema: z.any(),
      values,
    });
  return zodErrors;
};

const StaffFormContent = (props: { staffId?: string; onBack?: () => void }) => {
  const formik = useFormikContext();
  const { token } = theme.useToken();

  const userRoleOptions = useMemo(() => {
    return [
      {
        label: "ADMIN",
        value: "ADMIN",
      },
      {
        label: "STAFF",
        value: "STAFF",
      },
      {
        label: "MARKETING",
        value: "MARKETING",
      },
      {
        label: "TEACHER",
        value: "TEACHER",
      },
    ];
  }, [token]);

  const staffStatusOptions = useMemo(() => {
    return [
      {
        label: (
          <Typography.Text
            style={{
              color: token.green8,
            }}
          >
            ACTIVE
          </Typography.Text>
        ),
        value: "ACTIVE",
      },
      {
        label: (
          <Typography.Text
            style={{
              color: token.red8,
            }}
          >
            INACTIVE
          </Typography.Text>
        ),
        value: "INACTIVE",
      },
    ];
  }, [token]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Row gutter={10}>
        <Col span={24}>
          <Typography.Text>Name</Typography.Text>
        </Col>
        <Col span={8}>
          <ATextField
            type="text"
            label="First"
            name="profile.name.first"
            placeholder="First name"
          />
        </Col>
        <Col span={8}>
          <ATextField
            type="text"
            label="Middle"
            name="profile.name.middle"
            placeholder="Middle name"
          />
        </Col>
        <Col span={8}>
          <ATextField
            type="text"
            label="Last"
            name="profile.name.last"
            placeholder="Last name"
          />
        </Col>
        <Col xs={24}>
          <ATextField
            type="text"
            label="Email"
            name="email"
            placeholder="Enter email"
          />
        </Col>
        {/* <Col xs={24}>
                    <ATelField type="text" label="Phone" name="phone" placeholder="Enter phone number" />
                </Col> */}
        {!props?.staffId && (
          <Col xs={24}>
            <ATextField
              type="password"
              label="Password"
              name="password"
              placeholder="Enter password"
            />
          </Col>
        )}
        {/* <Col xs={24}> */}
        {/*<SelectField xs useCtSelect menuPlacement={'top'} dropdownMinHeight={70} isMulti isClearable={false} valueKey={'_id'} labelKey={'title'} name="roles" label="Roles" options={data?.results} />*/}
        {/* <TransferField valueKey={'_id'} name="roles" label="Roles" labelKey={'title'} options={data?.results ?? []} isInvalid /> */}
        {/* </Col> */}
        <Col xs={24}>
          <ASelectField
            mode="multiple"
            name="userRoles"
            label="Roles"
            options={userRoleOptions}
            placeholder="Select roles"
          />
        </Col>
        <Col xs={24}>
          <ASelectField
            name="status"
            label="Status"
            options={staffStatusOptions}
          />
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "auto",
          borderTop: "1px solid #efefef",
        }}
      >
        <Col className="flex w-full justify-end pt-2">
          <AButton
            className="me-2 px-4 "
            type="primary"
            ghost
            onClick={props.onBack}
          >
            Cancel
          </AButton>
          <AButton
            type="primary"
            loading={formik.isSubmitting}
            htmlType="submit"
          >
            Save
          </AButton>
        </Col>
      </Row>
    </div>
  );
};

export const StaffForm = ({
  handleSubmit,
  initialValues,
  onBack,
}: {
  handleSubmit: (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => Promise<void>;
  initialValues?: any;
  onBack?: () => void;
}) => {
  return (
    <FormikForm
      onSubmit={handleSubmit}
      validate={validateForm}
      initialValues={initialValues}
    >
      <StaffFormContent onBack={onBack} staffId={initialValues?._id} />
    </FormikForm>
  );
};
