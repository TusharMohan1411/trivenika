import React from 'react'
import Contact from '@/components/website/home/Contact';
import { getHomePageData } from '@/lib/main/getHomePageData';
import WebsiteLayout from '@/components/website/WebsiteLayout';

export default async function page() {
    const { services, categories } = await getHomePageData();

    return (
        <WebsiteLayout services={services} categories={categories}>
            <Contact />
        </WebsiteLayout>
    )
}
