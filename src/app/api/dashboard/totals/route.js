import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Category from '@/models/categoryModel'
import Service from '@/models/serviceModel'
import SubService from '@/models/subServiceModel'
import User from '@/models/userModel'
import CallPlan from '@/models/callPlanModel'
import Blog from '@/models/blogModel'

export async function GET() {
    try {
        await connectDB()

        // Fetch counts in parallel
        const [
            categoriesCount,
            servicesCount,
            subServicesCount,
            usersCount,
            callPlansCount,
            blogsCount,
        ] = await Promise.all([
            Category.countDocuments(),
            Service.countDocuments(),
            SubService.countDocuments(),
            User.countDocuments({ role: 'user' }),
            CallPlan.countDocuments(),
            Blog.countDocuments(),
        ])

        return NextResponse.json({
            categoriesCount,
            servicesCount,
            subServicesCount,
            usersCount,
            callPlansCount,
            blogsCount,
        })
    } catch (error) {
        console.error('Totals API Error:', error)
        return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    }
}