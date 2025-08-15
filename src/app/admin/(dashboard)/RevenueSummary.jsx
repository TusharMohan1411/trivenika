'use client'

import React from 'react'
import {
    AreaChart,
    Area,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    Legend,
} from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

const fetchRevenueData = async () => {
    const res = await fetch('/api/dashboard/revenue-summary?days=28')
    if (!res.ok) throw new Error('Failed to fetch revenue data')
    return res.json()
}

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
    })
}

const RevenueSummary = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['revenue-summary'],
        queryFn: fetchRevenueData,
    })

    if (isLoading) return <div className="p-4">Loading chart...</div>

    const chartData = data.dates.map((date, index) => ({
        date: formatDate(date),
        // pos: data.posRevenue[index],
        orders: data.websiteRevenue[index],
    }))

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div>
                    <CardTitle>Revenue Summary</CardTitle>
                    <CardDescription>
                        Showing the total revenue from orders in last 28 Days
                    </CardDescription>
                </div>
                {/* Mini Cards */}
                <div className="grid grid-cols-1 gap-2">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-semibold text-center">
                        ₹{data.totalRevenue}<br />Total Revenue
                    </div>
                    {/* <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-xs font-semibold text-center">
                        ₹{data.posRevenueTotal}<br />POS
                    </div>
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md text-xs font-semibold text-center">
                        ₹{data.websiteRevenueTotal}<br />Website
                    </div> */}
                </div>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            formatter={(value) => `₹${value}`}
                            labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Legend verticalAlign="top" height={36} />
                        {/* <Area
                            type="monotone"
                            dataKey="pos"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.2}
                            name="POS Revenue"
                        /> */}
                        <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.2}
                            name="Ordes Revenue"
                        />
                    </AreaChart>
                </ResponsiveContainer>

                <p className="text-xs text-muted-foreground mt-4 text-right">
                    From {formatDate(data.dates[0])} to {formatDate(data.dates.at(-1))}
                </p>
            </CardContent>
        </Card>
    )
}

export default RevenueSummary
