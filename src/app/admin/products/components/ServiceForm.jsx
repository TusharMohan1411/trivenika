// /app/components/ServiceForm.jsx
'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Step1BasicDetails from './steps/Step1BasicDetails';
import Step2PageDetails from './steps/Step2PageDetails';
import Step3PageContent from './steps/Step3PageContent';
import { Button } from '@/components/ui/button';
import { Loader2, Check } from 'lucide-react';
import { ServiceFormSchema } from '@/lib/validations/service-schema';

const steps = [
    { title: 'Basic Details' },
    { title: 'Page Details' },
    { title: 'Content' },
];

export default function ServiceForm({ defaultValues, onSubmit, loading, error }) {
    const methods = useForm({
        resolver: zodResolver(ServiceFormSchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            slug: '',
            shortDescription: '',
            images: [],
            categories: [],
            tags: [],
            status: true,
            outOfStock: false,
            multipleUseHeading: '',
            multipleUsePoints: [''],
            labTestingReport: '',
            shortPoints: [''],
            variants: [{ image: '', name: '', actualPrice: 0, discountedPrice: 0 }],
            whyToBuy: [{ icon: '', title: '', content: '' }],
            productBigDescription: [{ name: '', title: '', content: '' }],
            ...defaultValues,
        },
    });

    {
        error &&
            console.error(error)
    }

    const [currentStep, setCurrentStep] = useState(0);

    const stepFieldsMap = [
        ['name', 'slug', 'shortDescription', 'images', 'categories', 'tags', 'status', 'outOfStock', 'variants'],
        ['multipleUsePoints', 'multipleUseHeading', 'whyToBuy', 'labTestingReport'],
        ['productBigDescription'],
    ];

    const onNext = async () => {
        const valid = await methods.trigger(stepFieldsMap[currentStep]);
        if (valid) setCurrentStep((x) => Math.min(x + 1, steps.length - 1));
    };

    const onPrevious = () => setCurrentStep((x) => Math.max(x - 1, 0));
    const goToStep = (idx) => idx !== currentStep && setCurrentStep(idx);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex relative"
                noValidate
            >
                {/* Vertical Step Indicator */}
                <aside className="w-50 pr-4 sticky top-0 h-full">
                    <nav className="flex flex-col space-y-4">
                        {steps.map((step, idx) => {
                            const isCompleted = idx < currentStep;
                            const isCurrent = idx === currentStep;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => goToStep(idx)}
                                    className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 text-left
                    ${isCurrent ? 'bg-gray-600 text-white shadow-lg' : isCompleted ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors
                      ${isCurrent ? 'bg-white text-gray-600' : isCompleted ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            <span className="text-sm font-medium">{idx + 1}</span>
                                        )}
                                    </div>
                                    <span className={`${isCurrent ? 'font-semibold' : 'font-medium'}`}>{step.title}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Form Content */}
                <div className="flex-1">
                    <div className="transition-opacity duration-300">
                        {currentStep === 0 && <Step1BasicDetails />}
                        {currentStep === 1 && <Step2PageDetails />}
                        {currentStep === 2 && <Step3PageContent />}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onPrevious}
                            disabled={currentStep === 0}
                            className="min-w-[120px] border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Previous
                        </Button>

                        {currentStep < steps.length - 1 ? (
                            <div
                                onClick={onNext}
                                className="flex items-center justify-center px-6 text-white bg-gray-500 hover:bg-gray-600 cursor-pointer border border-gray-300 transition-all ease-in-out duration-200 rounded-md"
                            >
                                Continue
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                className="min-w-[120px] bg-gray-500 hover:bg-gray-600 text-white"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
                                Submit
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
