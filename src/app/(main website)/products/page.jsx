export const revalidate = 60;
import React from 'react'
import ServicesClient from './components/ServicesClient'
import { getHomePageData } from '@/lib/main/getHomePageData';

export default async function Page() {
    const { services } = await getHomePageData();

    return <ServicesClient services={services} />
}
