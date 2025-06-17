"use client"
import React, { useMemo, useState } from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import NotAuthorizedPage from '@/components/notAuthorized';
import { useOrders } from '@/hooks/useOrders';
import CallOrdersTable from './components/CallOrdersTable';

function page() {
    // filters
    const [status, setStatus] = useState('all');
    const [type, setType] = useState('call')

    // pagination
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        ordersQuery,
        deleteOrder,
        updateOrder,
        permissions: { canView, canEdit, canDelete, onlyAdmin }
    } = useOrders({ status, page, pageSize, type })

    // Memoize expensive computations
    const ordersData = useMemo(() => {
        return ordersQuery?.data?.data || [];
    }, [ordersQuery?.data?.data]);

    const totalCount = useMemo(() => {
        return ordersQuery?.data?.totalCount || 0;
    }, [ordersQuery.data]);

    const pageCount = Math.ceil(totalCount / pageSize)

    if (!canView) {
        return (
            <NotAuthorizedPage />
        );
    }
    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Call Orders</h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Status Select */}
                <div className="flex items-center space-x-2">
                    <Select value={status} onValueChange={(value) => { setStatus(value); setPage(1); }}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Page size selector */}
                <Select
                    value={pageSize.toString()}
                    onValueChange={(v) => {
                        setPageSize(+v)
                        setPage(1)
                    }}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                        {[1, 2, 5, 10, 25, 50, 100].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                                {n} / page
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {type === 'call' &&
                <CallOrdersTable
                    orders={ordersData}
                    isLoading={ordersQuery.isPending}
                    error={ordersQuery.error}
                    page={page}
                    pageCount={pageCount}
                    onPageChange={setPage}
                    onDelete={deleteOrder.mutateAsync}
                    isDeleting={deleteOrder.isPending}
                    deleteError={deleteOrder.error}
                    canEdit={canEdit}
                    onlyAdmin={onlyAdmin}
                    onChangeStatus={(id, newStatus) =>
                        updateOrder.mutate({ id, status: newStatus })
                    }
                />
            }
        </InnerDashboardLayout>
    )
}

export default page