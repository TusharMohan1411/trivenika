'use client';
import dynamic from 'next/dynamic';
const RTEFieldGlobal = dynamic(
    () => import('@/components/RTEFieldGlobal'),
    {
        ssr: false,
        loading: () => <p className="py-10 text-center text-gray-500">Loading editor...</p>
    }
);

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function Step3PageContent() {
    const {
        control,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    // Pull out the array of sections
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'serviceBigDescription', // this is the array in RHF
    });

    return (
        <div className="space-y-6">
            {/* Header + Add button */}
            <div className="flex justify-between items-center bg-white border rounded-xl p-7">
                <h3 className="text-lg font-medium">Page Content</h3>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ name: '', title: '', content: '' })}
                >
                    + Add Content Section
                </Button>
            </div>

            {fields.map((field, index) => {
                // Grab any validation errors for this particular index
                const sectionErrors = errors.serviceBigDescription?.[index] || {};
                const hasError =
                    sectionErrors.name || sectionErrors.title || sectionErrors.content;

                // We need to watch the current value of serviceBigDescription[index].content
                // so we can feed it into the RTE as initialValue.
                const currentMarkdown = watch(`serviceBigDescription.${index}.content`);

                return (
                    <Collapsible key={field.id} defaultOpen={!hasError}>
                        <CollapsibleTrigger
                            className={`
                flex w-full justify-between items-center
                bg-white border rounded-xl p-5 cursor-pointer
                ${hasError ? 'border-red-500' : 'border-gray-300'}
              `}
                        >
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold">Section {index + 1}</h4>
                                {hasError && (
                                    <span className="text-red-500 text-sm">
                                        {sectionErrors.name?.message ||
                                            sectionErrors.title?.message ||
                                            sectionErrors.content?.message}
                                    </span>
                                )}
                            </div>
                            <ChevronDown
                                className="h-5 w-5 transition-transform data-[state=open]:rotate-180"
                                aria-hidden
                            />
                        </CollapsibleTrigger>

                        <CollapsibleContent className="p-7 border-l-2 border-gray-200 space-y-4 bg-white rounded-b-xl">
                            {/* “Remove” button */}
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >
                                    Remove
                                </Button>
                            </div>

                            {/* ----- NAME ----- */}
                            <FormField
                                control={control}
                                name={`serviceBigDescription.${index}.name`}
                                render={({ field: { onChange, onBlur, value, name } }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <input
                                                type="text"
                                                id={name}
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                className="w-full border rounded px-2 py-1"
                                                placeholder="e.g. SEO"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ----- TITLE ----- */}
                            <FormField
                                control={control}
                                name={`serviceBigDescription.${index}.title`}
                                render={({ field: { onChange, onBlur, value, name } }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <input
                                                type="text"
                                                id={name}
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                className="w-full border rounded px-2 py-1"
                                                placeholder="e.g. Improve your visibility"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ----- CONTENT (RTE) ----- */}
                            <FormField
                                control={control}
                                name={`serviceBigDescription.${index}.content`}
                                render={({ field: { name: fieldName, value: fieldValue } }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <RTEFieldGlobal
                                                name={fieldName}
                                                content={fieldValue}
                                                setValue={setValue}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                );
            })}

            {errors.serviceBigDescription &&
                !Array.isArray(errors.serviceBigDescription) && (
                    <p className="text-red-500 text-sm">
                        {errors.serviceBigDescription.message}
                    </p>
                )}
        </div>
    );
}
