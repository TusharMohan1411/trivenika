// app/blogs/[slug]page.jsx
export const revalidate = 60;

import EnquiryForm from '@/components/website/EnquiryForm';
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getBlogBySlug } from '@/lib/main/getBlogsData';
import { getHomePageData } from '@/lib/main/getHomePageData';
import React from 'react'
import BlogData from '../components/BlogData';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import LatestBlogs from '@/components/website/LatestBlogs';
import { Separator } from '@/components/ui/separator';
import LatestServices from '@/components/website/LatestServices';
import RelatedProducts from '@/components/website/RelatedProducts';
import { getRelatedServices } from '@/lib/main/services';

export default async function page({ params }) {
    const { services, categories } = await getHomePageData();

    const slug = await params
    const blog = await getBlogBySlug(slug.slug)

    const relatedServices = await getRelatedServices(blog)

    return (
        <WebsiteLayout >
            <article className="max-w-7xl mx-auto space-y-5 px-2">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Blog",
                            "name": blog.title,
                            "description": blog.shortDescription,
                            "image": blog.imageURL,
                            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`
                        })
                    }}
                />
                <section className="flex gap-4 lg:gap-10 flex-col lg:flex-row pt-5">
                    <div className="flex-1 h-full flex flex-col">
                        <Breadcrumb className="mb-1 px-2">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{blog.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <BlogData blog={blog} />
                    </div>
                    <div className="lg:w-82 flex flex-col gap-5 lg:sticky lg:top-28 lg:h-fit">
                        <div>
                            <div className='flex flex-col gap-4'>
                                {/* {relatedServices.map((item, idx) => (
                                <div key={idx}>
                                    <ServiceCard service={item} />
                                </div>
                            ))} */}
                            </div>
                        </div>
                        {/* <TalkToLawyerCard /> */}
                        <EnquiryForm />
                    </div>
                </section>

                <Separator className={'mt-10'} />

                <RelatedProducts products={relatedServices} />

                <LatestServices />

                <div>
                    <LatestBlogs />
                </div>

            </article>
        </WebsiteLayout >
    )
}

