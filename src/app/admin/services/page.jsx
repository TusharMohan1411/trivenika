'use client';

import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { useRouter } from 'next/navigation';
import { useServices } from '@/hooks/useServices';
import ServicesListView from './components/services list/ServicesList';
import NotAuthorizedPage from '@/components/notAuthorized';
import { useCategories } from '@/hooks/useCategories';

export default function Page() {
    const router = useRouter();
    const { categoriesQuery } = useCategories();
    const allCategories = categoriesQuery.data || [];

    const {
        servicesQuery,
        deleteService,
        permissions: { canView, canAdd, canDelete, canEdit },
    } = useServices();
    const {
        mutateAsync: deleteServiceAsync,
        isPending: isDeleting,
        error: deleteError,
    } = deleteService;

    // Use "all" as the default for category and status filters
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    if (!canView) return <NotAuthorizedPage />;

    const services = servicesQuery.data || [];

    const filtered = services.filter((svc) => {
        // 1) Category filtering
        if (categoryFilter !== 'all' && !svc.categories.includes(categoryFilter)) {
            return false;
        }
        // 2) Status filtering
        if (statusFilter === 'active' && !svc.status) return false;
        if (statusFilter === 'inactive' && svc.status) return false;
        return true;
    });

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Services</h1>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
                <div className='flex items-center gap-4'>
                    <Button variant="outline">Services: {filtered.length}</Button>

                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-44">
                            <SelectValue>
                                {categoryFilter === 'all'
                                    ? 'All Categories'
                                    : allCategories.find((c) => c._id === categoryFilter)?.name}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {allCategories.map((c) => (
                                <SelectItem key={c._id} value={c._id}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32">
                            <SelectValue>
                                {statusFilter === 'all'
                                    ? 'All Status'
                                    : statusFilter === 'active'
                                        ? 'Active'
                                        : 'Inactive'}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {canAdd && (
                    <Button onClick={() => router.push('/admin/services/add')}>
                        <CirclePlus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                )}
            </div>

            <ServicesListView
                error={servicesQuery.error}
                isLoading={servicesQuery.isLoading}
                services={filtered}
                onDelete={deleteServiceAsync}
                isDeleting={isDeleting}
                deleteError={deleteError}
                categories={allCategories}
                canDelete={canDelete}
                canEdit={canEdit}
            />
        </InnerDashboardLayout>
    );
}
