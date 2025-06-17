'use client';

import React from 'react';
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

export default function Step2PageDetails() {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'serviceTypeDetails',
    });

    return (
        <div className="space-y-6">
            <div className=' bg-white border rounded-xl p-7'>
                {/* Page Heading */}
                <FormField
                    control={control}
                    name="pageHeading"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Page Heading</FormLabel>
                            <FormControl>
                                <Input placeholder="GST Registration Online: Documents, Requirements, Procedure & Expert Support" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Service Type Details list */}
            <div className=' bg-white border rounded-xl p-7'>
                <FormLabel className={'mb-5 text-lg'}>Service Type Details (max 10)</FormLabel>

                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <FormItem key={field.id} className="flex gap-2 items-center">
                            <Button variant={'outline'}>{index + 1}</Button>
                            <FormControl>
                                <Input
                                    {...register(`serviceTypeDetails.${index}`)}
                                    placeholder={`Detail #${index + 1}`}
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

                    {errors.serviceTypeDetails && (
                        <p className="text-red-500 text-sm">
                            {errors.serviceTypeDetails.message}
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
                        + Add Service Type Detail
                    </Button>
                )}
            </div>
        </div>
    );
}
