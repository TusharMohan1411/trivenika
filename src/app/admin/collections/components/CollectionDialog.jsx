'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import clsx from 'clsx';
import ImageSelector from '@/components/ImageSelector';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    heading: z.string().min(1, 'Heading is required'),
    featureOnHomePage: z.boolean().optional(),
    saleStart: z.preprocess((val) => val ? new Date(val) : null, z.date().nullable().optional()),
    saleEnd: z.preprocess((val) => val ? new Date(val) : null, z.date().nullable().optional()),
});

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
    setBanner,
}) {

    const [selectingField, setSelectingField] = useState(null);
    console.log(selectedCollection)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
            heading: '',
            featureOnHomePage: false,
            saleStart: null,
            saleEnd: null,
        },
    });

    function formatDateForInput(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
    }

    const watchName = form.watch('name');
    // console.log(selectedCollection)
    useEffect(() => {
        if (open) {
            form.reset({
                name: selectedCollection?.name || '',
                slug: selectedCollection?.slug || '',
                heading: selectedCollection?.heading || '',
                featureOnHomePage: selectedCollection?.featureOnHomePage || false,
                saleStart: formatDateForInput(selectedCollection?.saleStart),
                saleEnd: formatDateForInput(selectedCollection?.saleEnd),
            });
            setIcon(selectedCollection?.icon || null);
            setBanner(selectedCollection?.bannerImage || null);
        }
    }, [open, selectedCollection, setIcon, setBanner, form]);

    useEffect(() => {
        const slug = watchName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        form.setValue('slug', slug);
    }, [watchName, form]);

    const onSubmit = async (data) => {
        // console.log(data)
        const payload = { ...data, icon, bannerImage: banner };
        if (selectedCollection?._id) await onUpdate({ id: selectedCollection._id, data: payload });
        else await onCreate({ data: payload });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{selectedCollection ? 'Edit Collection' : 'Add Collection'}</DialogTitle>
                    <DialogDescription>Manage your collections.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        {/* Icon */}
                        <div>
                            <Label>Icon *</Label>
                            {!icon ? (
                                <div
                                    className="border-dashed border-2 p-4 text-center cursor-pointer"
                                    onClick={() => setSelectingField('icon')}
                                >
                                    Click to select icon
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Image src={icon} alt="icon" width={50} height={50} />
                                    <Button type="button" size="sm" onClick={() => setSelectingField('icon')}>
                                        Change
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Banner */}
                        <div>
                            <Label>Banner Image *</Label>
                            {!banner ? (
                                <div
                                    className="border-dashed border-2 p-4 text-center cursor-pointer"
                                    onClick={() => setSelectingField('banner')}
                                >
                                    Click to select banner
                                </div>
                            ) : (
                                <div className="flex flex-col items-end gap-2">
                                    <Image src={banner} alt="banner" width={500} height={500} className="h-40 w-full object-cover mt-3" />
                                    <Button type="button" size="sm" onClick={() => setSelectingField('banner')}>
                                        Change
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 gap-4 items-center">
                                    <FormLabel className="text-right">Name *</FormLabel>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Slug (disabled) */}
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 gap-4 items-center">
                                    <FormLabel className="text-right">Slug *</FormLabel>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Input {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Heading */}
                        <FormField
                            control={form.control}
                            name="heading"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 gap-4 items-center">
                                    <FormLabel className="text-right">Heading *</FormLabel>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Feature on Home Page */}
                        <FormField
                            control={form.control}
                            name="featureOnHomePage"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-start gap-4 border bg-gray-100 rounded-sm p-3">
                                    <FormLabel className="text-right">Feature on Home Page</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Sale timer start */}
                        <FormField
                            control={form.control}
                            name="saleStart"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 gap-4 items-center">
                                    <FormLabel className="">Sale Start</FormLabel>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Input
                                                type={'datetime-local'}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Sale timer end */}
                        <FormField
                            control={form.control}
                            name="saleEnd"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 gap-4 items-center">
                                    <FormLabel className="">Sale End</FormLabel>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Input
                                                type={'datetime-local'}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Error */}
                        {error && <p className="text-red-600">Error: {error}</p>}

                        {/* Footer */}
                        <DialogFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="animate-spin mr-2" />}
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

                {selectingField && (
                    <ImageSelector
                        open
                        onOpenChange={(open) => !open && setSelectingField(null)}
                        setImage={(url) => {
                            selectingField === 'icon' ? setIcon(url) : setBanner(url);
                            setSelectingField(null);
                        }}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
