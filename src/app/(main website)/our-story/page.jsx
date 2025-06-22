import WebsiteLayout from '@/components/website/WebsiteLayout'
import React from 'react'
import StoryMain from './components/StoryMain'

function page() {
    return (
        <WebsiteLayout>
            <StoryMain />
        </WebsiteLayout>
    )
}

export default page