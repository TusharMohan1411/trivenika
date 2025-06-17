import React, { useState } from 'react';
import {
    FileText,
    CalendarCheck,
    CalendarClock,
    IndianRupee,
    Hash,
    Phone,
    User,
    Mail,
    MessageSquare,
    ChevronDown,
    ChevronUp,
    Clock,
    Info
} from 'lucide-react';
import { format } from 'date-fns';

function CallOrderCard({ order }) {
    const [showInstructions, setShowInstructions] = useState(false);

    // Field label mapping for better display
    const fieldLabels = {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message'
    };

    return (
        <div className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                {/* Left section - Call Info */}
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-[#002244] flex items-center">
                                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                                {order.callPlan?.name || 'Expert Call Consultation'}
                            </h3>
                            <div className="flex items-center mt-1 text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{order.callPlan?.time}</span>
                                <span className="mx-2">•</span>
                                <IndianRupee className="h-4 w-4 mr-1" />
                                <span>{order.callPlan?.price}</span>
                            </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                            {order.status}
                        </span>
                    </div>

                    {/* Info Cards with Icons */}
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                            <div className="bg-[#002244]/10 p-2 rounded-lg mr-3">
                                <Hash className="h-4 w-4 text-[#002244]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Order ID</p>
                                <p className="text-sm font-medium">#{order._id.slice(-8)}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                            <div className="bg-[#002244]/10 p-2 rounded-lg mr-3">
                                <IndianRupee className="h-4 w-4 text-[#002244]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Amount</p>
                                <p className="text-sm font-medium">₹{order.amount}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                            <div className="bg-[#002244]/10 p-2 rounded-lg mr-3">
                                <CalendarCheck className="h-4 w-4 text-[#002244]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Created</p>
                                <p className="text-sm font-medium">
                                    {format(new Date(order.createdAt), 'dd MMM, yy hh:mm:ss a')}
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                            <div className="bg-[#002244]/10 p-2 rounded-lg mr-3">
                                <CalendarClock className="h-4 w-4 text-[#002244]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Last Updated</p>
                                <p className="text-sm font-medium">
                                    {format(new Date(order.updatedAt), 'dd MMM, yy hh:mm:ss a')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Status */}
            <div className="mt-4 flex items-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                    }`}>
                    {order.paymentStatus === 'paid' ? (
                        <>
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                            Payment Successful
                        </>
                    ) : (
                        <>
                            <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
                            Payment {order.paymentStatus}
                        </>
                    )}
                </div>
            </div>

            {/* Call Plan Instructions */}
            {order.callPlan?.instructions?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                        className="flex items-center text-sm font-medium text-gray-900 mb-2 w-full"
                        onClick={() => setShowInstructions(!showInstructions)}
                    >
                        <Info className="h-4 w-4 mr-2 text-gray-500" />
                        Call Plan Instructions
                        {showInstructions ? (
                            <ChevronUp className="h-4 w-4 ml-auto" />
                        ) : (
                            <ChevronDown className="h-4 w-4 ml-auto" />
                        )}
                    </button>

                    {showInstructions && (
                        <div className="bg-blue-50 rounded-lg p-3">
                            <ul className="space-y-2">
                                {order.callPlan.instructions.map((instruction, index) => (
                                    <li key={index} className="flex">
                                        <span className="text-blue-600 mr-2">•</span>
                                        <span className="text-sm text-gray-700">{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Caller Details */}
            {order.details && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        Caller Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(order.details).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center mb-1">
                                    {key === 'name' && <User className="h-4 w-4 mr-2 text-gray-500" />}
                                    {key === 'email' && <Mail className="h-4 w-4 mr-2 text-gray-500" />}
                                    {key === 'phone' && <Phone className="h-4 w-4 mr-2 text-gray-500" />}
                                    {key === 'message' && <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />}
                                    <p className="text-xs text-gray-500">
                                        {fieldLabels[key] || key}
                                    </p>
                                </div>
                                <p className="text-sm font-medium truncate">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CallOrderCard;