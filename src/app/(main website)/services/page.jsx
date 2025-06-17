import React from 'react'
import ServicesClient from './components/ServicesClient'
import { getHomePageData } from '@/lib/main/getHomePageData';

export default async function Page() {
    const { services, categories } = await getHomePageData();

    return <ServicesClient services={services} categories={categories} />
}
