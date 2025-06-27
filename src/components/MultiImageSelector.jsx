"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CirclePlus, ImagesIcon, RefreshCw, X } from 'lucide-react';
import Image from 'next/image';
import { useImages } from '@/hooks/useImages';
import UploaderDialog from '@/app/admin/media/components/UploaderDialog';

export default function MultiImageSelector({ open, onOpenChange, onChange }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { imagesQuery } = useImages();
    const allImages = imagesQuery.data || [];

    // start with nothing selected
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleImage = (id) =>
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );

    const handleSelect = () => {
        const urls = allImages
            .filter((img) => selectedIds.includes(img.public_id))
            .map((img) => img.url);

        onChange(urls);
        setSelectedIds([]);      // clear for next time
        onOpenChange(false);
    };

    const handleClose = () => {
        setSelectedIds([]);      // clear on cancel/close
        onOpenChange(false);
    };

    const handleRefresh = async () => {
        await imagesQuery.refetch();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[1200px] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle>Select Images</DialogTitle>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleRefresh}
                            disabled={imagesQuery.isRefetching}
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${imagesQuery.isRefetching ? 'animate-spin' : ''}`}
                            />
                            Refresh
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex flex-wrap gap-4 max-h-[70vh] overflow-y-auto p-2">
                    {allImages.map((img) => {
                        const isSel = selectedIds.includes(img.public_id);
                        return (
                            <div
                                key={img.public_id}
                                className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer
                  ${isSel
                                        ? 'border-purple-600 ring-2 ring-purple-500 shadow-md'
                                        : 'border-transparent hover:border-purple-400'}`}
                                onClick={() => toggleImage(img.public_id)}
                            >
                                <Image
                                    height={100}
                                    width={100}
                                    quality={100}
                                    src={img.url}
                                    alt=""
                                    className="w-full h-32 object-contain"
                                />
                                {isSel && (
                                    <>
                                        <div className="absolute inset-0 bg-purple-500/10" />
                                        <button
                                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md 
                                 hover:bg-red-500 hover:text-white z-10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleImage(img.public_id);
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
                <UploaderDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onUploadSuccess={handleRefresh}
                />


                <DialogFooter className="mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <CirclePlus className="mr-1 h-4 w-4" /> Upload New
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSelect}
                        disabled={selectedIds.length === 0}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        <ImagesIcon className="mr-2" size={18} />
                        Select {selectedIds.length} Image
                        {selectedIds.length !== 1 && 's'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
