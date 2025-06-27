
import { getLatestBlogs } from '@/lib/main/getBlogsData';
import React from 'react';
import BlogCard from './BlogShowCard';

async function LatestBlogs() {
    const blogs = await getLatestBlogs()

    return (
        <div className="px-4 sm:px-0 pb-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Latest <span className="text-emerald-600">Desi Blogs</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Stay Healthy Eat Healthy!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {blogs?.map(blog => (
                        <div
                            key={`${blog._id}`}
                            className="transform transition-all duration-500 hover:-translate-y-2"
                        >
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="/blogs"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:shadow-lg"
                    >
                        View All Articles
                        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LatestBlogs;