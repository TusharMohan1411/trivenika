// app/admin/collections/components/ProductCardColl.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import { BiSolidLeaf } from 'react-icons/bi';

export default function ProductCardColl({
    product = {},
    variant = {},
    isSelected = false,
}) {
    const discount = (variant.actualPrice || 0) - (variant.discountedPrice || 0);
    const discountPercent = variant.actualPrice
        ? Math.round((discount / variant.actualPrice) * 100)
        : 0;

    return (
        <div
            className={`group relative border rounded-md p-2 bg-white shadow-sm transition duration-300 cursor-pointer ${isSelected ? 'border-green-600 ring-2 ring-green-500' : 'hover:shadow-md border-gray-300'
                }`}
        >
            {discountPercent > 0 && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {discountPercent}% OFF
                </div>
            )}

            <div className="w-full h-32 flex items-center justify-center overflow-hidden mb-2">
                <Image
                    src={variant.image || product.images?.[0] || '/placeholder.png'}
                    alt={`${product.name || ''} ${variant.name || ''}`}
                    width={100}
                    height={100}
                    className="object-contain"
                />
            </div>

            <div className="text-sm">
                <p className="font-semibold line-clamp-2">{product.name || '—'}</p>
                <p className="text-gray-500 text-xs">{variant.name || '—'}</p>
                <div className="flex items-center gap-2">
                    <span className="font-bold">₹{variant.discountedPrice ?? '—'}</span>
                    {variant.discountedPrice < variant.actualPrice && (
                        <>
                            <span className="line-through text-gray-400 text-xs">₹{variant.actualPrice}</span>
                            <BiSolidLeaf className="text-green-600" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
