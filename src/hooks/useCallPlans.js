import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';

export const useCallPlans = () => {
    const queryClient = useQueryClient()
    const { checkView, checkAdd, checkEdit, checkDelete } = usePermissions()

    // Permissions
    const canView = checkView(Resources.CALL_PLANS)
    const canAdd = checkAdd(Resources.CALL_PLANS)
    const canEdit = checkEdit(Resources.CALL_PLANS)
    const canDelete = checkDelete(Resources.CALL_PLANS)

    // Get all Categories
    const callPlansQuery = useQuery({
        queryKey: ['callPlans'],
        enabled: canView,
        queryFn: () => api.get('/call-plans').then(res => res.data),
        staleTime: 1000 * 60 * 5,
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch callPlans');
        }
    });

    // Create CallPlan mutation
    const createCallPlan = useMutation({
        mutationFn: ({ data }) => api.post('/call-plans', data),
        enabled: canAdd,
        onSuccess: () => {
            queryClient.invalidateQueries(['callPlans']);
            toast.success('CallPlan created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create category');
        }
    });

    // Update CallPlan mutation
    const updateCallPlan = useMutation({
        mutationFn: ({ id, data }) => api.put(`/call-plans/${id}`, data),
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['callPlans']);
            toast.success('CallPlan updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update CallPlan');
        }
    });

    // Delete CallPlan mutation
    const deleteCallPlan = useMutation({
        mutationFn: (id) => api.delete(`/call-plans/${id}`),
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['callPlans']);
            toast.success('CallPlan deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete CallPlan');
        }
    });

    return {
        callPlansQuery, deleteCallPlan, updateCallPlan, createCallPlan,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
        }
    };
};
