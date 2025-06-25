'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import WebsiteLayout from '@/components/website/WebsiteLayout'

function layout({ children }) {
    return (
        <SessionProvider>
            <WebsiteLayout>
                {children}
            </WebsiteLayout>
        </SessionProvider>
    )
}

export default layout