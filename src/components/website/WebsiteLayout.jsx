"use client"
import React from 'react'
import Footer from '@/components/website/common/Footer'
import NavBar from '@/components/website/common/Navbar'

export default function WebsiteLayout({ children }) {

    return (
        <div >
            <div className=''>
                <NavBar />
            </div>

            <div className='min-h-screen bg-[#FDFBF7]'>
                {children}
            </div>

            <Footer />
        </div>
    )
}
