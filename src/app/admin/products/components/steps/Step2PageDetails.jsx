'use client';

import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ImageSelector from '@/components/ImageSelector';
import Image from 'next/image';

export default function Step2PageDetails() {
    const {
        control,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'multipleUsePoints',
    });

    const [imageSelectorIndex, setImageSelectorIndex] = useState(null);
    const { fields: whyToBuyFields, append: appendWhyToBuy, remove: removeWhyToBuy } = useFieldArray({
        control,
        name: 'whyToBuy'
    });

    const labTestingReport = watch('labTestingReport') || '';
    const [labDialog, setLabDialog] = useState(false)

    return (
        <div className="space-y-2">
            <div className=' bg-white border rounded-xl p-7'>
                {/* Page Heading */}
                <FormField
                    control={control}
                    name="multipleUseHeading"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={'text-primary font-bold'}>Multiple Uses of Product - Heading</FormLabel>
                            <FormControl>
                                <Input placeholder="Why to buy our A2 Desi Cow Ghee" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Multiple use points list */}
            <div className=' bg-white border rounded-xl p-7'>
                <FormLabel className={'mb-5 text-primary font-bold'}>Multiple Uses of Product -Points (max 10)</FormLabel>

                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <FormItem key={field.id} className="flex gap-2 items-center">
                            <Button variant={'outline'}>{index + 1}</Button>
                            <FormControl>
                                <Input
                                    {...register(`multipleUsePoints.${index}`)}
                                    placeholder={`Point #${index + 1}`}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => remove(index)}
                            >
                                ✕
                            </Button>
                        </FormItem>
                    ))}

                    {errors.multipleUsePoints && (
                        <p className="text-red-500 text-sm">
                            {errors.multipleUsePoints.message}
                        </p>
                    )}
                </div>

                {fields.length < 10 && (
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-3"
                        onClick={() => append('')}
                    >
                        + Add Point
                    </Button>
                )}
            </div>

            {/* Why to buy */}
            <div className='bg-white border rounded-xl p-7'>
                <FormLabel className={'text-primary font-bold mb-4'}>Why to Buy</FormLabel>

                <div className="gap-3 grid grid-cols-2">
                    {whyToBuyFields.map((field, index) => (
                        <Card key={field.id} className="p-4 relative">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 rounded-full"
                                onClick={() => removeWhyToBuy(index)}
                            >
                                ✕
                            </Button>

                            <div className="space-y-4">
                                {/* Icon selector */}
                                <div className="">
                                    <FormLabel className={'font-bold'}>Icon</FormLabel>
                                    <div className="flex flex-col gap-2 mt-3">
                                        {watch(`whyToBuy.${index}.icon`) && (
                                            <div className="border rounded-md w-62 h-44 overflow-hidden">
                                                <Image
                                                    src={watch(`whyToBuy.${index}.icon`)}
                                                    alt="Selected icon"
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
                                            {watch(`whyToBuy.${index}.icon`) ? 'Change Icon' : 'Select Icon'}
                                        </Button>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="">
                                    <FormField
                                        control={control}
                                        name={`whyToBuy.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={'font-bold'}>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Benefit title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Content */}
                                <div className="">
                                    <FormField
                                        control={control}
                                        name={`whyToBuy.${index}.content`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={'font-bold'}>Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Detailed explanation" {...field} />
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
                                    setValue(`whyToBuy.${index}.icon`, url);
                                    setImageSelectorIndex(null);
                                }}
                            />
                        </Card>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendWhyToBuy({ icon: '', title: '', content: '' })}
                    >
                        + Add Benefit
                    </Button>
                </div>
            </div>

            {/* Lab Testing Report */}
            <div className='bg-white border rounded-xl p-7 w-fit'>
                <FormLabel className={'text-primary font-bold mb-4'}>Lab Testing Report</FormLabel>
                {!labTestingReport &&
                    <div
                        className='border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer h-96 w-96'
                        onClick={() => setLabDialog(true)}>Add Lab Testing Report </div>
                }

                {labTestingReport &&
                    <div>
                        <Image
                            src={labTestingReport}
                            alt='labTesting'
                            height={500}
                            width={500}
                        />

                        <Button type={'button'} onClick={() => setLabDialog(true)} className={'mt-3'}>Change Image</Button>
                    </div>
                }
                <ImageSelector
                    open={labDialog}
                    onOpenChange={(open) => !open && setLabDialog(null)}
                    setImage={(url) => { setValue(`labTestingReport`, url); }}
                />
            </div>

        </div>
    );
}
