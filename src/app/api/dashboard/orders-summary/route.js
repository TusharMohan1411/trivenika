import { connectDB } from '@/lib/mongodb'
import Order from '@/models/orderModel'

function getDateRangeArray(days) {
    const dates = []
    const today = new Date()
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        dates.push(d.toISOString().split('T')[0]) // 'YYYY-MM-DD'
    }
    return dates
}

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7', 10)

    await connectDB()

    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)

    // Step 1: Get counts by day/type
    const agg = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: cutoff }
            }
        },
        {
            $group: {
                _id: {
                    day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    type: '$type'
                },
                count: { $sum: 1 }
            }
        }
    ])

    // Step 2: Convert to lookup
    const dataMap = {}
    for (const { _id, count } of agg) {
        const day = _id.day
        const type = _id.type
        if (!dataMap[day]) dataMap[day] = { service: 0, call: 0 }
        if (type === 'service') dataMap[day].service = count
        if (type === 'call') dataMap[day].call = count
    }

    // Step 3: Fill missing dates and preserve order
    const dates = getDateRangeArray(days)
    const serviceCounts = []
    const callCounts = []

    for (const date of dates) {
        const dayData = dataMap[date] || { service: 0, call: 0 }
        serviceCounts.push(dayData.service)
        callCounts.push(dayData.call)
    }

    return new Response(
        JSON.stringify({ dates, serviceCounts, callCounts }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}
