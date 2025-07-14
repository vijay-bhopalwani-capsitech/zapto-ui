'use client';
import { IUserProfileFormValuesZS, UserProfileForm } from '@/components/settings/profile/UserProfileForm';
import { selectUserProfile, updateUserProfile } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserProfileSettingsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(selectUserProfile);
    const [formDisabled, setFormDisabled] = useState(true);

    const handleSubmit = async (values: IUserProfileFormValuesZS) => {
        const payload = {
            ...values,
            phone: values?.phone?.replace('+', '')?.replaceAll(' ', '')?.replaceAll('-', '')?.replaceAll('(', '')?.replaceAll(')', ''),
        };
        console.log(payload);
        const result = await dispatch(updateUserProfile(payload));
        if (result) {
            setFormDisabled(true);
        }
    };
    return <UserProfileForm initialValues={profile} handleSubmit={handleSubmit} formDisabled={formDisabled} setFormDisabled={setFormDisabled} />;
};

export default UserProfileSettingsPage;
