// app/collections/[slug]/page.jsx
export const revalidate = 60;
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getCollectionBySlug } from '@/lib/main/services';
import Image from 'next/image';
import React from 'react';
import ProductCard from '../../products/components/ProductCard';
import LatestServices from '@/components/website/LatestServices';
import LatestBlogs from '@/components/website/LatestBlogs';
import CollectionsBar from '@/components/website/CollectionsBar';
import SaleCountdownTimer from '@/components/website/SaleCountdownTimer';

export default async function Page({ params }) {
    const collection = await getCollectionBySlug(params.slug);
    const items = collection?.products.map((item) => {
        const variant = item?.productId?.variants?.find((v) => v.name === item.variantName) || {
            name: item.variantName,
            _id: item.variantId,
            actualPrice: 0,
            discountedPrice: 0,
            image: item.images?.[0] || '',
        };

        return { product: item.productId, variant };
    });

    // console.log(collection)

    return (
        <WebsiteLayout>
            {/* Simple Banner Image */}
            <div className='pb-16'>
                <div className="">
                    {collection.bannerImage &&
                        <Image
                            src={collection.bannerImage}
                            height={2000}
                            width={2000}
                            quality={100}
                            alt='banner'
                            className="h-full w-full object-cover aspect-[1200/500] sm:aspect-[1200/300]"
                            priority
                        />
                    }
                </div>
                <div className='px-1'>
                    <CollectionsBar />
                </div>

                {/* Clean Heading Section */}
                <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-4 sm:pt-6">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl md:text-4xl font-bold text-[#1a3c32] mb-6">
                            {collection.heading}
                        </h1>

                        {/* Add Countdown Timer Here */}
                        {collection.saleStart && collection.saleEnd && (
                            <SaleCountdownTimer saleEnd={collection.saleEnd} saleStart={collection.saleStart} />
                        )}
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
                        {items.map(({ product, variant }) => (
                            <ProductCard
                                key={`${product._id}-${variant._id}`}
                                product={product}
                                variant={variant}
                            />
                        ))}
                    </div>
                </div>

                <LatestServices />
            </div>
        </WebsiteLayout>
    );
}