import Image from 'next/image'
import React from 'react'
import AnimatedGrid from '../AnimatedGrid'
import ProductCard from '@/app/(main website)/products/components/ProductCard';

export default function HomePageCollections({ cols }) {

    function findItems(collection) {
        const items = collection?.products?.map((item) => {
            const variant = item?.productId?.variants?.find((v) => v._id === item.variantId) || {
                name: item.variantName,
                _id: item.variantId,
                actualPrice: 0,
                discountedPrice: 0,
                image: item.images?.[0] || '',
            };

            return { product: item.productId, variant };
        });

        return items;
    }

    return (
        <div className='space-y-10 sm:space-y-20 max-w-7xl mx-auto px-3 pb-20 sm:pb-10'>
            {cols.map((c, idx) => {
                const items = findItems(c);
                console.log(c)
                return (
                    <section key={idx}>
                        <div>
                            <Image
                                src={c?.bannerImage || ""}
                                height={1000}
                                width={1000}
                                alt='banner'
                                className='h-full w-full object-cover rounded-sm sm:rounded-xl aspect-[1200/500] sm:aspect-[1200/300]'
                            />
                        </div>
                        <h2 className='font-bold text-primary text-2xl py-5 text-center'>{c?.heading}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
                            {items?.map(({ product, variant }) => (
                                <ProductCard
                                    key={`${product._id}-${variant._id}`}
                                    product={product}
                                    variant={variant}
                                />
                            ))}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}
