import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/orderModel'

export async function GET(req) {
    try {
        await connectDB()

        // Aggregate counts by type and status
        const results = await Order.aggregate([
            {
                $match: {}
            },
            {
                $group: {
                    _id: { type: '$type', status: '$status' },
                    count: { $sum: 1 }
                }
            }
        ])

        // Initialize structure
        const summary = {
            call: { active: 0, completed: 0 },
            service: { active: 0, completed: 0 }
        }

        results.forEach(({ _id: { type, status }, count }) => {
            if (summary[type] && summary[type][status] !== undefined) {
                summary[type][status] = count
            }
        })

        return NextResponse.json(summary)
    } catch (error) {
        console.error('Orders status summary error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
