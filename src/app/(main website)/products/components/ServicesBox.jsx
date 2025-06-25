'use client';
import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

function ServicesBox({ services }) {
    return (
        <div className="w-full px-2 sm:px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5">
                {services?.map(product =>
                    product.variants.map(variant => (
                        <ProductCard
                            key={variant._id}
                            product={product}
                            variant={variant}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default ServicesBox;
