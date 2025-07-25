export const revalidate = 60;

import WebsiteLayout from '@/components/website/WebsiteLayout';
import { notFound } from 'next/navigation';
import {
    getAllServicesSlugs,
    getRelatedServices,
    getServiceBySlug
} from '@/lib/main/services';

import ProductHeroSection from './components/productHeroSection';
import WhyToBuySection from './components/WhyToBuySection';
import LabTestingSection from './components/LabTestingSection';
import MultipleUses from './components/MultipleUses';
import RelatedProducts from '@/components/website/RelatedProducts';
import LatestServices from '@/components/website/LatestServices';
import TestimonialSlider from '@/components/website/home/TestimonialSlider';

// ✅ Generate static pages
export async function generateStaticParams() {
    const services = await getAllServicesSlugs();
    return services.map(service => ({ slug: service.slug }));
}

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
    const product = await getServiceBySlug(params.slug);

    if (!product) {
        return {
            title: "Product Not Found",
            description: "The requested product does not exist",
        };
    }

    return {
        title: product.name,
        description: product.shortDescription,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${product.slug}`,
        },
        openGraph: {
            title: product.name,
            description: product.shortDescription,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${product.slug}`,
            images: product.images,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.shortDescription,
            images: product.images,
        },
    };
}

// ✅ Actual Page
async function Page({ params }) {
    const product = await getServiceBySlug(params.slug);
    if (!product) notFound();

    const relatedServices = await getRelatedServices(product);

    return (
        <WebsiteLayout>
            <main className="mx-auto max-[640px]:px-2 max-[640]:pt-10 py-2 sm:py-8">
                <article className="mx-auto">
                    {/* ✅ JSON-LD Structured Product Data */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Product",
                                name: product.name,
                                description: product.shortDescription,
                                image: product.images[0],
                                brand: {
                                    "@type": "Brand",
                                    name: "Trivenika"
                                },
                                offers: {
                                    "@type": "Offer",
                                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${product.slug}`,
                                    priceCurrency: "INR",
                                    price: product.variants?.[0]?.discountedPrice || product.variants?.[0]?.actualPrice || 0,
                                    availability: product.outOfStock ? "OutOfStock" : "InStock"
                                }
                            }),
                        }}
                    />

                    {/* ✅ Page Content */}
                    <section className="flex gap-4 lg:gap-10 flex-col lg:flex-row relative">
                        <div className="flex-1 h-full flex flex-col space-y-4">
                            <ProductHeroSection product={product} />
                            <WhyToBuySection whyToBuy={product.whyToBuy} productName={product.name} />
                            <LabTestingSection labTestingImage={product.labTestingReport} />
                            <TestimonialSlider />
                            <MultipleUses multipleUseHeading={product.multipleUseHeading} multipleUsePoints={product.multipleUsePoints} />
                            <RelatedProducts products={relatedServices} />
                            <LatestServices />
                        </div>
                    </section>
                </article>
            </main>
        </WebsiteLayout>
    );
}

export default Page;
