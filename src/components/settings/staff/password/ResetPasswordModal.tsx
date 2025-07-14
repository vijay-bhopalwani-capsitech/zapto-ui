import React from 'react';
import { AModal } from 'ant-ui';
import ResetPasswordForm, { IResetPasswordFormValuesZS } from '@/components/settings/staff/password/ResetPasswordForm';
import { callApi } from '@/utils/apiUtils/callApi';
import { getUserProfile, userChangePassword } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const initialValues: IResetPasswordFormValuesZS = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const ResetPasswordModal = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleSubmit = async (values: IResetPasswordFormValuesZS) => {
        const payload: Pick<IResetPasswordFormValuesZS, 'oldPassword' | 'newPassword'> = {
            oldPassword: values?.oldPassword,
            newPassword: values?.newPassword,
        };
        const result = await dispatch(userChangePassword(payload));
        // @ts-ignore
        if (!result?.error) {
            await dispatch(getUserProfile());
            handleClose();
        }
    };

    return (
        <AModal title="Reset Password" open={isOpen} footer={null} maskClosable={false} closeIcon={null} onCancel={handleClose}>
            <ResetPasswordForm initialValues={initialValues} handleSubmit={handleSubmit} onBack={handleClose} />
        </AModal>
    );
};

export default ResetPasswordModal;
