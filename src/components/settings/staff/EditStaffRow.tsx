import React, { useMemo } from 'react';
import { IOrganisationStaffZS } from 'api-definitions';
import { StaffForm } from './StaffForm';
import { IOrganisationStaffFormValuesZS } from './StaffModule';
import { useUpdateStaff } from '@/services/staffService';

function EditStaffRow({ row, onSuccess }: any) {
    const updateStaff = useUpdateStaff();
    const initialValues: IOrganisationStaffFormValuesZS = useMemo(() => {
        return {
            ...row,
            status: {
                label: row.status,
                value: row.status,
            },
            userRoles: row?.userRoles?.map((role: string) => {
                return {
                    label: role,
                    value: role,
                };
            }),
        } as IOrganisationStaffFormValuesZS;
    }, [row]);

    const handleSubmit = async (values: IOrganisationStaffFormValuesZS) => {
        const payload = {
            ...values,
            userRoles: values?.userRoles,
            status: values.status.value,
        };
        // @ts-ignore
        const result = await updateStaff.mutateAsync(payload);
        if (!result.error && onSuccess) {
            onSuccess();
        }
    };
    return <StaffForm initialValues={initialValues} handleSubmit={handleSubmit} onBack={onSuccess} />;
}

export default EditStaffRow;
