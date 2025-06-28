'use client';
import React from 'react';
import Image from 'next/image';
import { BiSolidLeaf } from 'react-icons/bi';

export default function ProductCardColl({ product, variant, isSelected = false }) {
    const discount = variant.actualPrice - variant.discountedPrice;
    const discountPercent = Math.round((discount / variant.actualPrice) * 100);

    return (
        <div
            className={`group relative border rounded-md p-2 bg-white shadow-sm transition-all duration-300 cursor-pointer 
            ${isSelected ? 'border-green-600 ring-2 ring-green-500' : 'hover:shadow-md border-gray-300'}`}
        >
            {/* Discount badge */}
            {discountPercent > 0 && (
                <div className="absolute top-2 right-2 z-10">
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                        {discountPercent}% OFF
                    </div>
                </div>
            )}

            {/* Image */}
            <div className="w-full h-32 flex items-center justify-center overflow-hidden mb-2">
                <Image
                    src={variant.image}
                    alt={`${product.name} - ${variant.name}`}
                    width={100}
                    height={100}
                    className="object-contain max-h-full"
                />
            </div>

            {/* Product Info */}
            <div className="text-sm space-y-1">
                <p className="text-gray-900 font-semibold line-clamp-2">{product.name}</p>
                <p className="text-gray-500 text-xs line-clamp-1">{variant.name}</p>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-green-700 font-bold text-sm">
                        ₹{variant.discountedPrice}
                    </span>
                    {variant.discountedPrice < variant.actualPrice && (
                        <>
                            <span className="line-through text-gray-400 text-xs">
                                ₹{variant.actualPrice}
                            </span>
                            <span className="text-green-600 flex items-center text-xs font-medium">
                                <BiSolidLeaf className="mr-1" />
                                Save ₹{discount}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
