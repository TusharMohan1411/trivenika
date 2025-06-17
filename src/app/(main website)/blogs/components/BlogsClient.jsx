"use client"

import React, { useState, useEffect, useRef } from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'
import BlogList from './BlogList';
import Loader from '@/components/Loader';
// import BlogList from './BlogList'
// import TalkToLawyerCard from '@/components/website/TalkToLawyerCard'
// import CategoriesFilter from './CategoryFilter'
// import { getBlogsData } from '@/lib/main/getBlogsData';
// import Loader from '@/components/Loader'

function BlogsClient({ allBlogs }) {
    return (
        <WebsiteLayout>
            {/* Enhanced Hero Section */}
            <div className="w-full bg-gradient-to-r from-[#103e2b] to-[#0b3021] py-12 md:py-14 text-white mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight'>
                        Read Our Blogs
                    </h1>
                    <p className='max-w-2xl mx-auto text-md md:text-lg text-blue-100 opacity-90'>
                        Helpful blogs written by experts
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 pb-10'>

                {allBlogs.length === 0 ? (
                    <div><Loader /></div>
                ) : (
                    <BlogList
                        blogs={allBlogs}
                    />
                )}
            </div>
        </WebsiteLayout>
    )
}

export default BlogsClient;