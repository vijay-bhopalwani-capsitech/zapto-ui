import { Col, Row, Input, Form, Typography, Space, Spin, Steps } from "antd";
import React, { useState } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoMailOutline,
  IoKeyOutline,
  IoPersonOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
  IoCallOutline,
} from "react-icons/io5";
import { FaKey, FaUserPlus } from "react-icons/fa";
import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { checkOtpRequest, sendOtpRequest } from "@/services/authService";
import { callApi } from "@/utils/apiUtils/callApi";
import { appUrls } from "@/config/navigationConfig";
import { registerUser } from "@/redux/slices/authSlice";
import * as Yup from "yup";
import Image from "next/image";
import { LOGO_FULL } from "@/assets/images/imgAssets";
import PageContainer from "@/utils/PageContainer";
import { AButton } from "../../../../packages/ant-ui/buttons";
import { ACard } from "../../../../packages/ant-ui";

const { Title, Text } = Typography;

// Validation Schemas
const emailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const otpSchema = Yup.object({
  email: Yup.string().email().required(),
  otp: Yup.string()
    .matches(/^\d{4}$/, "OTP must be 4 digits")
    .required("OTP is required"),
});

const passwordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

// Custom styled components
const StyledCard = {
  background: "#fff",
  borderRadius: 20,
  padding: "2.5rem",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  border: "none",
  minHeight: "500px",
  position: "relative" as const,
  overflow: "hidden" as const,
};

const StepHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
    <div
      style={{
        fontSize: "3rem",
        marginBottom: "1rem",
        color: "#D29022",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </div>
    <Title
      level={2}
      style={{
        color: "#610E07",
        marginBottom: "0.5rem",
        fontWeight: 700,
        fontSize: "1.8rem",
      }}
    >
      {title}
    </Title>
    <Text
      style={{
        color: "#666",
        fontSize: "1rem",
        display: "block",
      }}
    >
      {subtitle}
    </Text>
  </div>
);

const PrimaryButton = ({ children, loading, ...props }: any) => (
  <AButton
    type="primary"
    size="large"
    loading={loading}
    style={{
      background: "#D29022",
      borderColor: "#D29022",
      borderRadius: "12px",
      height: "50px",
      // fontSize: '1rem',
      // fontWeight: 600,
      boxShadow: "0 4px 12px rgba(210, 144, 34, 0.3)",
      transition: "all 0.3s ease",
    }}
    {...props}
  >
    {children}
  </AButton>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <AButton
    type="text"
    icon={<IoArrowBack />}
    onClick={onClick}
    style={{
      color: "#610E07",
      fontSize: "1rem",
      fontWeight: 500,
      padding: "8px 16px",
      borderRadius: "8px",
      transition: "all 0.3s ease",
    }}
  >
    Back
  </AButton>
);

const SignUpSteps = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationOtp, setVerificationOtp] = useState("");
  const [formValues, setFormValues] = useState<any>({});
  console.log("Form Values:", formValues);
  // API functions
  const sendOtp = async (values: any) =>
    await callApi({
      requestFunction: sendOtpRequest({ email: values.email, medium: "email" }),
      callRefreshTokenOnAuthError: false,
    });

  const checkOtp = async (values: any) =>
    await callApi({
      requestFunction: checkOtpRequest({
        email: values.email,
        otp: values.otp,
      }),
      callRefreshTokenOnAuthError: false,
    });

  // Step 1: Email Form
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setFormValues(values);
      const result = await sendOtp({ email: values.email });
      setIsLoading(false);
      if (!result?.error) {
        setActiveStep(2);
      }
    },
  });

  // Step 2: OTP Verification Form
  const otpFormik = useFormik({
    initialValues: {
      email: formValues?.email ?? "",
      otp: "",
    },
    validationSchema: otpSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      const result = await checkOtp(values);
      setIsLoading(false);
      if (!result?.error) {
        setVerificationOtp(values.otp);
        setActiveStep(3);
      }
    },
  });

  // Step 3: Password Setup Form
  const passwordFormik = useFormik({
    initialValues: {
      ...formValues,
      password: "",
      fullName: "",
      phone: "",
      confirmNewPassword: "",
    },
    validationSchema: passwordSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      const userData = {
        email: values.email,
        password: values.password,
        name: {
          first: values?.fullName.split(" ")[0] || "",
          last: values?.fullName.split(" ")[1] || "",
        },
        phone: values.phone,
      };
      const result = await dispatch(registerUser(userData));
      setIsLoading(false);
      if (!result.error) {
        router.push(appUrls.HOME);
      }
    },
  });

  const handleBackClick = () => {
    if (activeStep === 1) {
      router.push(appUrls.HOME);
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="animate__animated animate__fadeIn">
      <div className="flex justify-center mb-4">
        <Image
          src={LOGO_FULL}
          alt="logo"
          width={250}
          height={200}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />
      </div>
      <StepHeader
        icon={<></>}
        title="Let's Get You Onboard 🎒"
        subtitle="Enter your email to receive an OTP and start your journey"
      />

      <Form
        onFinish={emailFormik.handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Input
              prefix={<IoMailOutline style={{ color: "#D29022" }} />}
              placeholder="Enter your email address"
              size="large"
              value={emailFormik.values.email}
              onChange={emailFormik.handleChange}
              onBlur={emailFormik.handleBlur}
              name="email"
              style={{
                borderRadius: "12px",
                height: "50px",
                fontSize: "1rem",
                borderColor:
                  emailFormik.touched.email && emailFormik.errors.email
                    ? "#ff4d4f"
                    : "#d9d9d9",
              }}
            />
            {emailFormik.touched.email && emailFormik.errors.email && (
              <Text
                type="danger"
                style={{ display: "block", marginTop: "4px" }}
              >
                {emailFormik.errors.email}
              </Text>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PrimaryButton
              htmlType="submit"
              loading={isLoading}
              icon={<IoArrowForward />}
              iconPosition="end"
              styles={{ icon: { margin: "0px" } }}
              style={{ width: "100%" }}
            >
              Send OTP
            </PrimaryButton>
          </div>
        </Space>
      </Form>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate__animated animate__fadeIn">
      <StepHeader
        icon={<FaKey />}
        title="Verify Your Identity 🔑"
        subtitle={`We've sent an OTP to ${formValues?.email}`}
      />

      <Form
        onFinish={otpFormik.handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Input
              prefix={<IoKeyOutline style={{ color: "#D29022" }} />}
              placeholder="Enter 4-digit OTP"
              size="large"
              value={otpFormik.values.otp}
              onChange={otpFormik.handleChange}
              onBlur={otpFormik.handleBlur}
              name="otp"
              maxLength={4}
              style={{
                borderRadius: "12px",
                height: "50px",
                fontSize: "1rem",
                textAlign: "center",
                borderColor:
                  otpFormik.touched.otp && otpFormik.errors.otp
                    ? "#ff4d4f"
                    : "#d9d9d9",
              }}
            />
            {otpFormik.touched.otp && otpFormik.errors.otp && (
              <Text
                type="danger"
                style={{ display: "block", marginTop: "4px" }}
              >
                {otpFormik.errors.otp}
              </Text>
            )}
          </div>

          <PrimaryButton
            htmlType="submit"
            loading={isLoading}
            styles={{ icon: { margin: "0px" } }}
            style={{ width: "100%" }}
            icon={<IoCheckmarkCircleOutline />}
            iconPosition="end"
          >
            Verify & Continue
          </PrimaryButton>
        </Space>
      </Form>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate__animated animate__fadeIn">
      <StepHeader
        icon={<FaUserPlus />}
        title="Create Your Zappotel Identity ✨"
        subtitle="Set a secure password to protect your account"
      />

      <Form
        onFinish={passwordFormik.handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Input
              prefix={<IoPersonOutline style={{ color: "#D29022" }} />}
              placeholder="Enter your name"
              size="large"
              value={passwordFormik.values.fullName}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              name="fullName"
              style={{
                borderRadius: "12px",
                height: "50px",
                fontSize: "1rem",
                borderColor:
                  passwordFormik.touched.fullName &&
                  passwordFormik.errors.fullName
                    ? "#ff4d4f"
                    : "#d9d9d9",
              }}
            />
            {passwordFormik.touched.fullName &&
              passwordFormik.errors.fullName && (
                <Text
                  type="danger"
                  style={{ display: "block", marginTop: "4px" }}
                >
                  {passwordFormik.errors.fullName}
                </Text>
              )}
          </div>

          <div>
            <Input
              prefix={<IoMailOutline style={{ color: "#D29022" }} />}
              placeholder="Enter your email"
              size="large"
              value={passwordFormik.values.email}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              name="email"
              style={{
                borderRadius: "12px",
                height: "50px",
                fontSize: "1rem",
                borderColor:
                  passwordFormik.touched.email && passwordFormik.errors.email
                    ? "#ff4d4f"
                    : "#d9d9d9",
              }}
            />
            {passwordFormik.touched.email && passwordFormik.errors.email && (
              <Text
                type="danger"
                style={{ display: "block", marginTop: "4px" }}
              >
                {passwordFormik.errors.email}
              </Text>
            )}
          </div>

          <div>
            <Input
              prefix={<IoCallOutline style={{ color: "#D29022" }} />}
              placeholder="Enter your phone number"
              size="large"
              value={passwordFormik.values.phone}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              name="phone"
              style={{
                borderRadius: "12px",
                height: "50px",
                fontSize: "1rem",
                borderColor:
                  passwordFormik.touched.phone && passwordFormik.errors.phone
                    ? "#ff4d4f"
                    : "#d9d9d9",
              }}
            />
            {passwordFormik.touched.phone && passwordFormik.errors.phone && (
              <Text
                type="danger"
                style={{ display: "block", marginTop: "4px" }}
              >
                {passwordFormik.errors.phone}
              </Text>
            )}
          </div>

          <div>
            <Input.Password
              prefix={<IoLockClosedOutline style={{ color: "#D29022" }} />}
              placeholder="Create password"
              size="large"
              value={passwordFormik.values.password}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              name="password"
              style={{
                borderRadius: "12px",
                height: "50px",
                fontSize: "1rem",
                borderColor:
                  passwordFormik.touched.password &&
                  passwordFormik.errors.password
                    ? "#ff4d4f"
                    : "#d9d9d9",
              }}
            />
            {passwordFormik.touched.password &&
              passwordFormik.errors.password && (
                <Text
                  type="danger"
                  style={{ display: "block", marginTop: "4px" }}
                >
                  {passwordFormik?.errors?.password}
                </Text>
              )}
          </div>

          <div>
            <Input.Password
              prefix={<IoLockClosedOutline style={{ color: "#D29022" }} />}
              placeholder="Confirm password"
              size="large"
              value={passwordFormik.values.confirmNewPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              name="confirmNewPassword"
              style={{
                borderRadius: "12px",
                height: "50px",
                fontSize: "1rem",
                borderColor:
                  passwordFormik.touched.confirmNewPassword &&
                  passwordFormik.errors.confirmNewPassword
                    ? "#ff4d4f"
                    : "#d9d9d9",
              }}
            />
            {passwordFormik.touched.confirmNewPassword &&
              passwordFormik.errors.confirmNewPassword && (
                <Text
                  type="danger"
                  style={{ display: "block", marginTop: "4px" }}
                >
                  {passwordFormik.errors.confirmNewPassword}
                </Text>
              )}
          </div>

          <PrimaryButton
            htmlType="submit"
            loading={isLoading}
            styles={{ icon: { margin: "0px" } }}
            style={{ width: "100%" }}
            icon={<IoPersonOutline />}
            iconPosition="end"
          >
            Join the Community
          </PrimaryButton>
        </Space>
      </Form>
    </div>
  );

  return (
    <PageContainer>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #FFF9F5 0%, #FFF5F0 100%)",
          padding: "2rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "600px" }}>
          {/* Progress Steps */}
          <Row justify="center" style={{ marginBottom: "2rem" }}>
            <Col span={20}>
              <Steps
                current={activeStep - 1}
                progressDot
                items={[
                  { title: "Email", icon: <IoMailOutline /> },
                  { title: "Verify", icon: <IoKeyOutline /> },
                  { title: "Setup", icon: <IoPersonOutline /> },
                ]}
                style={
                  {
                    "--antd-steps-finish-color": "#D29022",
                    "--antd-steps-active-color": "#D29022",
                  } as any
                }
              />
            </Col>
          </Row>

          {/* Main Card */}
          <ACard style={StyledCard}>
            {/* Back Button */}
            {activeStep > 1 && (
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "1.5rem",
                  zIndex: 1,
                }}
              >
                <BackButton onClick={handleBackClick} />
              </div>
            )}

            {/* Step Content */}
            <div style={{ paddingTop: activeStep > 1 ? "2rem" : "0" }}>
              {activeStep === 1 && renderStep1()}
              {activeStep === 2 && renderStep2()}
              {activeStep === 3 && renderStep3()}
            </div>

            {/* Decorative Elements */}
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "100px",
                height: "100px",
                background: "linear-gradient(45deg, #D29022, #610E07)",
                borderRadius: "50%",
                opacity: 0.1,
                zIndex: 0,
              }}
            />
          </ACard>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              color: "#666",
            }}
          >
            <Text
              style={{
                fontSize: "0.9rem",
                display: "flex ",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Already have an account?
              <AButton
                type="link"
                onClick={() => router.push(appUrls.LOGIN)}
                style={{ color: "#D29022", fontWeight: 600 }}
              >
                Sign In
              </AButton>
            </Text>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SignUpSteps;
