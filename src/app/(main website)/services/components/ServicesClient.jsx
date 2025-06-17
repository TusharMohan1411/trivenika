'use client'
import React, { useState } from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'
import CategoriesBox from './CategoriesBox'
import ServicesBox from './ServicesBox'
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard'

export default function ServicesClient({ services, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(s => s.categories.includes(selectedCategory))

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className='mb-10'>
                {/* Enhanced Hero Section */}
                <div className="w-full bg-gradient-to-r from-[#001a33] to-[#002244] py-12 md:py-14 text-white mb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight'>
                            Our Services
                        </h1>
                        <p className='max-w-2xl mx-auto text-md md:text-lg text-blue-100 opacity-90'>
                            Expert solutions tailored to your specific needs
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col lg:flex-row gap-8 mb-12'>
                        {/* Left Sidebar - Sticky on desktop */}
                        <div className='w-full lg:w-1/4 sm:flex flex-col gap-6 hidden'>
                            <div className='sticky top-24'>
                                <CategoriesBox
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={setSelectedCategory}
                                />

                                <div className='mt-6 hidden lg:block'>
                                    <TalkToLawyerCard />
                                </div>
                            </div>
                        </div>

                        {/* Services Grid */}
                        <div className='w-full lg:w-3/4'>
                            <div className='mb-6 flex justify-between items-center'>
                                <h2 className='text-2xl font-bold text-gray-800'>
                                    {selectedCategory === 'all'
                                        ? 'All Services'
                                        : `Services`
                                    }
                                </h2>
                                <span className='text-gray-500'>
                                    {filteredServices.length} services available
                                </span>
                            </div>

                            <ServicesBox services={filteredServices} />
                        </div>
                    </div>

                    {/* Mobile-only TalkToLawyerCard */}
                    <div className='lg:hidden mt-8'>
                        <TalkToLawyerCard />
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    )
}