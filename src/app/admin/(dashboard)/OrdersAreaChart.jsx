'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    ResponsiveContainer,
    Legend,
} from 'recharts'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'

async function fetchOrdersSummary(days = 7) {
    const res = await fetch(`/api/dashboard/orders-summary?days=${days}`)
    if (!res.ok) throw new Error('Network error')
    return res.json()
}

export default function OrdersAreaChart({ days = 7 }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['ordersSummary', days],
        queryFn: () => fetchOrdersSummary(days),
        refetchInterval: 60_000,
    })

    const chartData = React.useMemo(() => {
        if (!data) return []
        const { dates, serviceCounts, callCounts } = data
        return dates.map((date, idx) => ({
            date,
            Service: serviceCounts[idx] || 0,
            Call: callCounts[idx] || 0,
        }))
    }, [data])

    const formatDate = (d) =>
        new Date(d).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
        })

    const [startDate, endDate] = React.useMemo(() => {
        if (!data?.dates?.length) return ['', '']
        const ds = data.dates
        return [formatDate(ds[0]), formatDate(ds[ds.length - 1])]
    }, [data])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders in Last {days} Days</CardTitle>
                <CardDescription>
                    Showing order trends from {startDate} to {endDate}
                </CardDescription>
            </CardHeader>

            <CardContent className="h-64">
                {isLoading && <div>Loading chart...</div>}
                {isError && <div>Error loading data.</div>}
                {!isLoading && !isError && (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
                        >
                            {/* <CartesianGrid vertical={false} stroke="#e5e7eb" /> */}
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatDate}
                                tickLine={false}
                                axisLine={false}
                                padding={{ left: 10, right: 10 }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem' }}
                                labelFormatter={(label) => formatDate(label)}
                            />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="Service"
                                stroke="#6366f1"
                                fill="#6366f1"
                                fillOpacity={0.4}
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="Call"
                                stroke="#06b6d4"
                                fill="#06b6d4"
                                fillOpacity={0.4}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </CardContent>

            <CardFooter>
                <div className="text-muted-foreground text-sm">
                    {startDate} - {endDate}
                </div>
            </CardFooter>
        </Card>
    )
}