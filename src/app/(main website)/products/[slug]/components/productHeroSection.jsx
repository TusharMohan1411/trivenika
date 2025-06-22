// components/productHeroSection.jsx
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Separator } from '@/components/ui/separator';
import { BiSolidLeaf } from "react-icons/bi";

export default function ProductHeroSection({ product }) {
    const { images = [], name, shortDescription, shortPoints = [], variants = [] } = product;
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    console.log(product)
    console.log('quantity', quantity)
    console.log('variant', selectedVariant)

    const addToCart = useCartStore((state) => state.addToCart);

    // Build the image list: selected variant image first, then the rest
    const allImages = useMemo(() => {
        const variantImg = variants[selectedVariant]?.image;
        const rest = images.filter((img) => img !== variantImg);
        return variantImg ? [variantImg, ...rest] : [...images];
    }, [images, variants, selectedVariant]);

    const variant = variants[selectedVariant] || {};
    const { actualPrice = 0, discountedPrice = 0 } = variant;

    const discountPercent = actualPrice > discountedPrice
        ? Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)
        : 0;

    const incQty = () => setQuantity((q) => Math.max(1, q + 1));
    const decQty = () => setQuantity((q) => Math.max(1, q - 1));

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-4 pt-6 max-w-7xl mx-auto">
            {/* Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4 w-full lg:w-1/2">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-2 py-2 md:py-0">
                    {allImages.map((src, i) => (
                        <div
                            key={i}
                            onClick={() => setMainImageIndex(i)}
                            className={`
                                w-16 h-16 cursor-pointer overflow-hidden rounded-lg border-2
                                transition-all duration-200 flex-shrink-0
                                ${i === mainImageIndex
                                    ? 'border-green-500 scale-105 shadow-md'
                                    : 'border-gray-200 hover:border-green-300'}
                            `}
                        >
                            <Image
                                src={src}
                                alt={`${name} thumbnail ${i}`}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>

                {/* Main Image */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 border-2">
                    <Image
                        src={allImages[mainImageIndex]}
                        alt={name}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Discount badge */}
                    {discountPercent > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                            {discountPercent}% OFF
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 space-y-5">
                <div className="">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{name}</h1>

                    {/* Short points as pills */}
                    <div className="flex flex-wrap gap-2 mt-5">
                        {shortPoints.map((pt, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                            >
                                {pt}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="text-gray-500 text-sm sm:text-base mt-6">{shortDescription}</p>

                <Separator className={''} />

                {/* Price section */}
                <div className="rounded-lg">
                    <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-bold text-primary">
                            ₹{discountedPrice.toLocaleString()}
                        </span>
                        {discountPercent > 0 && (
                            <span className="line-through text-gray-400 text-4xl font-semibold">
                                ₹{actualPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Savings */}
                    {discountPercent > 0 && (
                        <p className="text-green-700 flex gap-2 items-center justify-center mt-3 bg-green-100 rounded-full px-4 py-1.5 w-fit text-sm font-semibold">
                            <span>  <BiSolidLeaf /></span>  {discountPercent}% Off Save ₹{(actualPrice - discountedPrice).toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Variant selectors */}
                <div className="space-y-3 mt-6">
                    <h3 className="font-semibold text-gray-900">Select Option:</h3>
                    <div className="flex flex-wrap gap-2">
                        {variants.map((v, idx) => {
                            const discount =
                                Math.round(
                                    ((v.actualPrice - v.discountedPrice) / v.actualPrice) * 100
                                ) || 0;

                            const isSelected = idx === selectedVariant;

                            return (
                                <div
                                    key={v._id}
                                    onClick={() => {
                                        setSelectedVariant(idx);
                                        setMainImageIndex(0);
                                    }}
                                    className={`
            px-6 py-3 rounded-xl cursor-pointer transition-all text-center
            ${isSelected
                                            ? 'border border-green-600 text-green-800 bg-white shadow-sm'
                                            : 'border border-transparent bg-gray-100 hover:border-green-500 text-gray-800'}
          `}
                                >
                                    <div className="text-base font-medium">{v.name}</div>
                                    <div
                                        className={`text-sm font-bold ${isSelected ? 'text-green-700' : 'text-green-600'
                                            }`}
                                    >
                                        ({discount}% Off)
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* Quantity + actions */}
                <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            onClick={() => addToCart(product, variant, quantity)}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#5D4037] hover:bg-amber-800 text-white rounded-lg font-medium transition-colors shadow-md"
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 hover:bg-primary bg-green-700 text-white rounded-lg font-medium transition-colors shadow-md">
                            <Zap size={20} />
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}