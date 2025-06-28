// app/admin/collections/page.jsx
'use client';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import CollectionsListView from './components/CollectionsListView';
import CollectionDialog from './components/CollectionDialog';
import { useState } from 'react';
import { useCollections } from '@/hooks/useCollections';
import NotAuthorizedPage from '@/components/notAuthorized';

export default function Page() {
    const {
        collectionsQuery,
        createCollection,
        deleteCollection,
        updateCollection,
        permissions: { canView, canAdd, canEdit, canDelete }
    } = useCollections();

    const {
        mutateAsync: createAsync,
        isPending: isCreating,
        error: createError,
        reset: resetCreate
    } = createCollection;

    const {
        mutateAsync: updateAsync,
        isPending: isUpdating,
        error: updateError,
        reset: resetUpdate
    } = updateCollection;

    const {
        mutateAsync: deleteAsync,
        isPending: isDeleting,
        error: deleteError,
        reset: resetDelete
    } = deleteCollection;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [icon, setIcon] = useState(null);
    const [banner, setBanner] = useState(null);

    const openAdd = () => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelected(null);
        setIcon(null);
        setBanner(null);
        setIsDialogOpen(true);
    };

    const openEdit = (item) => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelected(item);
        setIcon(item.icon);
        setBanner(item.bannerImage);
        setIsDialogOpen(true);
    };

    if (!canView) return <NotAuthorizedPage />;

    return (
        <InnerDashboardLayout>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-primary font-bold text-3xl">Collections</h1>
                {canAdd && (
                    <Button onClick={openAdd}>
                        <CirclePlus className="mr-2 h-4 w-4" /> Add Collection
                    </Button>
                )}
            </div>

            <CollectionsListView
                isLoading={collectionsQuery.isLoading}
                error={collectionsQuery.error}
                collections={collectionsQuery.data}
                onEdit={openEdit}
                onDelete={deleteAsync}
                isDeleting={isDeleting}
                deleteError={deleteError}
                canEdit={canEdit}
                canDelete={canDelete}
            />

            <CollectionDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                selectedCollection={selected}
                onCreate={createAsync}
                onUpdate={updateAsync}
                isSubmitting={isCreating || isUpdating}
                error={createError?.message || updateError?.message}
                icon={icon}
                setIcon={setIcon}
                banner={banner}
                setBanner={setBanner}
            />
        </InnerDashboardLayout>
    );
}