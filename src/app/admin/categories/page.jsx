'use client';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import CategoriesListView from './components/CategoriesListView';
import CategoryDialog from './components/CategoryDialog';
import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import NotAuthorizedPage from '@/components/notAuthorized';

export default function Page() {
    // fetch categories query
    const { categoriesQuery, createCategory, deleteCategory, updateCategory, permissions: {
        canView,
        canAdd,
        canEdit,
        canDelete,
    } } = useCategories();

    // destructure createCategory mutation
    const {
        mutateAsync: createCategoryAsync,
        isPending: isCreating,
        error: createError,
        reset: resetCreate,
    } = createCategory;

    // destructure updateCategory mutation
    const {
        mutateAsync: updateCategoryAsync,
        isPending: isUpdating,
        error: updateError,
        reset: resetUpdate,
    } = updateCategory;

    // destructure deleteCategory mutation
    const {
        mutateAsync: deleteCategoryAsync,
        isPending: isDeleting,
        error: deleteError,
        reset: resetDelete,
    } = deleteCategory;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [image, setImage] = useState(null)

    // open dialog to add new tag
    const handleAddClick = () => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setImage(null)
        setSelectedCategory(undefined);
        setIsDialogOpen(true);
    };

    // open dialog to edit
    const handleEditClick = (category) => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedCategory(category);
        setImage(category?.imageURL)
        setIsDialogOpen(true);
    };

    if (!canView) return <NotAuthorizedPage />

    return (
        <InnerDashboardLayout>
            <div className="w-full items-center justify-between">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl mb-3">Categories</h1>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4 mt-4">
                    <Button variant="outline">
                        Categories: {categoriesQuery.data?.length || 0}
                    </Button>
                    {canAdd &&
                        <Button onClick={handleAddClick}>
                            <CirclePlus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    }
                </div>

                <CategoriesListView
                    categories={categoriesQuery.data}
                    onEdit={handleEditClick}
                    isLoading={categoriesQuery.isLoading}
                    error={categoriesQuery.error}
                    onDelete={deleteCategoryAsync}
                    isDeleting={isDeleting}
                    deleteError={deleteError}
                    canEdit={canEdit}
                    canDelete={canDelete}
                />

                <CategoryDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    selectedCategory={selectedCategory}
                    onCreate={createCategoryAsync}
                    onUpdate={updateCategoryAsync}
                    isSubmitting={isCreating || isUpdating}
                    error={createError?.message || updateError?.message}
                    image={image}
                    setImage={setImage}
                />
            </div>
        </InnerDashboardLayout>
    );
}