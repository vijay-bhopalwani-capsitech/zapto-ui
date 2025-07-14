import React, { useContext, useMemo, useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import swal from 'sweetalert';
// import { Offcanvas } from 'react-bootstrap';
import styled from 'styled-components';
import { subject } from '@casl/ability';
import { Button, Flex, Popconfirm, Row } from 'antd';
import { useModalState } from 'ui-helpers';
import { Drawer } from 'antd';
import { StyledDrawer } from '@/components/ui/partials/crud-module/index';
import { useSelector } from 'react-redux';
import { selectUserId } from '@/redux/slices/authSlice';
import { AButton } from 'ant-ui';

// export const StyledOffCanvas = styled(Offcanvas)`
//     top: auto !important;
//     margin: 20px;
//     border-radius: 5px;
//     box-shadow: 5px 5px 41px #bebebe, -5px -5px 41px #ffffff;
//     border: none !important;
// `;

export interface ICrudModuleRowActions<RowType> {
    row: RowType;
    deleteItem?: (row: RowType) => Promise<any>;
    editItemForm?: React.FunctionComponent<any>;
    entityName?: string;
    drawerSize?: 'default' | 'large';
    updateType?: string;
    fullDrawerHeight?: boolean;
}

function CrudModuleRowActions<RowType>({ row, deleteItem, editItemForm: EditItemForm, entityName = 'Item', drawerSize = 'default', updateType, fullDrawerHeight = false }: ICrudModuleRowActions<RowType>) {
    const [deleteLoading, setDeleteLoading] = useState(false);

    const userId = useSelector(selectUserId);
    // const userTeamId = useSelector(selectUserTeamId);

    const { isOpen: editItemSidebarOpen, handleClose: closeEditItemSidebar, handleOpen: openEditItemSidebar } = useModalState(false);
    // const ability = useContext(AbilityContext);
    // const canEditRow =
    //     ability.can('update', subject(entityName, { ...row } as Record<PropertyKey, any>)) ||
    //     ability.can(permissionTypes.UPDATE_OWN_TEAM, subject(entityName, { ...row } as Record<PropertyKey, any>)) ||
    //     ability.can(permissionTypes.UPDATE_OWN, subject(entityName, { ...row } as Record<PropertyKey, any>));

    const DrawerComponent = useMemo(() => {
        return fullDrawerHeight ? Drawer : StyledDrawer;
    }, [fullDrawerHeight]);

    const canEditRow = true;

    // @ts-ignore
    const userOwnsTheItem = row?.owner?._id === userId;
    // @ts-ignore
    // const userTeamOwnsTheItem = row?.team?._id === userTeamId;

    const handleDelete = async () => {
        if (deleteItem && row && typeof row === 'object' && '_id' in row) {
            setDeleteLoading(true);
            await deleteItem(row);
            setDeleteLoading(false);
        }
    };

    return (
        <div className={'flex crud-module'}>
            {deleteItem && (
                <Popconfirm onConfirm={handleDelete} title={`Are you sure ?`} description={`This action will delete this ${entityName}`}>
                    <Button size="small" type={'text'} className={'flex items-center'} danger>
                        <MdDeleteForever />
                    </Button>
                </Popconfirm>
            )}
            {!!EditItemForm && (
                <>
                    <Button size="small" type="text" onClick={openEditItemSidebar} className={'flex items-center text-secondary'} loading={false}>
                        <MdEdit />
                    </Button>
                    <DrawerComponent
                        size={drawerSize}
                        destroyOnClose
                        mask={false}
                        title={<>Edit {entityName}</>}
                        placement={'right'}
                        onClose={closeEditItemSidebar}
                        open={editItemSidebarOpen}
                        key={`add_${entityName}_sidebar`}
                    >
                        {/* @ts-ignore */}
                        <EditItemForm row={row} onSuccess={closeEditItemSidebar} />
                    </DrawerComponent>
                </>
            )}

            {/* {canEditRow && !!EditItemForm && (
                <AButton onClick={openEditItemSidebar} className={'btn-xs d-flex align-items-center text-secondary'} loading={false}>
                    <MdEdit />
                </AButton>
            )} */}

            {/* {canEditRow && !!EditItemForm && (
                <AButton onClick={openEditItemSidebar} disabled={!userOwnsTheItem} type={'text'} title={!userOwnsTheItem ? 'You can only edit you own items.' : `Edit ${entityName}`} icon={<MdEdit />} />
            )}

            {canEditRow && !!EditItemForm && (
                <AButton onClick={openEditItemSidebar} disabled={!userTeamOwnsTheItem} type={'text'} title={!userTeamOwnsTheItem ? 'You can only edit your own team\'s items.' : `Edit ${entityName}`} icon={<MdEdit />} />
            )}

            {canEditRow && !!EditItemForm && (
                <StyledDrawer size={drawerSize} destroyOnClose mask={false} title={<>Edit {entityName}</>} placement={'right'} onClose={closeEditItemSidebar} open={editItemSidebarOpen} key={`add_${entityName}_sidebar`}>
                    <EditItemForm row={row} onSuccess={closeEditItemSidebar} />
                </StyledDrawer>
            )} */}
        </div>
    );
}

export default CrudModuleRowActions;
