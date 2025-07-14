import { Axios } from 'axios';
import { API_BASE_URL } from '.';

const AUTH_BASE_URL = `${API_BASE_URL}/auth`;
export const registerUserRequest = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${AUTH_BASE_URL}/register`, payload);

export const loginRequest =
    ({ email, password }: { email: string; password: string }) =>
    (axiosInstance: Axios) =>
        axiosInstance.post(`${AUTH_BASE_URL}/login-admin`, { email, password });

export const logoutRequest =
    ({ refreshToken }: { refreshToken: string }) =>
    (axiosInstance: Axios) =>
        axiosInstance.post(`${AUTH_BASE_URL}/logout`, { refreshToken });

export const getProfileRequest =
    ({ accessToken }: { accessToken: string }) =>
    (axiosInstance: Axios) =>
        axiosInstance.get(`${AUTH_BASE_URL}/get-profile`);

export const updateProfileRequest = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${AUTH_BASE_URL}/update-profile`, payload);

export const IsEmailTakenRequest = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${AUTH_BASE_URL}/is-email-taken`, payload);

export const sendOtpRequest =
    ({ phone, email, medium }: { phone?: string; email?: string; medium: 'email' | 'sms' | 'both' }) =>
    (axiosInstance: Axios) =>
        axiosInstance.post(`${AUTH_BASE_URL}/send-otp`, { phone, email, medium });

export const checkOtpRequest = (payload: { email?: string; phone?: string; otp: string }) => (axiosInstance: Axios) => axiosInstance.post(`${AUTH_BASE_URL}/check-otp`, payload);

export const userOnBoardingRequest =
    ({ userId, email, password }: { userId: string; email: string; password: string }) =>
    (axiosInstance: Axios) =>
        axiosInstance.post(`${AUTH_BASE_URL}/on-boarding`, { userId, email, password });

export const userChangePasswordRequest = (payload: { oldPassword: string; newPassword: string }) => (axiosInstance: Axios) => axiosInstance.post(`${AUTH_BASE_URL}/change-password`, payload);
