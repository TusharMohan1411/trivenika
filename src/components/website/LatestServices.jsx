import React from 'react';
import { getLatestServices } from '@/lib/main/services';
import ProductCard2 from './ProductCard2';
import AnimatedGrid from './AnimatedGrid';

async function LatestServices() {
    const services = await getLatestServices() || [];

    return (
        <section className="pt-12 pb-6 px-4 sm:px-0">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                        Shop Our <span className="text-emerald-600">New Arrivals</span>
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        Newly arrived healthy and natural products
                    </p>
                </div>

                {/* Client-side animation handled here */}
                <AnimatedGrid services={services} />

                <div className="mt-12 text-center">
                    {/* Same button */}
                </div>
            </div>
        </section>
    );
}

export default LatestServices;
