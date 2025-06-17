'use client';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
// import CategoriesListView from './components/CategoriesListView';
// import CategoryDialog from './components/CategoryDialog';
import { useState } from 'react';
// import { useCategories } from '@/hooks/useCategories';
import NotAuthorizedPage from '@/components/notAuthorized';
import { useCallPlans } from '@/hooks/useCallPlans';
import CallPlanDialog from './components/CallPlanDialog';
import CallPlanListView from './components/CallPlanList';

export default function Page() {
    // fetch categories query
    const { callPlansQuery, deleteCallPlan, updateCallPlan, createCallPlan,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
        } } = useCallPlans();

    // destructure createCategory mutation
    const {
        mutateAsync: createCategoryAsync,
        isPending: isCreating,
        error: createError,
        reset: resetCreate,
    } = createCallPlan;

    // destructure updateCategory mutation
    const {
        mutateAsync: updateCategoryAsync,
        isPending: isUpdating,
        error: updateError,
        reset: resetUpdate,
    } = updateCallPlan;

    // destructure deleteCategory mutation
    const {
        mutateAsync: deleteCategoryAsync,
        isPending: isDeleting,
        error: deleteError,
        reset: resetDelete,
    } = deleteCallPlan;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState();

    // open dialog to add new tag
    const handleAddClick = () => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedPlan(undefined);
        setIsDialogOpen(true);
    };

    // open dialog to edit
    const handleEditClick = (item) => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedPlan(item);
        setIsDialogOpen(true);
    };

    if (!canView) return <NotAuthorizedPage />

    console.log(callPlansQuery.data)

    return (
        <InnerDashboardLayout>
            <div className="w-full items-center justify-between">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl mb-3">Call Plans</h1>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4 mt-4">
                    <Button variant="outline">
                        Total: {callPlansQuery.data?.length || 0}
                    </Button>
                    {canAdd &&
                        <Button onClick={handleAddClick}>
                            <CirclePlus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    }
                </div>

                <CallPlanListView
                    callPlans={callPlansQuery.data}
                    onEdit={handleEditClick}
                    isLoading={callPlansQuery.isLoading}
                    error={callPlansQuery.error}
                    onDelete={deleteCategoryAsync}
                    isDeleting={isDeleting}
                    deleteError={deleteError}
                    canEdit={canEdit}
                    canDelete={canDelete}
                />

                <CallPlanDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    selectedPlan={selectedPlan}
                    onCreate={createCategoryAsync}
                    onUpdate={updateCategoryAsync}
                    isSubmitting={isCreating || isUpdating}
                    error={createError?.message || updateError?.message}
                />
            </div>
        </InnerDashboardLayout>
    );
}