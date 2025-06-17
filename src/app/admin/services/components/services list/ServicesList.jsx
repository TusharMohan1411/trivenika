'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Eye, Pencil, Trash } from 'lucide-react';
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import ServiceDetailsDialog from './ServiceDetailsDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog ';
import { useServiceStore } from '@/store/serviceStore';
import TableSkeleton from '@/components/custom/TableSkeleton';

export default function ServicesListView({
    isLoading,
    error,
    services,
    onDelete,
    isDeleting,
    deleteError,
    categories,
    canDelete,
    canEdit
}) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState(null);

    // const { setSelectedService } = useServiceStore();

    const handleEdit = (service) => {
        // setSelectedService(service);
        router.push(`/admin/services/${service._id}/edit`);
    };

    const handleView = (service) => {
        // setSelectedService(service);
        router.push(`/admin/services/${service._id}/view`);
    };

    const handleDeleteClick = (id) => {
        setDeletingId(id);
    };

    const handleDeleteConfirm = async () => {
        await onDelete(deletingId);
        setDeletingId(null);
    };

    if (isLoading) {
        return (
            <TableSkeleton
                rows={5}
                columns={4}
                showHeader={false}
                showPagination={true}
            />
        );
    }

    if (error) {
        return (
            <div className="text-red-600 p-4">
                Error: {error.message}
            </div>
        );
    }

    if (!services.length) {
        return (
            <div className="text-center text-gray-500 p-4">
                No services found!
            </div>
        );
    }

    // Helper to map category ID → name
    const getCategoryName = (catId) => {
        const found = categories.find((c) => c._id === catId);
        return found ? found.name : 'Unknown';
    };

    return (
        <section className="w-full">
            <div className="overflow-x-auto rounded-md border border-gray-200">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="text-center w-[50px]">#</TableHead>
                            <TableHead className="text-center">Image</TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Categories</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {services.map((service, index) => (
                            <TableRow
                                key={service._id || index}
                                className="even:bg-gray-50 hover:bg-gray-100 transition"
                            >
                                {/* 1. Index */}
                                <TableCell className="text-center align-middle">
                                    {index + 1}
                                </TableCell>

                                {/* 2. Image */}
                                <TableCell className="align-middle">
                                    <div className="flex justify-center py-2">
                                        <img
                                            src={service.imageURL}
                                            alt={service.name}
                                            width={60}
                                            height={60}
                                            className="object-contain rounded"
                                        />
                                    </div>
                                </TableCell>

                                {/* 3. Name */}
                                <TableCell className="text-center align-middle">
                                    {service.name}
                                </TableCell>

                                {/* 4. Categories - FIXED ALIGNMENT */}
                                <TableCell className="align-middle">
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {service.categories.map((catId) => (
                                            <Badge key={catId} variant="secondary">
                                                {getCategoryName(catId)}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>

                                {/* 5. Status Switch - FIXED ALIGNMENT */}
                                <TableCell className="align-middle">
                                    <div className="flex justify-center">
                                        <Switch
                                            checked={service.status}
                                            onCheckedChange={(checked) => {
                                                // TODO: call your API/mutation to toggle `service.status`
                                            }}
                                        />
                                    </div>
                                </TableCell>

                                {/* 6. Actions Dropdown */}
                                <TableCell className="">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* <ServiceDetailsDialog service={service} /> */}

                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="hover:bg-gray-100"
                                            onClick={() => handleView(service)}
                                        >
                                            <Eye size={18} className="text-gray-600" />
                                        </Button>

                                        {canEdit &&
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => handleEdit(service)}
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                        }
                                        {canDelete &&
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDeleteClick(service._id)}
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DeleteConfirmationDialog
                isOpen={!!deletingId}
                onOpenChange={(open) => {
                    if (!open) setDeletingId(null);
                }}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Service"
                description="Are you sure you want to delete this service?"
            />
        </section>
    );
}