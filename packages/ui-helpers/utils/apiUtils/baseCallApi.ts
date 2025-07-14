import axios from 'axios';
import { message } from 'antd';

import { BaseCallApiResponse } from '../../@types';
import { extractDataFromResponse, parseApiErrorResponse } from './parsers';
import { decryptData, encryptData } from './apiEncryption';

/*
Api Response data sample
{
  "code": 200,
  "status": true,
  "message": "Success",
  "data": {
    "institute": {
      "_id": "61ff99fc5561dd0cf0fa622e",
      "name": "Demo institute",
      "country": "India",
      "state": "Rajasthan",
      "city": "Jodhpur",
      "address": "demo"
    }
  }
}
*/

export const refreshTokenRequest = async ({ refreshToken, API_BASE_URL }: { refreshToken: string; API_BASE_URL: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-tokens`, { refreshToken });
        return extractDataFromResponse({
            response,
            showErrorToast: false,
            showSuccessToast: false,
        });
    } catch (error) {
        return parseApiErrorResponse({
            error,
            showToast: false,
        });
    }
};

export const generateCallApi =
    ({ store: defaultStore, API_BASE_URL, environmentVariables }: { store?: any; API_BASE_URL: string; envData: any; environmentVariables: any }) =>
    async <ReturnType extends BaseCallApiResponse>({
        requestFunction,
        successCode = 200,
        showToastOnSuccess = false,
        showToastOnError = true,
        callRefreshTokenOnAuthError = true,
        authErrorCode = 401,
        thunkApi,
    }: {
        requestFunction: (arg: any) => any;
        successCode?: number;
        showToastOnSuccess?: boolean;
        showToastOnError?: boolean;
        callRefreshTokenOnAuthError?: boolean;
        authErrorCode?: number;
        thunkApi?: any;
    }): Promise<ReturnType | BaseCallApiResponse> => {
        const store = thunkApi ? thunkApi : defaultStore;
        const accessToken = store.getState().auth.accessToken;
        const activeBusinessId = store.getState().globalChat.activeWorkspace;
        const activeUserType = store.getState().auth?.user?.userType || null;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...(!activeBusinessId || activeUserType === 'CRM_USER' ? {} : { 'Active-Business-Id': `${activeBusinessId}` }),
        };
        const axiosInstance = axios.create({
            headers,
        });

        // Add request interceptor for encryption
        if (environmentVariables && environmentVariables.API_AES_KEY && environmentVariables.API_AES_IV && environmentVariables.NODE_JOB_ENV && environmentVariables.NODE_JOB_ENV === 'uat') {
            axiosInstance.interceptors.request.use(
                (config) => {
                    if (config.data && config.method !== 'get') {
                        try {
                            config.data = { encryptedData: encryptData(config.data, environmentVariables) };
                        } catch (error) {
                            console.error('Request encryption failed:', error);
                            return Promise.reject(error);
                        }
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            // Add response interceptor for decryption
            axiosInstance.interceptors.response.use(
                (response) => {
                    if (response.data && typeof response.data === 'object') {
                        try {
                            if (response.data.encryptedData) {
                                response.data = decryptData(response.data.encryptedData, environmentVariables);
                            }
                        } catch (error) {
                            console.error('Response decryption failed:', error);
                            return Promise.reject(error);
                        }
                    }
                    return response;
                },
                (error) => {
                    if (error.response && error.response.data && typeof error.response.data === 'object') {
                        try {
                            if (error.response.data.encryptedData) {
                                error.response.data = decryptData(error.response.data.encryptedData, environmentVariables);
                            }
                        } catch (decryptError) {
                            console.error('Error response decryption failed:', decryptError);
                        }
                    }
                    return Promise.reject(error);
                }
            );
        }
        if (requestFunction) {
            try {
                const response = await requestFunction(axiosInstance);

                return extractDataFromResponse({
                    response,
                    successCode,
                    showSuccessToast: showToastOnSuccess,
                    showErrorToast: showToastOnError,
                });
            } catch (error: any) {
                console.log('callApi -> error', error);

                if (error.response) {
                    if (error.response.status === authErrorCode || error.response.data.code === authErrorCode) {
                        if (callRefreshTokenOnAuthError) {
                            const refreshToken = store.getState().auth.refreshToken;
                            if (!refreshToken) {
                                return { error: true };
                            }
                            const refreshTokenResponseData = await refreshTokenRequest({
                                refreshToken,
                                API_BASE_URL,
                            });
                            if (refreshTokenResponseData.error) {
                                message.error('Your session expired, please login again.');
                                store.dispatch({
                                    type: 'auth/logout/fulfilled',
                                    payload: {},
                                });
                                return { error: true };
                            }
                            const newAccessToken = refreshTokenResponseData?.tokens?.access?.token;
                            const newRefreshToken = refreshTokenResponseData?.tokens?.refresh?.token;
                            if (newAccessToken && newRefreshToken) {
                                store.dispatch({
                                    type: 'auth/setTokens',
                                    payload: {
                                        accessToken: newAccessToken,
                                        refreshToken: newRefreshToken,
                                    },
                                });
                                return generateCallApi({ store, API_BASE_URL, environmentVariables })({
                                    requestFunction,
                                    successCode,
                                    showToastOnSuccess,
                                    showToastOnError,
                                    callRefreshTokenOnAuthError: false,
                                });
                            }
                            return { error: true };
                        }
                        return { error: true };
                    }

                    return parseApiErrorResponse({
                        error,
                        showToast: showToastOnError,
                    });
                }
            }
        }
        return { error: true };
    };
