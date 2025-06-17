'use client'

import React, { useState } from 'react'
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash, Phone, Eye } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import Loader from '@/components/Loader'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { format } from 'date-fns'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog '
import TableSkeleton from '@/components/custom/TableSkeleton'

function CallOrdersTable({
    orders,
    isLoading,
    error,
    page,
    pageCount,
    onPageChange,
    onDelete,
    isDeleting,
    deleteError,
    canEdit,
    onlyAdmin,
    onChangeStatus
}) {
    const [deletingOrderId, setDeletingOrderId] = useState(null)
    const [viewingOrder, setViewingOrder] = useState(null)

    const handleDeleteClick = (orderId) => {
        setDeletingOrderId(orderId)
    }

    const handleDeleteConfirm = async () => {
        await onDelete(deletingOrderId)
        setDeletingOrderId(null)
    }

    const handleViewOrder = (order) => {
        setViewingOrder(order)
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

    return (
        <section className="space-y-4">
            {/* Data Table */}
            <div className="overflow-hidden rounded-md border border-gray-200 shadow-md">
                <Table className={'bg-white'}>
                    <TableHeader className={'bg-gray-200'}>
                        <TableRow>
                            <TableHead className={'font-semibold text-center'}>#</TableHead>
                            <TableHead className={'font-semibold'}>Caller</TableHead>
                            <TableHead className={'font-semibold'}>Call Plan</TableHead>
                            <TableHead className={'font-semibold'}>Duration</TableHead>
                            <TableHead className={'font-semibold'}>Booked On</TableHead>
                            <TableHead className={'font-semibold'}>Amount</TableHead>
                            <TableHead className={'font-semibold'}>Status</TableHead>
                            <TableHead className={'font-semibold text-center'}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((item, idx) => (
                            <TableRow key={item._id}>
                                <TableCell className={'text-center'}>{(page - 1) * orders.length + idx + 1}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.details?.name}</span>
                                        <span className="text-sm text-gray-500">{item.details?.phone}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{item.callPlan?.name || 'Expert Consultation'}</TableCell>
                                <TableCell>{item.callPlan?.time || '15 mins'}</TableCell>
                                <TableCell>
                                    {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                                </TableCell>
                                <TableCell>₹{item.amount}</TableCell>
                                <TableCell>
                                    <span className={
                                        item.status === 'active'
                                            ? 'bg-blue-200 text-blue-600 rounded-full px-3 capitalize text-xs py-1'
                                            : 'bg-green-200 text-green-600 rounded-full px-3 capitalize text-xs py-1'
                                    }>
                                        {item.status}
                                    </span>
                                </TableCell>
                                <TableCell className="flex gap-2 items-center justify-center">
                                    {/* View Button */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => handleViewOrder(item)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>

                                        {viewingOrder && viewingOrder._id === item._id && (
                                            <CallOrderDetailsDialog order={item} />
                                        )}
                                    </Dialog>

                                    {/* Status Change */}
                                    {canEdit && (
                                        <Select
                                            value={item.status}
                                            onValueChange={(newValue) => onChangeStatus(item._id, newValue)}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {/* Delete Button */}
                                    {onlyAdmin && (
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleDeleteClick(item._id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash className="h-4 w-4" />
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
                isOpen={!!deletingOrderId}
                onOpenChange={(open) => !open && setDeletingOrderId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Call Order"
                description="Are you sure you want to delete this call consultation order?"
            />
        </section>
    )
}

// Call Order Details Dialog Component
function CallOrderDetailsDialog({ order }) {
    // Field label mapping for better display
    const fieldLabels = {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message'
    };

    return (
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    Call Order Details
                </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
                {/* Order Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order ID:</span>
                                <span className="font-medium">#{order._id.slice(-8)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Call Plan:</span>
                                <span className="font-medium">{order.callPlan?.name || 'Expert Consultation'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-medium">{order.callPlan?.time || '15 mins'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Status & Payment</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'active'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'paid'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-orange-100 text-orange-800'
                                    }`}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-medium">₹{order.amount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Caller Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Caller Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {order.details && Object.entries(order.details).map(([key, value]) => (
                            <div key={key} className="bg-white p-3 rounded-md border">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">
                                    {fieldLabels[key] || key}
                                </p>
                                <p className="font-medium mt-1">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call Plan Instructions */}
                {order.callPlan?.instructions?.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-3">Call Instructions</h3>
                        <ul className="space-y-2 bg-white p-3 rounded-md border">
                            {order.callPlan.instructions.map((instruction, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                                    <p className="text-gray-700">{instruction}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Created At</p>
                        <p className="font-medium">
                            {format(new Date(order.createdAt), 'MMM dd, yyyy - hh:mm a')}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Last Updated</p>
                        <p className="font-medium">
                            {format(new Date(order.updatedAt), 'MMM dd, yyyy - hh:mm a')}
                        </p>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default CallOrdersTable