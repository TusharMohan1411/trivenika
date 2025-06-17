'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const COLORS = {
    active: '#3b82f6',    // blue
    completed: '#10b981', // green
}

async function fetchOrdersStatusSummary() {
    const res = await fetch('/api/dashboard/orders-status-summary')
    if (!res.ok) throw new Error('Failed to fetch orders status summary')
    return res.json()
}

export default function OrdersStatusPieCharts() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['ordersStatusSummary'],
        queryFn: fetchOrdersStatusSummary,
    })

    if (isLoading) return <div className="p-4">Loading...</div>
    if (isError) return <div className="p-4 text-red-500">Error loading data</div>

    const types = ['call', 'service']

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {types.map((type) => {
                const chartData = Object.entries(data[type]).map(([status, value]) => ({ name: status, value }))
                return (
                    <Card key={type}>
                        <CardHeader>
                            <CardTitle className="capitalize">{type} Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {chartData.map((entry, idx) => (
                                            <Cell key={idx} fill={COLORS[entry.name]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => value} />
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        iconSize={12}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-sm capitalize text-gray-600">{value}</span>}
                                        wrapperStyle={{ paddingTop: '20px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
