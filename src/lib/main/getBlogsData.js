// lib/getBlogsData.js
import Blog from "@/models/blogModel";

import { connectDB } from "../mongodb";

export async function getBlogsData() {
    try {
        await connectDB()
        const blogs = await Blog.find();
        return JSON.parse(JSON.stringify(blogs))
    } catch (error) {
        console.error('Error fetching blogs:', error);

    }
}

export async function getBlogBySlug(slug) {
    try {
        await connectDB()
        const res = await Blog.findOne({ slug });

        const blog = JSON.parse(JSON.stringify(res))
        return blog;

    } catch (error) {
        console.error(`Error fetching blog ${slug}:`, error);
        return null;
    }
}

export async function getLatestBlogs(limit = 4) {
    try {
        await connectDB();
        const latest = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(limit);
        return JSON.parse(JSON.stringify(latest));
    } catch (error) {
        console.error('Error fetching latest blogs:', error);
        return [];
    }
}
