'use client';
import React from 'react';
import Image from 'next/image';
import { BiSolidLeaf } from 'react-icons/bi';

export default function ProductCardColl({
    product = {},
    variant = {},
    isSelected = false,
}) {
    const actual = Number(variant.actualPrice) || 0;
    const discounted = Number(variant.discountedPrice) || 0;
    const hasDiscount = actual > 0 && discounted > 0 && discounted < actual;
    const discountPercent = hasDiscount ? Math.round(((actual - discounted) / actual) * 100) : 0;

    return (
        <div
            role="button"
            className={`flex items-center bg-white gap-3 p-2 rounded-md border-2 text-xs transition-colors duration-150 cursor-pointer ${isSelected ? 'border-green-500' : 'border-gray-200 '
                }`}
        >
            <div className="w-14 h-14 relative flex-shrink-0">
                <Image
                    src={variant.image || product.images?.[0] || '/placeholder.png'}
                    alt={`${product.name || ''} ${variant.name || ''}`}
                    fill
                    sizes="56px"
                    className="object-contain rounded-sm"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <p className="font-medium truncate text-sm">{product.name || '—'}</p>
                    {hasDiscount && (
                        <span className="text-[10px] font-semibold px-1 py-0.5 rounded bg-green-100 text-green-800">
                            {discountPercent}%
                        </span>
                    )}
                </div>

                <p className="text-gray-500 truncate text-[11px]">{variant.name || '—'}</p>

                <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-sm">₹{discounted || '—'}</span>
                    {hasDiscount && (
                        <span className="line-through text-gray-400 text-[11px]">₹{actual}</span>
                    )}
                    {hasDiscount && <BiSolidLeaf className="text-green-500 text-[14px] ml-1" />}
                </div>
            </div>
        </div>
    );
}
