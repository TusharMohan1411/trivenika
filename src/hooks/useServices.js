import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Resources } from '@/lib/permissions';
import { usePermissions } from './usePermissions';
import { useRouter } from 'next/navigation';

// Hook to manage Services
export const useServices = () => {
    const router = useRouter();
    const queryClient = useQueryClient()
    const { checkView, checkAdd, checkEdit, checkDelete, onlyAdmin } = usePermissions()

    // Permissions
    const canView = checkView(Resources.SERVICES)
    const canAdd = checkAdd(Resources.SERVICES)
    const canEdit = checkEdit(Resources.SERVICES)
    const canDelete = checkDelete(Resources.SERVICES)

    // Get all Services
    const servicesQuery = useQuery({
        queryKey: ['services'],
        queryFn: () => api.get('/services').then(res => res.data),
        enabled: canView,
        staleTime: 1000 * 60 * 5,
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch services');
        }
    });

    //  Get single Service by slug
    const getServiceQuery = (id) => useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await api.get(`/services/${id}`);
            const data = res.data;

            if (!data || data.message === 'Service not found') {
                throw new Error('Service not found');
            }

            return data;
        },
        enabled: !!id && canView,
        staleTime: 1000 * 60 * 5,
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch service');
        }
    });

    // Create Service
    const createService = useMutation({
        mutationFn: (data) => api.post('/services', data),
        enabled: canAdd,
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Service created successfully');
            router.push('/admin/services')
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create service');
        }
    });

    // Update Service
    const updateService = useMutation({
        mutationFn: ({ id, data }) => api.put(`/services/${id}`, data),
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Service updated successfully');
            router.push('/admin/services')
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update service');
        }
    });

    // Delete Service
    const deleteService = useMutation({
        mutationFn: (id) => api.delete(`/services/${id}`),
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Service deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete service');
        }
    });

    return {
        servicesQuery,
        getServiceQuery,
        createService,
        updateService,
        deleteService,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
            onlyAdmin
        }
    };
};
