"use client"
import React from 'react'
import Footer from '@/components/website/common/Footer'
import NavBar from '@/components/website/common/Navbar'

export default function WebsiteLayout({ services, categories, children }) {

    return (
        <div className='bg-[#FDFBF7]'>
            <div className=''>
                <NavBar services={services} categories={categories} />
            </div>

            <div className='min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#eef2f7]'>
                {children}
            </div>

            <Footer />
        </div>
    )
}
