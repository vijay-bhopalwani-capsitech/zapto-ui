import React, { ReactElement, useContext, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { Drawer, DrawerProps, Spin, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { AnyObject } from 'antd/lib/_util/type';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { LoadingOutlined } from '@ant-design/icons';

// import { AutoSaveForm } from 'ant-ui';
// import { useDebounce, useModalState } from 'ui-helpers';
// import { AButton, ACard, ATextField } from 'ant-ui';

import CrudModuleRowActions from './CrudRowActions';
import { ListPagination } from '@/components/ui/partials/ListPagination';

// import { AbilityContext } from '@/components/ui/ability';

import { selectConfigSize, selectMultiTaskingEnabled } from '@/redux/slices/appConfigSlice';
import { AppDispatch } from '@/redux/store';
import { windowCreated } from '@/redux/slices/formWindowsSlice.ts';
// import { permissionTypes } from '@/config/permission';
import { DrawerPanelProps } from 'antd/lib/drawer/DrawerPanel';
import { RowSelectMethod } from 'antd/lib/table/interface';
import { useDebounce, useModalState } from '../../../../../packages/ui-helpers';
import { ACard, ATextField, AutoSaveForm } from '../../../../../packages/ant-ui';
import { AButton } from '../../../../../packages/ant-ui/buttons';

const defaultStatusOptions = [
    {
        label: 'ALL',
        value: 'ALL',
    },
    {
        label: 'Active',
        value: 'ACTIVE',
    },
    {
        label: 'Inactive',
        value: 'INACTIVE',
    },
];

export interface IAddFormProps {
    onSuccess: () => void;
}

export interface IEditFormProps<Item> {
    onSuccess: () => void;
    row: Item;
}

export interface ICrudModuleProps<FormType, RowType> {
    entityName?: string;
    permissionModelName?: string;
    listColumns: ColumnType<AnyObject>[];
    useListQuery: any;
    handleDelete?: (row: RowType) => Promise<any>;
    editItemRow?: (props: IEditFormProps<RowType>) => JSX.Element;
    addForm?: React.FunctionComponent<IAddFormProps>;
    filters?: JSX.Element;
    formatFilterValues?: (values: any) => any;
    initialFilterValues?: any;
    drawerSize?: 'default' | 'large';
    tableBodyHeight?: string;
    hideSearchInput?: boolean;
    cardTitle?: string;
    cardExtraComponent?: ReactElement;
    addDrawerProps?: DrawerProps & Omit<DrawerPanelProps, 'prefixCls'>;
    allowRowSelection?: boolean;
    rowSelectionType?: 'checkbox' | 'radio';
    selectedRowKeys?: React.Key[];
    onSelectChange?: (selectedRowKeys: React.Key[], selectedRows: AnyObject[], info: { type: RowSelectMethod }) => void;
    fullDrawerHeight?: boolean;
}

export const StyledDrawer: typeof Drawer = styled(Drawer)`
    .ant-drawer-header {
        padding: ${(props) => props.theme.paddingXXS}px;
    }

    .ant-drawer-body {
        padding: ${(props) => props.theme.paddingSM}px;
        max-height: calc(100vh - 90px);
    }

    border-radius: ${(props) => props.theme.borderRadiusSM}px;
`;

StyledDrawer.defaultProps = {
    contentWrapperStyle: {
        top: 'auto',
        margin: 10,
    },
};

export const StyledTable: typeof Table = styled(Table)`
    .ant-table-body {
        overflow: auto !important;
    }
`;

export function CrudModule<FormType, RowType>({
    entityName = 'Item',
    permissionModelName,
    listColumns,
    useListQuery,
    handleDelete,
    editItemRow: EditItemRow,
    addForm: AddForm,
    formatFilterValues,
    initialFilterValues = {},
    drawerSize = 'default',
    tableBodyHeight = 'calc(100vh - 300px)',
    hideSearchInput = false,
    addDrawerProps = {},
    rowSelectionType = 'checkbox',
    allowRowSelection = false,
    selectedRowKeys = [],
    onSelectChange,
    cardTitle = '',
    cardExtraComponent,
    fullDrawerHeight = false,
}: ICrudModuleProps<FormType, RowType>) {
    const dispatch = useDispatch<AppDispatch>();
    // const ability = useContext(AbilityContext);
    const [page, setPage] = useState<number>(1);

    const [limit, setLimit] = useState({
        label: '15',
        value: 15,
    });

    const [submitFilter, setSubmitFilter] = useState(initialFilterValues);
    const debouncedSubmitFilter = useDebounce(submitFilter, 500);

    const rowSelection = allowRowSelection
        ? {
              selectedRowKeys,
              type: rowSelectionType,
              onChange: onSelectChange,
              hideSelectAll: true,
              preserveSelectedRowKeys: true,
          }
        : undefined;

    const { isOpen: addItemSidebarOpen, handleClose: closeAddItemSidebar, handleOpen: openAddItemSidebar } = useModalState(false);

    const abilityModelName = permissionModelName ? permissionModelName : entityName;
    const size = useSelector(selectConfigSize);
    // const canUpdate = !ability || ability?.can?.(permissionTypes.UPDATE, abilityModelName) || ability?.can?.(permissionTypes.UPDATE_OWN_TEAM, abilityModelName) || ability?.can?.(permissionTypes.UPDATE_OWN, abilityModelName);
    // const updateType = useMemo(() => {
    //     if (ability?.can?.(permissionTypes.UPDATE, abilityModelName)) {
    //         return permissionTypes.UPDATE;
    //     }
    //     if (ability?.can?.(permissionTypes.UPDATE_OWN_TEAM, abilityModelName)) {
    //         return permissionTypes.UPDATE_OWN_TEAM;
    //     }
    //     if (ability?.can?.(permissionTypes.UPDATE_OWN, abilityModelName)) {
    //         return permissionTypes.UPDATE_OWN;
    //     }
    // }, [abilityModelName, ability]);
    // const canCreate = !ability || ability?.can?.(permissionTypes.CREATE, abilityModelName);
    // const canRead = !ability || ability?.can?.(permissionTypes.READ, abilityModelName) || ability?.can?.(permissionTypes.READ_OWN_TEAM, abilityModelName) || ability?.can?.(permissionTypes.READ_OWN, abilityModelName);

    const multiWindowEnabled = useSelector(selectMultiTaskingEnabled);

    const handleAddClick = () => {
        if (multiWindowEnabled) {
            dispatch(
                windowCreated({
                    title: 'Add ' + entityName,
                    formType: 'Add' + entityName + 'Form',
                    values: {},
                })
            );
        } else {
            openAddItemSidebar();
        }
    };

    const actions: ColumnType<AnyObject>[] = useMemo(() => {
        const actions = [];
        if (!!handleDelete || !!EditItemRow) {
            actions.push({
                title: 'Actions',
                dataIndex: '_id',
                key: '_id',
                fixed: 'right',
                width: 70,
                align: 'center',
                render: (text: string, record: any) => {
                    return (
                        <CrudModuleRowActions<RowType>
                            drawerSize={drawerSize}
                            fullDrawerHeight={fullDrawerHeight}
                            updateType={'UPDATE'}
                            deleteItem={handleDelete}
                            key={record._id!}
                            row={record}
                            editItemForm={EditItemRow}
                            entityName={entityName}
                        />
                    );
                },
            } as ColumnType<AnyObject>);
        }
        return actions;
    }, []);

    const { data, isFetching, isInitialLoading, isLoading } = useListQuery({
        page,
        search: debouncedSubmitFilter?.search ?? '',
        limit: limit?.value ?? 20,
        filter: debouncedSubmitFilter,
    });

    // if (!canRead) {
    //     return <h3>You are not authorised to access this module.</h3>;
    // }

    const DrawerComponent = useMemo(() => {
        return fullDrawerHeight ? Drawer : StyledDrawer;
    }, [fullDrawerHeight]);

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialFilterValues}
                onSubmit={async (values) => {
                    let payload = cloneDeep(values);
                    if (formatFilterValues) {
                        payload = formatFilterValues(cloneDeep(payload));
                    }
                    console.log('values', payload);
                    setSubmitFilter(payload);
                    setPage(1);
                    // setSkillFilter(values.type?.value)
                }}
            >
                <ACard title={cardTitle} extra={cardExtraComponent}>
                    <Row>
                        <Col xs={24} className={''}>
                            <Row className="mb-1" justify={'space-between'}>
                                <Col xs={12} md={12} lg={19}>
                                    <div className="d-flex justify-content-start">
                                        {!!AddForm && (
                                            <AButton accessKey={'a'} type={'primary'} onClick={handleAddClick}>
                                                + &nbsp; {entityName}
                                            </AButton>
                                        )}
                                    </div>
                                </Col>
                                <Col md={12} lg={5}>
                                    {hideSearchInput || (
                                        <Row className={'justify-content-end'}>
                                            <Col xs={12} md={24}>
                                                <ATextField
                                                    preserveErrorSpace={false}
                                                    name={'search'}
                                                    placeholder={'Search'}
                                                    suffix={isFetching || isLoading ? <Spin size="small" indicator={<LoadingOutlined spin />} /> : <AiOutlineSearch />}
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={24}>
                            <AutoSaveForm debounceMs={300} />
                            <Spin tip="Loading" spinning={isInitialLoading || isFetching}>
                                <StyledTable
                                    sticky
                                    // bordered
                                    scroll={{
                                        x: '100%',
                                        y: tableBodyHeight,
                                    }}
                                    pagination={false}
                                    size={size.replaceAll('medium', 'middle')}
                                    dataSource={data?.results ?? []}
                                    columns={[...listColumns, ...actions]}
                                    // tableLayout={'auto'}
                                    rowSelection={rowSelection}
                                    rowKey={'_id'}
                                />
                            </Spin>
                        </Col>
                        <Col lg={24}>
                            <ListPagination
                                limit={limit}
                                setLimit={setLimit}
                                compact={true}
                                currentPage={page}
                                setCurrentPage={setPage}
                                totalPages={typeof data !== 'undefined' && 'totalPages' in data ? (data.totalPages as number) : 0}
                                fromTo={typeof data !== 'undefined' && 'fromTo' in data ? (data.fromTo as any) : undefined}
                                totalResults={typeof data !== 'undefined' && 'totalResults' in data ? (data.totalResults as number) : 0}
                            />
                        </Col>
                    </Row>
                </ACard>
            </Formik>
            {!!AddForm && (
                <DrawerComponent
                    size={drawerSize}
                    destroyOnClose
                    mask={false}
                    className="asdsa"
                    title={<>Add {entityName}</>}
                    placement={'right'}
                    onClose={closeAddItemSidebar}
                    open={addItemSidebarOpen}
                    key={`add_${entityName}_sidebar`}
                    {...addDrawerProps}
                >
                    {/*@ts-ignore*/}
                    <AddForm onSuccess={closeAddItemSidebar} />
                </DrawerComponent>
            )}
        </>
    );
}

// export default CrudModule;
