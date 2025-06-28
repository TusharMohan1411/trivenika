// app/collections/[slug]/page.jsx
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getCollectionBySlug } from '@/lib/main/services';
import Image from 'next/image';
import React from 'react';
import ProductCard from '../../products/components/ProductCard';
import LatestServices from '@/components/website/LatestServices';
import LatestBlogs from '@/components/website/LatestBlogs';
import CollectionsBar from '@/components/website/CollectionsBar';

export default async function Page({ params }) {
    const collection = await getCollectionBySlug(params.slug);
    const items = collection?.products.map((item) => {
        const variant = item?.productId?.variants?.find((v) => v._id === item.variantId) || {
            name: item.variantName,
            _id: item.variantId,
            actualPrice: 0,
            discountedPrice: 0,
            image: item.images?.[0] || '',
        };

        return { product: item.productId, variant };
    });

    console.log(collection)

    return (
        <WebsiteLayout>
            {/* Simple Banner Image */}
            <div className='pb-16'>
                <div className="w-full h-64 md:h-80 relative">
                    {collection.bannerImage &&
                        <Image
                            src={collection.bannerImage}
                            alt={collection.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    }
                </div>

                <CollectionsBar />

                {/* Clean Heading Section */}
                <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1a3c32] mb-6">
                            {collection.heading}
                        </h1>
                        {collection.description && (
                            <p className="text-lg text-[#1a3c32]/80 max-w-2xl mx-auto">
                                {collection.description}
                            </p>
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
                <LatestBlogs />
            </div>
        </WebsiteLayout>
    );
}