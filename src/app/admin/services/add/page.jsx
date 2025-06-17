"use client"
import React from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import ServiceForm from '../components/ServiceForm';
import { useServices } from '@/hooks/useServices';
import { useRouter } from 'next/navigation';

function page() {
    const router = useRouter()
    const { createService } = useServices()

    const {
        mutateAsync: createServiceAsync,
    } = createService

    const handleSubmit = async (data) => {
        console.log('Add service:', data);
        await createServiceAsync(data)
        router.push('/admin/services')
    };

    return (
        <InnerDashboardLayout>
            <div className="w-full items-center justify-between">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-3xl mb-3">Add New Service</h1>
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
                            <BreadcrumbPage>Add New</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <ServiceForm onSubmit={handleSubmit} loading={createService.isPending} error={createService.error} />
        </InnerDashboardLayout>
    )
}

export default page
