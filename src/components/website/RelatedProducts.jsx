'use client';

import React from 'react';
import ProductCard from './ProductCard';
import AnimatedGrid2 from './AnimatedGrid2';

function RelatedProducts({ products }) {
    return (
        <section className="pt-20 pb-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                        Explore <span className="text-emerald-600">Related </span>Products
                    </h2>
                </div>
                <AnimatedGrid2
                    services={products}
                />
            </div>
        </section>
    );
}

export default RelatedProducts;
