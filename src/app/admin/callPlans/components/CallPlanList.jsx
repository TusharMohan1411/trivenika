"use client";
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash, Clock, DollarSign, List } from "lucide-react";
import { useState } from "react";
import Loader from '@/components/Loader';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import DeleteConfirmationDialog from './DeleteConfirmationDialog ';
import { FaRupeeSign } from 'react-icons/fa';
import TableSkeleton from '@/components/custom/TableSkeleton';

export default function CallPlanListView({ isLoading, error, callPlans, onEdit, onDelete, isDeleting, deleteError, canEdit, canDelete }) {
    const [deletingId, setDeletingId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeletingId(id);
    };

    const handleDeleteConfirm = async () => {
        await onDelete(deletingId);
        setDeletingId(null);
    };

    if (isLoading) return <div className="text-center p-4"><TableSkeleton
        rows={5}
        columns={4}
        showHeader={false}
        showPagination={true}
    /></div>;
    if (error) return <div className="text-red-600 p-4">Error: {error.message}</div>;
    if (!callPlans?.length) return <div className="text-center text-gray-500 p-4">No Call Plan Found!</div>;

    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {callPlans.map((item) => (
                    <div
                        key={item._id}
                        className="relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md flex flex-col h-full"
                    >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-800 truncate">{item.name}</h3>
                                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                                    {item.time}
                                </Badge>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 flex-grow">
                            {/* Price */}
                            <div className="flex items-center mb-5">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <FaRupeeSign className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Price</p>
                                    <p className="text-2xl font-bold text-gray-800">₹{item.price}</p>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="mt-6">
                                <div className="flex items-center mb-3">
                                    <List className="text-gray-500 mr-2" size={18} />
                                    <h4 className="font-medium text-gray-700">Instructions</h4>
                                </div>
                                <ul className="space-y-2 pr-2">
                                    {item?.instructions?.map((instruction, idx) => (
                                        <li
                                            key={idx}
                                            className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg flex items-start"
                                        >
                                            <span className="w-5 h-5 bg-indigo-100 text-indigo-800 rounded-full text-xs flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                                                {idx + 1}
                                            </span>
                                            {instruction}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                            {canEdit && (
                                <Button
                                    variant="outline"
                                    className="flex items-center"
                                    onClick={() => onEdit(item)}
                                >
                                    <Pencil className="mr-2" size={16} />
                                    Edit
                                </Button>
                            )}

                            {canDelete && (
                                <Button
                                    variant="destructive"
                                    className="flex items-center"
                                    onClick={() => handleDeleteClick(item._id)}
                                >
                                    {isDeleting && deletingId === item._id ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash className="mr-2" size={16} />
                                    )}
                                    Delete
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmationDialog
                isOpen={!!deletingId}
                onOpenChange={(open) => !open && setDeletingId(null)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                error={deleteError}
                title="Delete Call Plan"
                description="Are you sure you want to delete this Call Plan?"
            />
        </section>
    );
}