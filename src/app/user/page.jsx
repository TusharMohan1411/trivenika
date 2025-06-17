import React from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getHomePageData } from '@/lib/main/getHomePageData';
import UserMain from './components/UserMain';

export default async function page() {

    const { services, categories } = await getHomePageData();

    return (
        <WebsiteLayout services={services} categories={categories}>
            <UserMain />
        </WebsiteLayout>
    )
}