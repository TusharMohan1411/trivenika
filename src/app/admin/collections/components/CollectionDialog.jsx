
// app/admin/collections/components/CollectionDialog.jsx
'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import ImageSelector from '@/components/ImageSelector';
import Image from 'next/image';
import clsx from 'clsx';

export default function CollectionDialog({
    open,
    onOpenChange,
    selectedCollection,
    onCreate,
    onUpdate,
    isSubmitting,
    error,
    icon,
    setIcon,
    banner,
    setBanner
}) {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
    const [selectingField, setSelectingField] = useState(null);

    useEffect(() => {
        if (open) {
            reset({
                name: selectedCollection?.name || '',
                slug: selectedCollection?.slug || '',
                heading: selectedCollection?.heading || ''
            });
            setIcon(selectedCollection?.icon || null);
            setBanner(selectedCollection?.bannerImage || null);
        }
    }, [open, selectedCollection, reset, setIcon, setBanner]);

    const watchName = watch('name');
    useEffect(() => {
        const slug = watchName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        setValue('slug', slug);
    }, [watchName, setValue]);

    const onSubmit = async (data) => {
        const payload = { ...data, icon, bannerImage: banner };
        if (selectedCollection?._id) await onUpdate({ id: selectedCollection._id, data: payload });
        else await onCreate({ data: payload });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{selectedCollection ? 'Edit Collection' : 'Add Collection'}</DialogTitle>
                    <DialogDescription>Manage your collections.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    {/* Icon */}
                    <div>
                        <Label>Icon *</Label>
                        {!icon ? (
                            <div className="border-dashed border-2 p-4 text-center cursor-pointer" onClick={() => setSelectingField('icon')}>
                                Click to select icon
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Image src={icon} alt="icon" width={50} height={50} />
                                <Button type="button" size="sm" onClick={() => setSelectingField('icon')}>Change</Button>
                            </div>
                        )}
                    </div>
                    {/* Banner */}
                    <div>
                        <Label>Banner Image *</Label>
                        {!banner ? (
                            <div className="border-dashed border-2 p-4 text-center cursor-pointer" onClick={() => setSelectingField('banner')}>
                                Click to select banner
                            </div>
                        ) : (
                            <div className="flex flex-col items-end gap-2">
                                <Image src={banner} alt="banner" width={500} height={500} className='h-40 w-full object-cover mt-3' />
                                <Button type="button" size="sm" onClick={() => setSelectingField('banner')}>Change</Button>
                            </div>
                        )}
                    </div>
                    {/* Name */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <Label htmlFor="name" className="text-right">Name *</Label>
                        <div className="col-span-3">
                            <Input id="name" {...register('name', { required: true })} />
                            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                        </div>
                    </div>
                    {/* Slug */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <Label htmlFor="slug" className="text-right">Slug *</Label>
                        <div className="col-span-3">
                            <Input id="slug" {...register('slug', { required: true })} disabled className={clsx(errors.slug && 'border-red-500')} />
                            {errors.slug && <p className="text-red-500 text-sm">Slug is required</p>}
                        </div>
                    </div>
                    {/* Heading */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <Label htmlFor="heading" className="text-right">Heading *</Label>
                        <div className="col-span-3">
                            <Input id="heading" {...register('heading', { required: true })} />
                            {errors.heading && <p className="text-red-500 text-sm">Heading is required</p>}
                        </div>
                    </div>
                    {error && <p className="text-red-600">Error: {error}</p>}
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="animate-spin mr-2" />}Submit
                        </Button>
                    </DialogFooter>
                </form>
                {selectingField && (
                    <ImageSelector
                        open
                        onOpenChange={(open) => !open && setSelectingField(null)}
                        setImage={(url) => { selectingField === 'icon' ? setIcon(url) : setBanner(url); setSelectingField(null); }}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}