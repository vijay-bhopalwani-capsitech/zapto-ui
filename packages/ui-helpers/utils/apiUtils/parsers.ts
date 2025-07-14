import { message } from 'antd';

export const extractDataFromResponse = ({
    response,
    successCode = 200,
    successStatus = true,
    showSuccessToast = true,
    showErrorToast = true,
}: {
    response: any;
    successCode?: number;
    successStatus?: boolean;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
}) => {
    const data = response?.data?.data ?? {};
    if (response.status === successCode && response.data.success === successStatus && response.data.code === successCode) {
        if (showSuccessToast && response?.data?.message) {
            message.success(response.data.message, 3); 
        }
        data.error = false;
        return data;
    }
    if (showErrorToast) {
        message.error(response.data.message, 3); 
    }
    data.error = true;
    return data;
};

export const parseApiErrorResponse = ({
    error,
    showToast = true,
}: {
    error: any;
    showToast?: boolean;
}) => {
    if (error.response) {
        const response = error.response;
        const data = response?.data?.data ?? {};
        data.error = true;
        if (showToast) {
            message.error(response.data.message, 3); 
        }
        return data;
    }
    if (showToast) {
        message.error('Something went wrong, Please try again later.', 3);
    }
    return { error: true };
};
