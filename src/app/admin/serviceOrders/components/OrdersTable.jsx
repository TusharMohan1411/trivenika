'use client'

import React, { useState } from 'react'
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, MoreHorizontal } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TableSkeleton from '@/components/custom/TableSkeleton'
import { format } from 'date-fns'
import OrderDetailsDialog from './OrdersDialog'
import UpdateStatusDialog from './UpdateStatusDialog'
import StatusHistorySheet from './StatusHistorySheet'
import UpdatePaymentStatus from './UpdatePaymentStatus'

function OrdersTable({
    orders,
    isLoading,
    error,
    page,
    pageCount,
    onPageChange,
    updateOrder
}) {
    const [selectedColumns, setSelectedColumns] = useState([
        'name', 'contact', 'products', 'paymentMethod', 'paymentStatus', 'amount', 'status', 'type', 'createdAt', 'actions'
    ])
    const [viewOrderDialog, setViewOrderDialog] = useState(false)
    const [viewingOrder, setViewingOrder] = useState(null)

    const [updateStatusDialog, setUpdateStatusDialog] = useState(false)
    const [updatePaymentStatusDialog, setUpdatePaymentStatusDialog] = useState(false)

    const [statusHistorySheet, setStatusHistorySheet] = useState(false)


    if (isLoading) {
        return <TableSkeleton
            rows={5}
            columns={10}
            showHeader={true}
            showPagination={true}
        />
    }

    if (error) return <p className='text-red-600'>Error: {error}</p>

    return (
        <section className="space-y-4">
            {/* Table */}
            <div className="overflow-hidden rounded-md border border-gray-200 shadow-md">
                <Table className={'bg-white'}>
                    <TableHeader className={'bg-gray-100'}>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className='text-center'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order, idx) => {
                            const lastStatus = order.status?.[order.status.length - 1]?.currentStatus || 'N/A';
                            return (
                                <TableRow key={order._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{order.shippingDetails?.fullName}</TableCell>
                                    <TableCell>{order.shippingDetails?.contact}</TableCell>
                                    <TableCell>
                                        <div className='max-w-xs text-wrap'>
                                            {order.cart.map((item) => `${item.serviceName} (${item.variantName})`).join(', ')}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className='capitalize'>{order.paymentMethod}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className='capitalize'>{order.paymentStatus}</Badge>
                                    </TableCell>
                                    <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className='capitalize'>{lastStatus}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className='capitalize'>{order.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div>{format(new Date(order.createdAt), 'dd MMM yyyy')}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {format(new Date(order.createdAt), 'hh:mm a')}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setViewingOrder(order);
                                                        setTimeout(() => setViewOrderDialog(true), 100);
                                                    }}
                                                > View</DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setViewingOrder(order);
                                                        setTimeout(() => setUpdateStatusDialog(true), 100);
                                                    }}
                                                >Update Status</DropdownMenuItem>
                                                {/* payment status update */}
                                                {order.paymentStatus !== 'paid' &&
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setViewingOrder(order);
                                                            setTimeout(() => setUpdatePaymentStatusDialog(true), 100);
                                                        }}
                                                    >Update Payment Status</DropdownMenuItem>
                                                }
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setViewingOrder(order)
                                                        setTimeout(() => setStatusHistorySheet(true), 100)
                                                    }}
                                                >
                                                    View Status History</DropdownMenuItem>
                                                <DropdownMenuItem>Download GST Bill</DropdownMenuItem>
                                                <DropdownMenuItem className='text-red-500'>Delete Order</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
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

            <OrderDetailsDialog
                open={viewOrderDialog}
                onOpenChange={setViewOrderDialog}
                order={viewingOrder}
            />

            <UpdateStatusDialog
                open={updateStatusDialog}
                onOpenChange={setUpdateStatusDialog}
                order={viewingOrder}
                updateOrder={updateOrder}
            />

            <UpdatePaymentStatus
                open={updatePaymentStatusDialog}
                onOpenChange={setUpdatePaymentStatusDialog}
                order={viewingOrder}
            />

            <StatusHistorySheet
                open={statusHistorySheet}
                onOpenChange={setStatusHistorySheet}
                order={viewingOrder}
            />

        </section>
    )
}

export default OrdersTable
