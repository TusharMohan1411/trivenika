import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/orderModel'

export async function GET(req) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)
        const days = parseInt(searchParams.get('days')) || 28

        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(endDate.getDate() - days + 1)

        const orders = await Order.find({
            createdAt: { $gte: startDate, $lte: endDate },
            paymentStatus: 'paid',
        }).lean()

        const dateMap = {}
        for (let i = 0; i < days; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)
            const key = date.toISOString().slice(0, 10) // format: 'YYYY-MM-DD'
            dateMap[key] = { call: 0, service: 0 }
        }

        let callRevenueTotal = 0
        let serviceRevenueTotal = 0

        orders.forEach((order) => {
            const dateKey = new Date(order.createdAt).toISOString().slice(0, 10)
            if (!dateMap[dateKey]) return

            const amount = order.amount || 0

            if (order.type === 'call') {
                dateMap[dateKey].call += amount
                callRevenueTotal += amount
            } else if (order.type === 'service') {
                dateMap[dateKey].service += amount
                serviceRevenueTotal += amount
            }
        })

        const dates = Object.keys(dateMap)
        const callRevenue = dates.map((date) => dateMap[date].call)
        const serviceRevenue = dates.map((date) => dateMap[date].service)

        return NextResponse.json({
            dates,
            callRevenue,
            serviceRevenue,
            callRevenueTotal,
            serviceRevenueTotal,
            totalRevenue: callRevenueTotal + serviceRevenueTotal,
        })
    } catch (error) {
        console.error('Revenue API Error:', error)
        return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    }
}
