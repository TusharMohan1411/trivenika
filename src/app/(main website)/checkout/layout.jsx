'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

function layout({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default layout