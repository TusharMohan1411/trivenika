'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiSolidLeaf } from 'react-icons/bi';
import { IoCartOutline } from "react-icons/io5";

function ProductCard({ product, variant }) {
    const discountPercent = Math.round(
        ((variant.actualPrice - variant.discountedPrice) / variant.actualPrice) * 100
    );

    return (
        <div className="group bg-white border border-gray-300 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
            <div className="relative aspect-square w-full">
                {/* Discount Ribbon */}
                {discountPercent > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        {discountPercent}% OFF
                    </div>
                )}
                <Image
                    src={variant.image}
                    alt={`${product.name} - ${variant.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2 flex-grow">
                    <div className='flex justify-between items-center gap-2 mb-3'>
                        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
                            {variant.name}
                        </p>

                        {discountPercent > 0 && (
                            <p className="text-green-700 flex gap-2 items-center justify-center mt-0 bg-green-100 rounded-full px-4 py-1 w-fit text-xs font-semibold">
                                <span>  <BiSolidLeaf /></span> Save ₹{(variant.actualPrice - variant.discountedPrice).toLocaleString()}
                            </p>
                        )}
                    </div>
                    <h3 className=" text-gray-900 font-semibold text-sm sm:text-lg line-clamp-2">
                        {product.name}
                    </h3>
                    {/* <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                        {product.shortDescription}
                    </p> */}
                </div>

                <div className="mt-2 flex items-center justify-between w-full">
                    <div className='flex flex-col'>
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold text-base sm:text-2xl">
                                ₹{variant.discountedPrice}
                            </span>

                            {variant.discountedPrice < variant.actualPrice && (
                                <span className="line-through text-gray-400 text-xs sm:text-sm">
                                    ₹{variant.actualPrice}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <button className="border border-primary text-primary px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-[#f0f4f9] transition flex-1 text-center flex gap-1 items-center justify-center">
                            <span>   <IoCartOutline size={16} /></span>  Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;