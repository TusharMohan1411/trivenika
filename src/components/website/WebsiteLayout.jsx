"use client"
import React from 'react'
import Footer from '@/components/website/common/Footer'
import NavBar from '@/components/website/common/Navbar'

export default function WebsiteLayout({ children }) {

    return (
        <div className='pb-14 sm:pb-0 bg-[#F5EFE6]'>
            <div className='pb-6 sm:pb-12 bg-[#F5EFE6]'>
                <NavBar />
            </div>

            <div className='min-h-screen bg-[#FDFBF7]'>
                {children}
            </div>

            <Footer />
        </div>
    )
}
