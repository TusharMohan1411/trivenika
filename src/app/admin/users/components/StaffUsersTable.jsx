// StaffUsersTable.jsx (for Admin/Sub-Admin)
'use client'
import React, { useState } from 'react'
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import Loader from '@/components/Loader'
import DeleteConfirmationDialog from './DeleteConfirmationDialog '
import TableSkeleton from '@/components/custom/TableSkeleton'
// import DeleteConfirmationDialog from './DeleteConfirmationDialog'

export default function StaffUsersTable({
    isLoading,
    error,
    users = [],
    page,
    pageCount,
    onPageChange,
    onEdit,
    onDelete,
    isDeleting,
    deleteError,
    canDelete,
    canEdit,
}) {
    const [deletingUserId, setDeletingUserId] = useState(null)

    const handleDeleteClick = (userId) => {
        setDeletingUserId(userId)
    }

    const handleDeleteConfirm = async () => {
        await onDelete(deletingUserId)
        setDeletingUserId(null)
    }

    if (isLoading) return <TableSkeleton
        rows={5}
        columns={4}
        showHeader={false}
        showPagination={true}
    />
    if (error) return <div className="text-red-600 p-4">Error: {error.message || error}</div>
    if (users.length === 0) return <div className="text-center text-gray-500 p-4">No staff members found!</div>

    return (
        <section className="space-y-4">
            <div className="overflow-hidden rounded-md border border-gray-200">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>S. No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, idx) => (
                            <TableRow key={user._id}>
                                <TableCell>{(page - 1) * users.length + idx + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {new Date(user.createdAt).toDateString()}
                                </TableCell>
                                <TableCell className="flex justify-center gap-2">
                                    {canEdit && (
                                        <Button size="icon" variant="outline" onClick={() => onEdit(user)}>
                                            <Pencil size={16} />
                                        </Button>
                                    )}
                                    {canDelete && (
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleDeleteClick(user._id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash size={16} />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-muted-foreground">
                    Page {page} of {pageCount}
                </p>
                <div className="space-x-2">
                    <Button
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        disabled={page >= pageCount}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Delete Confirmation */}
            <DeleteConfirmationDialog
                isOpen={!!deletingUserId}
                onOpenChange={(open) => !open && setDeletingUserId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete User"
                description="Are you sure you want to delete this user?"
            />
            {/* Pagination and DeleteConfirmationDialog same as before */}
        </section>
    )
}