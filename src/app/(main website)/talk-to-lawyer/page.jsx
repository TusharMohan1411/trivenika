import React from 'react'
import { getHomePageData } from '@/lib/main/getHomePageData';
import TTLClient from './components/TTLClient';
import { getCallPlanData } from '@/lib/main/getStaticData';

export default async function Page() {
    const { services, categories } = await getHomePageData();
    const callPlans = await getCallPlanData()

    return <TTLClient services={services} categories={categories} callPlans={callPlans} />
}
