'use client'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, MapPin, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import DownloadInvoiceButton from '@/app/admin/orders/components/DownloadInvoiceButton'

export default function OrderAccordion({ order }) {
    const [open, setOpen] = useState(false)

    console.log(order)

    // helper to get variant data from populated serviceId
    const getVariant = (cartItem) =>
        cartItem.serviceId.variants.find(v => v.name === cartItem.variantName)

    // derive current status from last entry
    const latestStatus = order.status[order.status.length - 1]?.currentStatus || ''

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex gap-3 justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
                <div className="text-left flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        <p className="font-medium">Order #{order?.orderId}</p>
                        <span className={`mt-1 sm:mt-0 inline-block w-fit px-2 py-1 text-sm font-semibold rounded-sm mb-2
              ${latestStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                            {latestStatus}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        {format(new Date(order.createdAt), 'MMM d, yyyy')} •{' '}
                        Payment Status: <span className={`font-semibold capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                            {order.paymentStatus}
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <p className="font-semibold">₹{order.totalAmount}</p>
                    {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {/* Animated Expanded content */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-white space-y-6">
                            {/* Cart items */}
                            <div className="space-y-4">
                                {order?.cart?.map((item, idx) => {
                                    return (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 flex-shrink-0">
                                                {item?.variantImage &&
                                                    <Image
                                                        src={item?.variantImage}
                                                        alt={`${item?.serviceName} – ${item?.variantName}`}
                                                        fill
                                                        className="object-cover rounded"
                                                    />
                                                }
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-medium">
                                                    {item?.serviceName} – {item?.variantName}
                                                </p>
                                                <p className="text-sm text-gray-500">Qty: {item?.quantity}</p>
                                            </div>
                                            <p className="font-semibold">
                                                ₹{(item.price ?? variant.discountedPrice) * item.quantity}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Shipping and Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Shipping Card */}
                                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                    <h4 className="flex items-center text-lg font-semibold mb-3 text-gray-700">
                                        <MapPin className="mr-2" size={20} /> Shipping Details
                                    </h4>
                                    <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {order.shippingDetails.fullName}</p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Address:</span> {order.shippingDetails.address}, {order.shippingDetails.state} – {order.shippingDetails.pin}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Contact:</span> {order.shippingDetails.contact}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Email:</span> {order.shippingDetails.email}
                                    </p>
                                </div>

                                {/* Status History Card */}
                                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                    <h4 className="flex items-center text-lg font-semibold mb-3 text-gray-700">
                                        <Clock className="mr-2" size={20} /> Status History
                                    </h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        {order.status.map((s, i) => (
                                            <li key={i} className="flex items-start">
                                                <time className="mr-2 whitespace-nowrap">
                                                    {format(new Date(s.date), 'PPP, p')}
                                                </time>
                                                <span className="font-medium">{s.currentStatus}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Download GST Bill button */}
                            {order.status[order.status.length - 1].currentStatus === "Delivered" && order.paymentStatus === 'paid' &&
                                <DownloadInvoiceButton order={order} />
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
