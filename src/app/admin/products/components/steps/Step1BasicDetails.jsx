'use client';

import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandItem,
} from '@/components/ui/command';
import { ImageIcon, X } from 'lucide-react';
import ImageSelector from '@/components/ImageSelector';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';
import { useTags } from '@/hooks/useTags';
import { Label } from '@/components/ui/label';
import MultiImageSelector from '@/components/MultiImageSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Step1BasicDetails() {
    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const [pointInput, setPointInput] = useState('');
    const shortPoints = watch('shortPoints') || [];

    const images = watch('images') || [];
    const [openImageDialog, setOpenImageDialog] = useState(false);

    const { categoriesQuery } = useCategories();
    const { tagsQuery } = useTags();
    const allCategories = categoriesQuery.data || [];
    const allTags = tagsQuery.data || [];

    const selectedCats = watch('categories') || [];
    const selectedTags = watch('tags') || [];

    // Helper to toggle an ID in categories or tags
    const toggleSelect = (field, id) => {
        const curr = watch(field) || [];
        if (curr.includes(id)) {
            setValue(field, curr.filter((x) => x !== id), { shouldValidate: true });
        } else {
            setValue(field, [...curr, id], { shouldValidate: true });
        }
    };

    // Add short point handler
    const addShortPoint = () => {
        const trimmed = pointInput.trim();
        if (!trimmed) return;
        if (shortPoints.includes(trimmed)) {
            setPointInput('');
            return;
        }
        setValue('shortPoints', [...shortPoints, trimmed], { shouldValidate: true });
        setPointInput('');
    };

    // Remove short point
    const removePoint = (idx) => {
        const updated = [...shortPoints];
        updated.splice(idx, 1);
        setValue('shortPoints', updated, { shouldValidate: true });
    };

    // Slug auto-generation
    const watchName = watch('name');
    useEffect(() => {
        const generatedSlug = watchName
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        setValue('slug', generatedSlug);
    }, [watchName, setValue]);

    const [imageSelectorIndex, setImageSelectorIndex] = useState(null);
    const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
        control,
        name: 'variants'
    });

    return (
        <div className='space-y-2'>
            <div className="grid gap-4 grid-cols-2 space-y-6 bg-white border rounded-xl p-7">
                {/* Name */}
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Product Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Slug */}
                <FormField
                    control={control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input disabled placeholder="product-slug" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Short Description */}
                <FormField
                    control={control}
                    name="shortDescription"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Brief product description…" rows={2} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status Switch */}
                <div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border mb-2">
                        <div>
                            <Label htmlFor="status" className="block font-medium text-gray-700">
                                Status
                            </Label>
                            <p className="text-sm text-gray-500 mt-1">
                                {watch('status')
                                    ? 'Published (visible to public)'
                                    : 'Draft (only you can see)'}
                            </p>
                        </div>
                        <FormField
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="scale-125 data-[state=checked]:bg-green-500"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Out of stock Switch */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                        <Label htmlFor="outOfStock" className="block font-medium text-gray-700">
                            Out of Stock
                        </Label>
                        <FormField
                            control={control}
                            name="outOfStock"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormLabel>Out of Stock</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="scale-125 data-[state=checked]:bg-red-500"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Images Selector */}
                <div className="space-y-2 col-span-2">
                    <FormLabel>Images *</FormLabel>
                    <div className="flex flex-col gap-3">
                        {images.length === 0 && (
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer h-48"
                                onClick={() => setOpenImageDialog(true)}
                            >
                                <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                                <span className="text-gray-500">Click to select image</span>
                            </div>
                        )}
                        {images.length > 0 && (
                            <Button type="button" onClick={() => setOpenImageDialog(true)}>
                                Add More
                            </Button>
                        )}
                        {images.length > 0 && (
                            <div className="grid grid-cols-4 gap-3">
                                {images.map((url, idx) => (
                                    <div
                                        key={idx}
                                        className="relative border rounded-lg overflow-hidden group"
                                    >
                                        <Image
                                            src={url}
                                            alt={`img-${idx}`}
                                            height={300}
                                            width={300}
                                            className="object-cover h-32 w-full"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const updated = [...images];
                                                updated.splice(idx, 1);
                                                setValue('images', updated, { shouldValidate: true });
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.images && (
                            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
                        )}
                    </div>
                </div>

                {/* Short Points Input */}
                <div className="col-span-2 space-y-2">
                    <FormLabel className="mb-2">Short Points</FormLabel>
                    <div
                        className={`min-h-[38px] w-full ${shortPoints.length <= 0 && 'hidden'} flex flex-wrap items-center gap-2 
                        }`}
                    >
                        {shortPoints.map((pt, idx) => (
                            <div
                                key={idx}
                                className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                            >
                                {pt}
                                <X
                                    className="ml-1 cursor-pointer"
                                    size={12}
                                    onClick={() => removePoint(idx)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add points - Heart Healthy, Increase Immunity"
                            value={pointInput}
                            onChange={(e) => setPointInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addShortPoint())}
                            className={` ${errors.shortPoints ? 'border border-red-500' : ''}`}
                        />
                        <Button type="button" onClick={addShortPoint} className="ml-2">
                            Add
                        </Button>
                    </div>
                    {errors.shortPoints && (
                        <p className="text-red-500 text-sm">{errors.shortPoints.message}</p>
                    )}
                </div>
            </div >

            <div className="grid gap-4 grid-cols-2 space-y-6 bg-white border rounded-xl p-7">
                {/* Categories Multi-Select */}
                <div className="col-span-2">
                    <FormLabel className={'mb-3'}>Categories</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div
                                className={`min-h-[38px] w-full flex flex-wrap items-center gap-1 px-2 ${errors.categories ? 'border border-red-500' : 'border'
                                    } rounded cursor-pointer`}
                                onClick={(e) =>
                                    e.currentTarget.nextElementSibling?.dispatchEvent(
                                        new MouseEvent('click')
                                    )
                                }
                            >
                                {selectedCats.length === 0 && (
                                    <span className="text-gray-400">Select categories…</span>
                                )}
                                {selectedCats.map((id) => {
                                    const cat = allCategories.find((c) => c._id === id);
                                    return (
                                        <span
                                            key={id}
                                            className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-sm"
                                        >
                                            {cat?.name}
                                            <X
                                                className="ml-1 cursor-pointer"
                                                size={12}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleSelect('categories', id);
                                                }}
                                            />
                                        </span>
                                    );
                                })}
                            </div>
                        </PopoverTrigger>

                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput placeholder="Search categories..." />
                                <CommandList>
                                    <CommandEmpty>No categories found.</CommandEmpty>
                                    {allCategories.map((cat) => (
                                        <CommandItem
                                            key={cat._id}
                                            onSelect={() => toggleSelect('categories', cat._id)}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCats.includes(cat._id)}
                                                readOnly
                                                className="mr-2"
                                            />
                                            {cat.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {
                        errors.categories && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.categories.message}
                            </p>
                        )
                    }
                </div >

                {/* Tags Multi-Select */}
                < div className="col-span-2" >
                    <FormLabel className={'mb-3'}>Tags</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div
                                className={`min-h-[38px] w-full flex flex-wrap items-center gap-1 px-2 ${errors.tags ? 'border border-red-500' : 'border'
                                    } rounded cursor-pointer`}
                                onClick={(e) =>
                                    e.currentTarget.nextElementSibling?.dispatchEvent(
                                        new MouseEvent('click')
                                    )
                                }
                            >
                                {selectedTags.length === 0 && (
                                    <span className="text-gray-400">Select tags…</span>
                                )}
                                {selectedTags.map((id) => {
                                    const tag = allTags.find((t) => t._id === id);
                                    return (
                                        <span
                                            key={id}
                                            className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm"
                                        >
                                            {tag?.name}
                                            <X
                                                className="ml-1 cursor-pointer"
                                                size={12}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleSelect('tags', id);
                                                }}
                                            />
                                        </span>
                                    );
                                })}
                            </div>
                        </PopoverTrigger>

                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput placeholder="Search tags..." />
                                <CommandList>
                                    <CommandEmpty>No tags found.</CommandEmpty>
                                    {allTags.map((tag) => (
                                        <CommandItem
                                            key={tag._id}
                                            onSelect={() => toggleSelect('tags', tag._id)}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedTags.includes(tag._id)}
                                                readOnly
                                                className="mr-2"
                                            />
                                            {tag.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {
                        errors.tags && (
                            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
                        )
                    }
                </div >
            </div>

            {/* variants */}
            <div className="space-y-6 bg-white border rounded-xl p-7">
                <Label className={'font-bold text-primary text-xl'}>Add Product Variants</Label>
                <div className="gap-3 grid grid-cols-2">
                    {variantFields.map((field, index) => (
                        <Card key={field.id} className="p-4 relative">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 rounded-full"
                                onClick={() => removeVariant(index)}
                            >
                                ✕
                            </Button>

                            <div className="space-y-4">
                                {/* Icon selector */}
                                <div className="">
                                    <FormLabel className={'font-bold'}>Icon</FormLabel>
                                    <div className="flex flex-col gap-2 mt-3">
                                        {watch(`variants.${index}.image`) && (
                                            <div className="border rounded-md w-62 h-44 overflow-hidden">
                                                <Image
                                                    src={watch(`variants.${index}.image`)}
                                                    alt="Selected Image"
                                                    height={200}
                                                    width={200}
                                                    className="object-contain w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => setImageSelectorIndex(index)}
                                        >
                                            {watch(`variants.${index}.image`) ? 'Change Image' : 'Select Image'}
                                        </Button>
                                    </div>
                                </div>

                                {/* name */}
                                <div className="">
                                    <FormField
                                        control={control}
                                        name={`variants.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={'font-bold'}>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="1 Litre / 500 ml" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* actual Price */}
                                <div className="">
                                    <FormField
                                        control={control}
                                        name={`variants.${index}.actualPrice`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={'font-bold'}>Actual Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type={'number'}
                                                        placeholder='1200'
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* discounted Price */}
                                <div className="">
                                    <FormField
                                        control={control}
                                        name={`variants.${index}.discountedPrice`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={'font-bold'}>Discounted Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type={'number'}
                                                        placeholder='999'
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Image selector dialog */}
                            <ImageSelector
                                open={imageSelectorIndex === index}
                                onOpenChange={(open) => !open && setImageSelectorIndex(null)}
                                setImage={(url) => {
                                    setValue(`variants.${index}.image`, url);
                                    setImageSelectorIndex(null);
                                }}
                            />
                        </Card>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendVariant({ image: '', name: '', actualPrice: '', discountedPrice: '' })}
                    >
                        + Add Variant
                    </Button>
                </div>
            </div>

            <MultiImageSelector
                open={openImageDialog}
                onOpenChange={setOpenImageDialog}
                onChange={(newURLs) => {
                    setValue("images", [...(images || []), ...newURLs], {
                        shouldValidate: true,
                    })
                }}
            />
        </div>
    );
}