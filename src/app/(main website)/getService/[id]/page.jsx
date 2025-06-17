// app/getService/[id]/page.jsx
import React from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getHomePageData } from '@/lib/main/getHomePageData';
import { getSubServiceById } from '@/lib/main/getSubServiceById'
import Image from 'next/image';
import SubServiceClient from './components/SubServiceClient';

export default async function page({ params }) {

    const { services, categories } = await getHomePageData();
    const subService = await getSubServiceById(params.id)
    console.log(subService)

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center gap-6 mb-8">
                    <Image
                        src={subService.serviceId.imageURL}
                        height={200}
                        width={200}
                        alt='image'
                        className=' rounded-xl w-16 h-16'
                    />
                    <div>
                        <h1 className="text-sm text-gray-500">Service</h1>
                        <h2 className="text-xl font-bold">{subService.serviceId.name}</h2>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{subService.name}</h1>

                    <div className="flex items-baseline gap-3 my-4">
                        {subService.discountedPrice ? (
                            <>
                                <span className="text-3xl font-bold text-primary">
                                    ₹{subService.discountedPrice}
                                </span>
                                <span className="text-lg text-gray-500 line-through">
                                    ₹{subService.actualPrice}
                                </span>
                                <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                                    Save ₹{subService.actualPrice - subService.discountedPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-primary">
                                ₹{subService.actualPrice}
                            </span>
                        )}
                    </div>
                </div>
                <SubServiceClient
                    subService={subService}
                />
            </div>
        </WebsiteLayout>
    )
}
