import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

// Hook to manage sub-services
export const useSubServices = (serviceId) => {
    const queryClient = useQueryClient();

    // Get Sub-Services by Service ID
    const subServicesQuery = useQuery({
        queryKey: ['subservices', serviceId],
        queryFn: () => api.get(`/subservices?serviceId=${serviceId}`).then(res => res.data),
        enabled: !!serviceId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch sub-services');
        }
    });

    // Create Sub-Service
    const createSubService = useMutation({
        mutationFn: (data) => api.post('/subservices', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['subservices', serviceId]);
            toast.success('Sub-service created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create sub-service');
        }
    });

    // Update Sub-Service
    const updateSubService = useMutation({
        mutationFn: ({ id, data }) => api.put(`/subservices/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['subservices', serviceId]);
            toast.success('Sub-service updated successfully');
        },
        onError: (err) => {
            console.log(err)
            toast.error(err.message || 'Failed to update sub-service');
        }
    });

    // Delete Sub-Service
    const deleteSubService = useMutation({
        mutationFn: (id) => api.delete(`/subservices/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['subservices', serviceId]);
            toast.success('Sub-service deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete sub-service');
        }
    });

    return {
        subServicesQuery,
        createSubService,
        updateSubService,
        deleteSubService
    };
};
