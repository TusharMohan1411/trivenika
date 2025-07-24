'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiSolidLeaf } from 'react-icons/bi';
import { IoCartOutline } from "react-icons/io5";
import { useCartStore } from '@/store/cartStore';

function ProductCard2({ product }) {
    const variant = product?.variants[0];

    const discountPercent = Math.round(
        ((variant.actualPrice - variant.discountedPrice) / variant.actualPrice) * 100
    );

    const { cart, addToCart, updateQuantity } = useCartStore();

    const existingCartItem = cart.find(
        (item) =>
            item.productId === product._id && item.variantId === variant._id
    );

    return (
        <div className="group bg-white border border-gray-300 rounded-md overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">

            <Link
                href={`/products/${product.slug}`}
            >
                <div className="relative aspect-square w-full">
                    {/* Redesigned Discount Ribbon */}
                    {discountPercent > 0 && (
                        <div className="absolute top-3 right-3 z-10">
                            <div className="relative">
                                <div className="absolute -top-1 -right-1 w-16 h-6 sm:h-8 bg-green-600 transform rotate-6 rounded-sm"></div>
                                <div className="relative w-16 h-6 sm:h-8 bg-green-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                                    {discountPercent}% OFF
                                </div>
                            </div>
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
            </Link>
            <div className="p-4 flex flex-col flex-grow justify-between">
                <Link href={`/products/${product.slug}`}>
                    <div>
                        <div className='flex justify-between items-center gap-2 mb-2'>
                            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
                                {variant.name}
                            </p>
                        </div>
                        <h3 className="text-gray-900 font-bold text-sm sm:text-lg line-clamp-2">
                            {product.name}
                        </h3>
                    </div>
                </Link>

                {/* Bottom section will always stay at bottom */}
                <div className="mt-auto pt-4 flex items-center justify-between w-full">
                    <div className='flex flex-col'>
                        <div className="flex max-[450px]:flex-col flex-row min-[450px]:items-center min-[450px]:gap-2">
                            {variant.discountedPrice < variant.actualPrice ? (
                                <>
                                    <span className=" font-bold text-base sm:text-2xl">
                                        ₹{variant.discountedPrice}
                                    </span>
                                    <span className="line-through text-gray-400 text-xs sm:text-sm">
                                        ₹{variant.actualPrice}
                                    </span>
                                </>
                            ) : <span className="font-bold text-base sm:text-2xl">
                                ₹{variant.actualPrice}
                            </span>
                            }
                        </div>
                        {discountPercent > 0 && (
                            <p className="text-green-700 max-[380px]:hidden flex gap-1 sm:gap-2 items-center justify-center mt-0  w-fit text-xs font-semibold">
                                <span>  <BiSolidLeaf /></span> Save ₹{(variant.actualPrice - variant.discountedPrice).toLocaleString()}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        {product?.outOfStock ? (
                            <p className='border bg-gray-100 text-gray-700 text-sm rounded-md px-2 py-1 max-[500px]:max-w-16 text-wrap text-center'>
                                Out of stock
                            </p>
                        ) : existingCartItem ? (
                            <div className="flex items-center border border-primary rounded-md overflow-hidden text-primary text-sm">
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            product._id,
                                            variant._id,
                                            existingCartItem.quantity - 1
                                        )
                                    }
                                    className="px-2 py-1 hover:bg-primary hover:text-white transition"
                                >
                                    –
                                </button>
                                <div className="px-3 py-1 bg-primary text-white">
                                    {existingCartItem.quantity}
                                </div>
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            product._id,
                                            variant._id,
                                            existingCartItem.quantity + 1
                                        )
                                    }
                                    className="px-2 py-1 hover:bg-primary hover:text-white transition"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product, variant)}
                                className="border border-primary text-primary px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-[#f0f4f9] transition flex-1 text-center flex gap-1 items-center justify-center"
                            >
                                <IoCartOutline size={16} /> Add
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductCard2;




