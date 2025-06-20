import React from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout';
import UserMain from './components/UserMain';

export default async function page() {

    return (
        <WebsiteLayout>
            <UserMain />
        </WebsiteLayout>
    )
}