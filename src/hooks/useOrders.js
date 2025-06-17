"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useOrders = ({ status, type, page, pageSize }) => {
    const queryClient = useQueryClient()
    const { checkView, checkEdit, checkDelete, onlyAdmin } = usePermissions()

    // Permissions
    const canView = checkView(Resources.SERVICE_ORDERS)
    const canEdit = checkEdit(Resources.SERVICE_ORDERS)
    const canDelete = checkDelete(Resources.SERVICE_ORDERS)

    // Build query parameters correctly
    const buildQueryString = () => {
        const queryParams = [];

        // Fix: Send actual status value, not boolean
        if (status !== 'all') {
            queryParams.push(`status=${status}`);
        }

        if (type !== 'all') {
            queryParams.push(`type=${type}`);
        }

        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${pageSize}`);

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const ordersQuery = useQuery({
        queryKey: ['orders', status, page, pageSize, type],
        queryFn: async () => {
            if (!canView) {
                throw new Error('You do not have permission to view orders');
            }

            const queryString = buildQueryString();
            const response = await api.get(`/orders${queryString}`);
            return response;
        },
        enabled: canView, // Only run query if user has permission
        staleTime: 1000 * 10, // 5 minutes
        retry: 2,
        onError: (err) => {
            console.error('Orders fetch error:', err);
            toast.error(err.message || 'Failed to fetch orders');
        },
    });

    const updateOrder = useMutation({
        mutationFn: ({ id, status: newStatus }) => {
            return api.patch(`/orders/${id}`, {
                id,
                ...(newStatus !== undefined ? { status: newStatus } : {}),
            });
        },
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
            toast.success('Enquiry updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update orders');
        },
    });

    const deleteOrder = useMutation({
        mutationFn: (id) => {
            return api.delete(`/orders/${id}`);
        },
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
            toast.success('Order deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete order');
        },
    });

    return {
        ordersQuery,
        updateOrder,
        deleteOrder,
        permissions: {
            canView,
            canDelete,
            canEdit,
            onlyAdmin
        }
    };
};
