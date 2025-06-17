import { connectDB } from "@/lib/mongodb";
import CallPlan from "@/models/callPlanModel";
import Order from "@/models/orderModel";
import Service from "@/models/serviceModel";
import SubService from "@/models/subServiceModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));

        const filter = {};
        if (status && status !== 'all') {
            filter.status = status;
        }

        if (type && type !== 'all') {
            filter.type = type
        }

        const skip = (page - 1) * limit;

        const [orders, totalCount] = await Promise.all([
            Order.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .populate('user', 'phone role') // Only `phone` and `role` from User
                .populate('service', 'name')    // Only `name` from Service
                .populate('subService', 'name') // Only `name` from SubService
                .populate('callPlan'),
            Order.countDocuments(filter)
        ]);

        return NextResponse.json({
            success: true,
            data: orders,
            totalCount,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
                hasNextPage: page < Math.ceil(totalCount / limit),
                hasPrevPage: page > 1
            }
        }, { status: 200 });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
