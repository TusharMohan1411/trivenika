"use client"
// pages/track-order.jsx
import React, { useState } from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import OrderDetails from './components/orderDetails';
import axios from 'axios';

const TrackOrderPage = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setOrder(null);

        try {
            const response = await axios.post('/api/orders/getOrderDetailsById', {
                orderId: orderId.trim(),
            });

            setOrder(response.data.data);
        } catch (err) {
            console.error('Track Order Error:', err);
            if (err.response && err.response.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Failed to fetch order details. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setOrder(null);
        setOrderId('');
        setError(null);
    };



    return (
        <WebsiteLayout>
            <div className="max-w-7xl mx-auto px-1 py-8 sm:px-3 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-5">Track Your Order</h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Enter your order ID below to check the status of your purchase and get real-time updates
                    </p>
                </motion.div>

                {!order ? (
                    <div className="flex justify-center px-5">
                        <div className="w-full max-w-lg">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="bg-emerald-50 p-4 rounded-full">
                                        <FiSearch className="h-10 w-10 text-emerald-600" />
                                    </div>
                                </div>

                                <form onSubmit={handleTrackOrder}>
                                    <div className="mb-6">
                                        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                                            Order ID
                                        </label>
                                        <input
                                            type="text"
                                            id="orderId"
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                            placeholder="Enter your order ID (e.g. ORD12345)"
                                            required
                                        />
                                        <p className="mt-2 text-sm text-gray-500">
                                            You can find your order ID in your order confirmation email
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition ${loading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg'
                                            }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Tracking Order...
                                            </div>
                                        ) : (
                                            'Track Order'
                                        )}
                                    </button>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded"
                                        >
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm text-red-700">
                                                        {error}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </form>
                            </motion.div>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    Having trouble finding your order?{' '}
                                    <a href="/contact" className="text-emerald-600 hover:underline font-medium">
                                        Contact Support
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <OrderDetails
                        resetForm={resetForm}
                        order={order}
                    />
                )}
            </div>
        </WebsiteLayout>
    );
};

export default TrackOrderPage;


// Simulated order data
// const mockOrderData = {
//     _id: "ORD12345",
//     type: "website",
//     user: "USER123",
//     shippingDetails: {
//         fullName: "John Doe",
//         contact: "9876543210",
//         email: "john.doe@example.com",
//         address: "123 Main Street, Apt 4B",
//         state: "California",
//         pin: "90001"
//     },
//     cart: [
//         {
//             serviceId: "SVC001",
//             variantId: "VAR001",
//             serviceName: "Organic Green Tea",
//             variantName: "Premium Pack - 100g",
//             quantity: 2,
//             price: 599
//         },
//         {
//             serviceId: "SVC002",
//             variantId: "VAR002",
//             serviceName: "Himalayan Honey",
//             variantName: "Raw & Unprocessed - 500g",
//             quantity: 1,
//             price: 899
//         }
//     ],
//     orderValue: 2097,
//     discount: 200,
//     subTotal: 1897,
//     shippingCharges: 0,
//     totalAmount: 1897,
//     paymentStatus: "paid",
//     paymentMethod: "online",
//     paymentDate: "2023-06-15T10:30:00Z",
//     paymentMessage: "Payment successful",
//     status: [
//         {
//             currentStatus: "New",
//             message: "Order received",
//             date: "2023-06-15T10:30:00Z"
//         },
//         {
//             currentStatus: "Processing",
//             message: "Order being prepared",
//             date: "2023-06-15T11:45:00Z"
//         },
//         {
//             currentStatus: "Packed",
//             message: "Items packed and ready for shipping",
//             date: "2023-06-16T09:15:00Z"
//         },
//         {
//             currentStatus: "Shipped",
//             message: "Shipped via FedEx",
//             date: "2023-06-17T14:20:00Z"
//         },
//         {
//             currentStatus: "Ready for delivery",
//             message: "Out for delivery",
//             date: "2023-06-18T08:30:00Z"
//         }
//     ],
//     transactionId: "TXN123456789",
//     razorpayOrder: "order_123456789",
//     createdAt: "2023-06-15T10:30:00Z"
// };