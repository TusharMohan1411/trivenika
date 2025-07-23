"use client"
// pages/track-order.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiCheckCircle, FiTruck, FiClock, FiMapPin, FiPhone, FiMail, FiCreditCard } from 'react-icons/fi';

function OrderDetails({ order, resetForm }) {

    const getStatusIndex = (status) => {
        const statusOrder = [
            "New",
            "Processing",
            "Packed",
            "Shipped",
            "Ready for delivery",
            "Delivered",
            "cancelled"
        ];
        return statusOrder.indexOf(status);
    };

    const getLatestStatus = () => {
        if (!order || !order.status || order.status.length === 0) return null;
        return order.status[order.status.length - 1];
    };

    // const formatDate = (dateString) => {
    //     const options = {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit'
    //     };
    //     return new Date(dateString).toLocaleDateString('en-US', options);
    // };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Shipped':
            case 'Ready for delivery':
                return <FiTruck className="h-5 w-5" />;
            case 'Delivered':
                return <FiCheckCircle className="h-5 w-5" />;
            default:
                return <FiPackage className="h-5 w-5" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'Shipped':
            case 'Ready for delivery':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const latestStatus = getLatestStatus();
    const statusIndex = getStatusIndex(latestStatus.currentStatus);
    const progressPercentage = (statusIndex / 6) * 100;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Order Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{order._id}</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Placed on {formatDate(order.createdAt)}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.paymentStatus === 'paid' ? 'Payment Successful' : 'Payment Pending'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="mb-4 flex justify-between">
                    <div className="text-sm font-medium text-gray-700">Order Status</div>
                    <div className="text-sm font-medium text-emerald-600">{latestStatus.currentStatus}</div>
                </div>

                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                                {statusIndex === 6 ? 'Complete' : `Step ${statusIndex + 1} of 6`}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-gray-200">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1 }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                        ></motion.div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-600">
                        <span>Order Placed</span>
                        <span>Delivered</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Timeline */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Status Timeline</h2>

                        <div className="flow-root">
                            <ul className="-mb-8">
                                {order.status.map((statusItem, idx) => (
                                    <li key={idx}>
                                        <div className="relative pb-8">
                                            {idx !== order.status.length - 1 ? (
                                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                            ) : null}
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${statusItem.currentStatus === 'Delivered'
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-emerald-100 text-emerald-800'
                                                        }`}>
                                                        {statusItem.currentStatus === 'Delivered' ? (
                                                            <FiCheckCircle className="h-5 w-5" />
                                                        ) : statusItem.currentStatus === 'Shipped' || statusItem.currentStatus === 'Ready for delivery' ? (
                                                            <FiTruck className="h-5 w-5" />
                                                        ) : statusItem.currentStatus === 'New' ? (
                                                            <FiClock className="h-5 w-5" />
                                                        ) : (
                                                            <FiPackage className="h-5 w-5" />
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                    <div>
                                                        <p className="text-sm text-gray-700">
                                                            {statusItem.currentStatus}
                                                            {statusItem.message && (
                                                                <span className="font-medium text-gray-900"> - {statusItem.message}</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                        <time>{formatDate(statusItem.date)}</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {order.cart.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md"></div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{item.serviceName}</div>
                                                        <div className="text-sm text-gray-500">{item.variantName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{item.price.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ₹{(item.price * item.quantity).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    {/* Shipping Details */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Details</h2>

                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <FiMapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Shipping Address</p>
                                    <p className="text-sm text-gray-500">
                                        {order.shippingDetails.address}<br />
                                        {order.shippingDetails.state} - {order.shippingDetails.pin}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <FiPhone className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Contact</p>
                                    <p className="text-sm text-gray-500">{order.shippingDetails.contact}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Email</p>
                                    <p className="text-sm text-gray-500">{order.shippingDetails.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Details</h2>

                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <FiCreditCard className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Payment Method</p>
                                    <p className="text-sm text-gray-500 capitalize">{order.paymentMethod}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Payment Status</p>
                                    <p className={`text-sm font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                                        }`}>
                                        {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Payment Date</p>
                                    <p className="text-sm text-gray-500">{formatDate(order.paymentDate)}</p>
                                </div>
                            </div>

                            {order.transactionId && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Transaction ID</p>
                                        <p className="text-sm text-gray-500 break-all">{order.transactionId}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>₹{order.orderValue.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Discount</span>
                                <span className="text-green-600">-₹{order.discount.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping Charges</span>
                                <span>₹{order.shippingCharges.toLocaleString()}</span>
                            </div>

                            <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold text-lg">
                                <span>Total Amount</span>
                                <span>₹{order.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails