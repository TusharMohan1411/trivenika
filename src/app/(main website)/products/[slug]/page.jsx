// app/services/[slug]/page.jsx
export const revalidate = 60;
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getAllServicesSlugs, getRelatedServices, getServiceBySlug } from '@/lib/main/services';
import { notFound } from 'next/navigation';
import ProductHeroSection from './components/productHeroSection';
import MultipleUses from './components/MultipleUses';
import WhyToBuySection from './components/WhyToBuySection';
import LabTestingSection from './components/LabTestingSection';
import LatestServices from '@/components/website/LatestServices';
import TestimonialSlider from '@/components/website/home/TestimonialSlider';
import RelatedProducts from '@/components/website/RelatedProducts';

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
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`,
        },
        openGraph: {
            title: product.name,
            description: product.shortDescription,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`,
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

async function Page({ params }) {

    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }
    const relatedServices = await getRelatedServices(service)


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
                                "@type": "website",
                                name: service.name,
                                description: service.shortDescription,
                                image: service.images[0],
                                brand: {
                                    "@type": "Brand",
                                    name: "Trivenika"
                                },
                                offers: {
                                    "@type": "Offer",
                                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${service.slug}`,
                                    priceCurrency: "INR",
                                    price: service.variants?.[0]?.discountedPrice || service.variants?.[0]?.actualPrice || 0,
                                    availability: service.outOfStock ? "OutOfStock" : "InStock"
                                }
                            }),
                        }}
                    />

                    <section className="flex gap-4 lg:gap-10 flex-col lg:flex-row relative">
                        <div className="flex-1 h-full flex flex-col">
                            <div className='mb-4 space-y-0'>
                                <ProductHeroSection product={service} />
                                <WhyToBuySection whyToBuy={service.whyToBuy} productName={service?.name} />
                                <LabTestingSection labTestingImage={service.labTestingReport} />
                                <TestimonialSlider />
                                <MultipleUses multipleUseHeading={service.multipleUseHeading} multipleUsePoints={service.multipleUsePoints} />
                                <RelatedProducts products={relatedServices} />
                                <LatestServices />
                            </div>
                        </div>
                    </section>

                </article>
            </main>
        </WebsiteLayout >
    );
}

export default Page;

