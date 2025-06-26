// components/OrderAccordion.jsx
'use client'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'

export default function OrderAccordion({ order }) {
    const [open, setOpen] = useState(false)

    // helper to get variant data from populated serviceId
    const getVariant = (cartItem) =>
        cartItem.serviceId.variants.find(v => v._id === cartItem.variantId)

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
                <div className="text-left">
                    <p className="font-medium">Order #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">
                        {format(new Date(order.createdAt), 'MMM d, yyyy')} •{' '}
                        <span className={`font-semibold ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                            {order.paymentStatus}
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <p className="font-semibold">₹{order.totalAmount}</p>
                    {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {/* Expanded content */}
            {open && (
                <div className="p-4 bg-white space-y-6">
                    {/* Cart items */}
                    <div className="space-y-4">
                        {order.cart.map(item => {
                            const variant = getVariant(item)
                            return (
                                <div key={item._id || item.variantId} className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image
                                            src={variant.image}
                                            alt={`${item.serviceName} – ${item.variantName}`}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-medium">
                                            {item.serviceName} – {item.variantName}
                                        </p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">
                                        ₹{(item.price ?? variant.discountedPrice) * item.quantity}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Shipping details */}
                    <div>
                        <h4 className="font-medium mb-1">Shipping</h4>
                        <p className="text-sm">{order.shippingDetails.fullName}</p>
                        <p className="text-sm">{order.shippingDetails.address}, {order.shippingDetails.state} - {order.shippingDetails.pin}</p>
                        <p className="text-sm">{order.shippingDetails.email} • {order.shippingDetails.contact}</p>
                    </div>

                    {/* Status history */}
                    <div>
                        <h4 className="font-medium mb-1">Status History</h4>
                        <ul className="text-sm space-y-1">
                            {order.status.map((s, i) => (
                                <li key={i}>
                                    {format(new Date(s.date), 'PPP, p')} — {s.currentStatus}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
