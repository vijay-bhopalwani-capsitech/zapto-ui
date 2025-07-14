import React from 'react';
import { StaffForm } from './StaffForm';
import { IOrganisationStaffFormValuesZS } from './StaffModule';
import { useCreateStaff } from '@/services/staffService';

export function AddStaffForm({ onSuccess }: { onSuccess: () => void }) {
    const addStaff = useCreateStaff();

    const emptyStaff = {
        email: '',
        password: '',
        phone: '',
        name: {
            first: '',
            last: '',
            middle: '',
        },
        status: {
            label: 'ACTIVE',
            value: 'ACTIVE',
        },
    };

    const handleSubmit = async (values: IOrganisationStaffFormValuesZS) => {
        const payload = {
            // @ts-ignore
            ...values,
            status: values?.status?.value,
            userRoles: values?.userRoles,
            phone: values?.phone?.replace('+', '')?.replaceAll(' ', '')?.replaceAll('-', '')?.replaceAll('(', '')?.replaceAll(')', ''),
        };
        // @ts-ignore
        const result = await addStaff.mutateAsync(payload);
        if (!result.error && onSuccess) {
            onSuccess();
        }
    };

    return <StaffForm handleSubmit={handleSubmit} initialValues={emptyStaff as any} onBack={onSuccess} />;
}

export default AddStaffForm;
