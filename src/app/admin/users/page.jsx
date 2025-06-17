"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Button } from '@/components/ui/button'
import { useUsers } from '@/hooks/useUsers';
import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react'
import UsersListView from './components/UsersListView';
import UserDialog from './components/UserDialog';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import RegularUsersTable from './components/RegularUsersTable';
import StaffUsersTable from './components/StaffUsersTable';
import NotAuthorizedPage from '@/components/notAuthorized';

function page() {
    const [roleFilter, setRoleFilter] = useState('user')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // fetch users query
    const {
        usersQuery,
        createUser,
        updateUser,
        deleteUser,
        changePassword,
        permissions: {
            canView,
            canAdd,
            canDelete,
            canEdit,
            onlyAdmin }
    } = useUsers({ role: roleFilter, page, pageSize });

    // destructure createUser mutation
    const {
        mutateAsync: createUserAsync,
        isPending: isCreating,
        error: createError,
        reset: resetCreate,
    } = createUser;

    // destructure updateUser mutation
    const {
        mutateAsync: updateUserAsync,
        isPending: isUpdating,
        error: updateError,
        reset: resetUpdate,
    } = updateUser;

    // destructure deleteUser mutation
    const {
        mutateAsync: deleteUserAsync,
        isPending: isDeleting,
        error: deleteError,
        reset: resetDelete,
    } = deleteUser;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    // open dialog to add new tag
    const handleAddClick = () => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedUser(undefined);
        setIsDialogOpen(true);
    };

    // open dialog to edit
    const handleEditClick = (tag) => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedUser(tag);
        setIsDialogOpen(true);
    };

    if (!canView) return <NotAuthorizedPage />

    return (
        <div>
            <InnerDashboardLayout>
                <div className='w-full flex items-center text-primary'>
                    <h1 className='font-bold sm:text-2xl lg:text-4xl w-full'>Users</h1>
                </div>

                <div className="flex justify-between items-center mb-4 mt-4">
                    <div className='flex gap-3'>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {onlyAdmin &&
                                    <>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="sub-admin">Sub-Admin</SelectItem>
                                    </>
                                }
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={pageSize.toString()} onValueChange={v => { setPageSize(+v); setPage(1) }}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Rows" />
                            </SelectTrigger>
                            <SelectContent>
                                {[1, 2, 5, 10, 25, 50, 100].map(n => (
                                    <SelectItem key={n} value={n.toString()}>{n} / page</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {canAdd &&
                        <Button onClick={handleAddClick}>
                            <CirclePlus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    }

                </div>

                {canView && (
                    <>
                        {/* For Admin/Sub-Admin */}
                        {roleFilter !== 'user' && (
                            <StaffUsersTable
                                isLoading={usersQuery.isLoading}
                                error={usersQuery.error}
                                users={usersQuery.data?.data || []}
                                page={page}
                                pageCount={Math.ceil((usersQuery.data?.totalCount || 0) / pageSize)}
                                onPageChange={setPage}
                                onEdit={handleEditClick}
                                onDelete={deleteUser.mutateAsync}
                                isDeleting={deleteUser.isPending}
                                deleteError={deleteUser.error}
                                canEdit={canEdit}
                                canDelete={canDelete}
                            />
                        )}

                        {/* For Regular Users */}
                        {roleFilter === 'user' && (
                            <RegularUsersTable
                                isLoading={usersQuery.isLoading}
                                error={usersQuery.error}
                                users={usersQuery.data?.data || []}
                                page={page}
                                pageCount={Math.ceil((usersQuery.data?.totalCount || 0) / pageSize)}
                                onPageChange={setPage}
                                onEdit={handleEditClick}
                                onDelete={deleteUser.mutateAsync}
                                isDeleting={deleteUser.isPending}
                                deleteError={deleteUser.error}
                                canEdit={canEdit}
                                canDelete={canDelete}
                            />
                        )}
                    </>
                )}

                <UserDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    selectedUser={selectedUser}
                    onCreate={createUserAsync}
                    onUpdate={updateUserAsync}
                    isSubmitting={isCreating || isUpdating}
                    error={createError?.message || updateError?.message}
                    changePassword={changePassword}
                    onlyAdmin={onlyAdmin}
                    canEdit={canEdit}
                />

            </InnerDashboardLayout>
        </div>
    )
}

export default page
