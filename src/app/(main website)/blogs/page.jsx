// app/blogs/page.jsx
import React from 'react';
import { getHomePageData } from '@/lib/main/getHomePageData';
import BlogsClient from './components/BlogsClient';
import { getBlogsData } from '@/lib/main/getBlogsData';

export default async function page() {
    const { services, categories } = await getHomePageData();
    const blogs = await getBlogsData();
    console.log(blogs)

    return (
        <BlogsClient
            services={services}
            categories={categories}
            allBlogs={blogs}
        />
        // <p>lajfdklasjf;lkasjdf</p>
    );
}
