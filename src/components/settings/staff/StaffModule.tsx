import { IOrganisationStaffZS, OrganisationStaffZS } from 'api-definitions';
import { z } from 'zod';
import React, { useMemo } from 'react';
import { CrudModule } from '@/components/ui/partials/crud-module';
import { ASelectField, ATextField } from 'ant-ui';
import { AStatusDropdownButton } from 'ant-ui/buttons/StatusDropdownButton';
import { Typography, theme } from 'antd';
import AddStaffForm from './AddStaffForm';
import EditStaffRow from './EditStaffRow';
import { useDeleteStaff, useGetStaffList, useUpdateStaff, useUpdateStaffStatus } from '@/services/staffService';

export const OrganisationStaffFormValuesZS = OrganisationStaffZS.extend({
    status: z.object({
        label: z.string(),
        value: z.string(),
    }),
    userRoles: z.array(
        z.object({
            label: z.string(),
            value: z.string(),
        })
    ),
});
export type IOrganisationStaffFormValuesZS = z.infer<typeof OrganisationStaffFormValuesZS>;

function StaffModule() {
    const changeStatus = useUpdateStaffStatus();
    const deleteStaff = useDeleteStaff();

    const handleChangeStatus = (value: Pick<IOrganisationStaffZS, '_id' | 'status'>) => {
        changeStatus.mutate(value as any);
    };

    const handleDelete = async (row: IOrganisationStaffZS) => deleteStaff.mutateAsync(row as any);

    const { token } = theme.useToken();

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
                value: 'ACTIVE',
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
                value: 'INACTIVE',
            },
        ];
    }, [token]);

    return (
        <CrudModule<IOrganisationStaffFormValuesZS, IOrganisationStaffZS>
            entityName={'Staff'}
            useListQuery={useGetStaffList}
            addForm={AddStaffForm}
            editItemRow={EditStaffRow}
            handleDelete={handleDelete}
            // filters={SkillFilter}
            initialFilterValues={{}}
            // formatFilterValues={formatFilterValues}
            drawerSize={'large'}
            fullDrawerHeight
            listColumns={[
                {
                    title: 'Name',
                    dataIndex: 'profile',
                    key: 'profile',
                    width: 200,
                    ellipsis: true,
                    render: (text, record, index) => {
                        return record?.profile?.name?.first + ' ' + record?.profile?.name?.last;
                    },
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    // width: 180,
                    ellipsis: true,
                    filterDropdown: () => {
                        return (
                            <div
                                className={'p-2'}
                                style={{
                                    width: 200,
                                    // minHeight: 50,
                                }}
                            >
                                {/* <TextField xs name={'email'} label={'Search by Email'} /> */}
                                <ATextField name="email" preserveErrorSpace={false} placeholder="Search by email" />
                            </div>
                        );
                    },
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    width: 120,
                    render: (text, record, index) => {
                        return (
                            <AStatusDropdownButton<IOrganisationStaffZS>
                                options={staffStatusOptions}
                                onChange={(status) => {
                                    handleChangeStatus({ _id: record?._id, status });
                                }}
                                currentRow={record as IOrganisationStaffZS}
                            />
                        );
                        // return <StatusDropdownButton<IOrganisationStaffZS> options={skillStatusOption} onClick={handleChangeStatus} currentRow={record} />;
                    },
                    filterDropdown: () => {
                        return (
                            <div
                                className={'p-2'}
                                style={{
                                    width: 180,
                                }}
                            >
                                <ASelectField preserveErrorSpace={false} placeholder={'Filter by Status'} name={'status'} options={staffStatusOptions} />
                            </div>
                        );
                    },
                },
            ]}
        />
    );
}

export default StaffModule;
