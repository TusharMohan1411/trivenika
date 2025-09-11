// app/collections/[slug]/page.jsx
export const revalidate = 60;
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getAllCollectionsSlugs, getCollectionBySlug } from '@/lib/main/services';
import Image from 'next/image';
import React from 'react';
import ProductCard from '../../products/components/ProductCard';
import LatestServices from '@/components/website/LatestServices';
import LatestBlogs from '@/components/website/LatestBlogs';
import CollectionsBar from '@/components/website/CollectionsBar';
import SaleCountdownTimer from '@/components/website/SaleCountdownTimer';

export async function generateStaticParams() {
    const collections = await getAllCollectionsSlugs();
    return collections.map(cl => ({
        slug: cl.slug,
    }));
}

export async function generateMetadata({ params }) {
    const collection = await getCollectionBySlug(params.slug);

    if (!collection) {
        return {
            title: "Collection Not Found | Trivenika Organic",
            description: "The requested collection does not exist.",
        };
    }

    return {
        title: `${collection.heading} | Trivenika Organic`,
        description: collection.shortDescription || `Shop ${collection.heading} from Trivenika Organic. Explore pure, natural, and wood-pressed oils made with the traditional method.`,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${collection.slug}`,
        },
        openGraph: {
            title: `${collection.heading} | Trivenika Organic`,
            description: collection.shortDescription || `Discover our exclusive ${collection.heading} collection.`,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${collection.slug}`,
            images: collection.bannerImage
                ? [{ url: collection.bannerImage, width: 1200, height: 630, alt: collection.heading }]
                : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${collection.heading} | Trivenika Organic`,
            description: collection.shortDescription || `Explore premium wood-pressed oils from Trivenika Organic.`,
            images: collection.bannerImage ? [collection.bannerImage] : [],
        },
    };
}


export default async function Page({ params }) {
    const collection = await getCollectionBySlug(params.slug);

    const items = collection?.products?.map((item) => {
        const variant = item?.productId?.variants?.find((v) => v.name === item.variantName) || {
            name: item.variantName,
            _id: item.variantId,
            actualPrice: 0,
            discountedPrice: 0,
            image: item.images?.[0] || '',
        };

        return { product: item.productId, variant };
    });

    return (
        <WebsiteLayout>
            {/* Simple Banner Image */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": collection.heading,
                        "description": collection.shortDescription || `Browse ${collection.heading} collection at Trivenika Organic.`,
                        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${collection.slug}`,
                        "image": collection.bannerImage,
                        "isPartOf": {
                            "@type": "Website",
                            "name": "Trivenika Organic",
                            "url": "https://www.trivenika.in"
                        }
                    }),
                }}
            />

            <div className='pb-16 pt-5 sm:pt-0'>
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
                        {items?.map(({ product, variant }) => (
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