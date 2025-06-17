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

function BlogsClient({ services, categories, allBlogs }) {
    // const [selectedCategory, setSelectedCategory] = useState('all');
    // const [loading, setLoading] = useState(false);
    // const [blogData, setBlogData] = useState({
    //     blogs: initialData.blogs,
    //     currentPage: initialData.currentPage,
    //     totalPages: initialData.totalPages,
    //     totalCount: initialData.totalCount,
    //     currentCategory: 'all'
    // });

    // // Use a ref to track the current category
    // const currentCategoryRef = useRef(blogData.currentCategory);

    // // Keep the ref updated
    // useEffect(() => {
    //     currentCategoryRef.current = blogData.currentCategory;
    // }, [blogData.currentCategory]);

    // // Fetch blogs when category changes
    // useEffect(() => {        
    //     const fetchCategoryBlogs = async () => {
    //         setLoading(true);
    //         try {
    //             const newData = await getBlogsData({
    //                 page: 1,
    //                 limit: 30,
    //                 category: selectedCategory
    //             });

    //             setBlogData({
    //                 blogs: newData.blogs,
    //                 currentPage: newData.currentPage,
    //                 totalPages: newData.totalPages,
    //                 totalCount: newData.totalCount,
    //                 currentCategory: selectedCategory
    //             });
    //         } catch (error) {
    //             console.error('Error fetching blogs:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (selectedCategory !== blogData.currentCategory) {
    //         fetchCategoryBlogs();
    //     }
    // }, [selectedCategory]);

    // const handleLoadMore = async () => {
    //     if (blogData.currentPage >= blogData.totalPages) return;

    //     setLoading(true);
    //     try {
    //         const newData = await getBlogsData({
    //             page: blogData.currentPage + 1,
    //             limit: 10,
    //             // Use ref to get the current category to avoid stale closure
    //             category: currentCategoryRef.current
    //         });

    //         // Use functional update to ensure we have the latest state
    //         setBlogData(prev => ({
    //             ...prev,
    //             blogs: [...prev.blogs, ...newData.blogs],
    //             currentPage: newData.currentPage,
    //             totalPages: newData.totalPages
    //         }));
    //     } catch (error) {
    //         console.error('Error loading more blogs:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    return (
        <WebsiteLayout services={services} categories={categories}>
            {/* Enhanced Hero Section */}
            <div className="w-full bg-gradient-to-r from-[#001a33] to-[#002244] py-12 md:py-14 text-white mb-8">
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