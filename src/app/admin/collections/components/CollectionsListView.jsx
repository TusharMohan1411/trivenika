// app/admin/collections/components/CollectionsListView.jsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import TableSkeleton from '@/components/custom/TableSkeleton';
// Removed extra space after filename below:
// import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog ';
import AddProductSheet from './AddProductSheet';
import { Badge } from '@/components/ui/badge';

export default function CollectionsListView({
    isLoading,
    error,
    collections,
    onEdit,
    onDelete,
    isDeleting,
    deleteError,
    canEdit,
    canDelete,
}) {
    const [deletingId, setDeletingId] = useState(null);
    const [activeCollection, setActiveCollection] = useState(null);

    const confirmDelete = async () => {
        await onDelete(deletingId);
        setDeletingId(null);
    };

    if (isLoading) return <TableSkeleton rows={5} columns={5} />;
    if (error) return <p className="text-red-600">Error: {error.message}</p>;
    if (!collections?.length) return <p className="text-center">No Collections Found</p>;

    return (
        <div className="overflow-x-auto border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Heading</TableHead>
                        <TableHead>Banner</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {collections.map((col, idx) => (
                        <TableRow key={col._id}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>
                                <Image src={col.icon} alt={col.name} width={50} height={50} />
                            </TableCell>
                            <TableCell>{col.name}</TableCell>
                            <TableCell>{col.slug}</TableCell>
                            <TableCell>{col.heading}</TableCell>
                            <TableCell>
                                <Image src={col.bannerImage} alt={col.name} width={80} height={50} />
                            </TableCell>
                            <TableCell>
                                {col.products.length}
                                <Badge
                                    variant={'outline'}
                                    className={'ml-3 cursor-pointer'}
                                    onClick={() => setActiveCollection(col)}
                                >
                                    <Pencil size={20} />
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {canEdit && (
                                    <Button size="icon" variant="outline" onClick={() => onEdit(col)}>
                                        <Pencil size={16} />
                                    </Button>
                                )}
                                {canDelete && (
                                    <Button variant="destructive" onClick={() => setDeletingId(col._id)}>
                                        <Trash size={16} />
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <DeleteConfirmationDialog
                isOpen={!!deletingId}
                onOpenChange={(open) => !open && setDeletingId(null)}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
                error={deleteError}
            />

            {activeCollection && (
                <AddProductSheet
                    collection={activeCollection}
                    onClose={() => setActiveCollection(null)}
                />
            )}
        </div>
    );
}