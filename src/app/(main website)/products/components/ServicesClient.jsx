'use client'
import React from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'
import ServicesBox from './ServicesBox'

export default function ServicesClient({ services }) {

    console.log('services', services)

    return (
        <WebsiteLayout>
            <div className='mb-10'>
                <div className="w-full bg-gradient-to-r from-[#003327] to-[#014b2d] py-12 md:py-14 text-white mb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight'>
                            Our Products
                        </h1>
                        <p className='max-w-2xl mx-auto text-md md:text-lg text-blue-100 opacity-90'>
                            Expert solutions tailored to your specific needs
                        </p>
                    </div>
                </div>

                <div className='w-full'>
                    <ServicesBox services={services} />
                </div>
            </div>
        </WebsiteLayout>
    )
}