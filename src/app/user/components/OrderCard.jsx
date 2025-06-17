import React from 'react'
import {
    FileText,
    CalendarCheck,
    CalendarClock,
    IndianRupee,
    Hash,
    File
} from 'lucide-react';
import { format } from 'date-fns';


function OrderCard({ order }) {
    return (
        <div key={order._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                {/* Left section - Order Info */}
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-[#002244]">{order.service?.name}</h3>
                            <p className="text-gray-600">{order.subService?.name}</p>
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

            {/* Documents preview */}
            {order.documents?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        Uploaded Documents
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {order.documents.map(doc => (
                            <a
                                key={doc._id}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center bg-gray-50 rounded-lg px-3 py-2 hover:bg-blue-50 hover:ring-1 hover:ring-blue-200 transition-colors"
                            >
                                <File className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-xs text-gray-700 truncate max-w-[120px]">
                                    {doc.fieldName}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderCard