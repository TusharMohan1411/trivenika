'use client'
import React from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'
import ServicesBox from './ServicesBox'

export default function ServicesClient({ services }) {
    return (
        <WebsiteLayout>
            <div className='pb-10 sm:pb-20'>
                {/* Enhanced Header Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#e8f5e9] to-transparent opacity-90"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[url('/images/nature-pattern.svg')] bg-repeat-x opacity-20"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center mb-4">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                <span className="text-emerald-600 font-medium">100% Natural Products</span>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full ml-2"></div>
                            </div>

                            <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl mb-5 tracking-tight text-gray-900'>
                                Pure Nature, <span className="text-emerald-600">Pure Wellness</span>
                            </h1>

                            <p className="text-xs md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                                Discover our carefully crafted natural products that bring harmony to your body and soul.
                                Each formulation is a blend of traditional wisdom and modern science.
                            </p>

                            <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
                                {['Organic', 'Chemical-Free', 'Sustainable', 'Cruelty-Free'].map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs sm:text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid Section */}
                <div className='w-full mt-6'>
                    <ServicesBox services={services} />
                </div>
            </div>
        </WebsiteLayout>
    )
}