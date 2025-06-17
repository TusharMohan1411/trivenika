'use client'

import React, { useState } from 'react'
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog '
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import Loader from '@/components/Loader'
import OrderDetailsDialog from './OrdersDialog'
import TableSkeleton from '@/components/custom/TableSkeleton'

function OrdersTable({
    orders,
    isLoading,
    error,
    page,
    pageCount,
    onPageChange,
    onDelete,
    isDeleting,
    deleteError,
    canDelete,
    canEdit,
    onlyAdmin,
    onChangeStatus
}) {
    console.log(orders)

    const [deletingOrderId, setDeletingOrderId] = useState(null)

    const handleDeleteClick = (userId) => {
        setDeletingOrderId(userId)
    }
    const handleDeleteConfirm = async () => {
        await onDelete(deletingOrderId)
        setDeletingOrderId(null)
    }

    if (isLoading) {
        return <TableSkeleton
            rows={5}
            columns={4}
            showHeader={false}
            showPagination={true}
        />
    }

    if (error) return <p className='text-red-600'>Error: {error}</p>

    console.log(orders)

    return (
        <section className="space-y-4">
            {/* Data Table */}
            <div className="overflow-hidden rounded-md border border-gray-200 shadow-md">
                <Table className={'bg-white'}>
                    <TableHeader className={'bg-gray-200'}>
                        <TableRow className={''}>
                            <TableHead className={'font-semibold  text-center'}>#</TableHead>
                            <TableHead className={'font-semibold '}>User</TableHead>
                            <TableHead className={'font-semibold '}>Service</TableHead>
                            <TableHead className={'font-semibold '}>Sub Service</TableHead>
                            <TableHead className={'font-semibold '}>Booked On</TableHead>
                            <TableHead className={'font-semibold '}>Amount</TableHead>
                            <TableHead className={'font-semibold '}>Status</TableHead>
                            <TableHead className={'font-semibold text-center'}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((item, idx) => (
                            <TableRow key={item._id}>
                                <TableCell className={' text-center'}>{(page - 1) * orders.length + idx + 1}</TableCell>
                                <TableCell>{item.user?.phone}</TableCell>
                                <TableCell>{item.service?.name}</TableCell>
                                <TableCell>{item.subService?.name}</TableCell>
                                <TableCell>
                                    {new Date(item.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>
                                    <span
                                        className={
                                            item.status === 'active'
                                                ? 'bg-blue-200 text-blue-600 rounded-full px-3 capitalize text-xs py-1'
                                                : 'bg-green-200 text-green-600 rounded-full px-3 capitalize text-xs py-1'
                                        }
                                    >
                                        {item.status}
                                    </span>
                                </TableCell>
                                <TableCell className="flex gap-2 items-center justify-center">
                                    <OrderDetailsDialog order={item} />
                                    {canEdit &&
                                        <Select
                                            value={item.status}
                                            onValueChange={(newValue) => onChangeStatus(item._id, newValue)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    }
                                    {onlyAdmin &&
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleDeleteClick(item._id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash />
                                        </Button>
                                    }
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
                isOpen={!!deletingOrderId}
                onOpenChange={(open) => !open && setDeletingOrderId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Order"
                description="Are you sure you want to delete this Order?"
            />
        </section >
    )
}

export default OrdersTable