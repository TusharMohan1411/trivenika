// admin/services/[id]/edit
'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import { useServices } from '@/hooks/useServices';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import NotAuthorizedPage from '@/components/notAuthorized';
import ServiceCard from './components/SerivceCard';
import ServiceHeader from './components/ServiceHeader';
import TabbedDocuments from './components/SubServices';
import { Button } from '@/components/ui/button';
import AddSubServiceDialog from './components/AddSubServiceDialog';
import { useSubServices } from '@/hooks/useSubServices';
import { Separator } from '@/components/ui/separator';
import Loader from '@/components/Loader';

const ViewServicePage = () => {
    const router = useRouter()
    const params = useParams();
    const id = params.id;
    const { updateService, getServiceQuery, permissions: { canEdit, canView } } = useServices()
    const { data: service, isLoading, error } = getServiceQuery(id);

    const { subServicesQuery, createSubService, updateSubService, deleteSubService } = useSubServices()

    const {
        mutateAsync: createSubServiceAsync,
        isPending: createLoading,
        error: createError
    } = createSubService

    const {
        mutateAsync: updateSubServiceAsync,
        isPending: updateLoading,
        error: updateError,
    } = updateSubService

    const {
        mutateAsync: deleteSubServiceAsync,
        isPending: deleteLoading,
        error: deleteError,
    } = deleteSubService

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editing, setEditing] = useState({})

    if (isLoading) {
        return <Loader />
    }

    if (!canView) return <NotAuthorizedPage />;
    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">View Service Details</h1>
            </div>
            <div className="w-full items-center justify-between">
                <Breadcrumb className="mb-5">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/services">Services</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>View Service</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <Separator />

            <div className='space-y-6 mt-6'>
                <ServiceCard service={service} />
                <div className='bg-white rounded-xl border p-4'>
                    <ServiceHeader service={service} />
                </div>

                <Separator />
                <div className="space-y-4">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-primary font-bold sm:text-2xl lg:text-3xl">Sub Services</h1>

                        <Button onClick={() => {
                            setIsDialogOpen(true)
                            setEditing({})
                        }}>
                            Add Sub Service
                        </Button>
                    </div>

                    <TabbedDocuments
                        ss={service}
                        setIsDialogOpen={setIsDialogOpen}
                        setEditing={setEditing}
                        onDelete={deleteSubServiceAsync}
                        isDeleting={deleteLoading}
                        deleteError={deleteError}
                    />
                </div>
            </div>

            <AddSubServiceDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                serviceId={service._id}
                onCreate={createSubServiceAsync}
                isLoading={createLoading || updateLoading}
                error={createError || updateError}
                editing={editing}
                onUpdate={updateSubServiceAsync}
            />
        </InnerDashboardLayout>
    );
};

export default ViewServicePage;
