"use client"
import React, { useState } from 'react';
import { format } from 'date-fns';
import UserProfileSkeleton from './UserProfileSkeleton';
import OrderAccordion from './OrderAccordion';

function UserSection({ loading, error, userData }) {
    const [activeTab, setActiveTab] = useState('orders');

    if (loading) return <UserProfileSkeleton />;
    if (error) return <div className="text-red-500 p-4 text-center">Error loading user data</div>;

    const joinDate = format(new Date(userData.createdAt), 'MMMM d, yyyy');
    const serviceOrdersData = userData?.orders.reverse();

    return (
        <div className="space-y-6 p-2">
            {/* Upper Strip */}
            <div className="bg-gradient-to-r from-[#00441e] to-[#008832] text-white rounded-xl p-4 mt-5 sm:mt-1 sm:p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center mb-3 sm:mb-0">
                        {/* Avatar Image */}
                        <div className="bg-gray-100 rounded-full p-1 border-2 border-white shadow-md">
                            <img
                                src="/avatar.jpg"
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-bold">Your Account</h2>
                            <p className="text-blue-100 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {userData.phone}
                            </p>
                        </div>
                    </div>

                    <div className="bg-emerald-900/50 px-4 py-2 rounded-lg border border-emerald-700">
                        <p className="text-emerald-200 text-sm">Member since</p>
                        <p className="font-semibold">{joinDate}</p>
                    </div>

                </div>

                {/* Support Box */}
                <div className="mt-3 bg-emerald-800/60 border border-emerald-600 rounded-lg px-3 py-2 text-sm sm:text-base shadow-md">
                    <p className="text-emerald-100 text-center">
                        For order-related queries, call us at{" "}
                        <a href="tel:8569996206" className="font-semibold text-white hover:text-emerald-200">
                            8569996206
                        </a>
                    </p>
                </div>
            </div>


            {/* Lower Section with Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Tab Headers */}
                <div className="border-b border-gray-200 flex items-center justify-between">
                    <nav className="flex">
                        <button
                            className={`py-4 px-6 font-medium text-sm relative ${activeTab === 'orders'
                                ? 'text-[#002244] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#002244]'
                                : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Orders
                        </button>
                    </nav>
                    <a
                        href="https://search.google.com/local/writereview?placeid=ChIJG9Ck0a1nETkRf0bXML7mUHg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 mr-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-sm hover:from-emerald-600 hover:to-green-500 transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Write a Review
                    </a>

                </div>

                {/* Tab Content */}
                <div className="p-4 sm:p-6">
                    <div>
                        {serviceOrdersData.length > 0 ? (
                            <div className="space-y-4">
                                {serviceOrdersData.map(order => (
                                    <OrderAccordion key={order._id} order={order} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                                <p className="text-gray-500">No orders found</p>
                                <p className="text-gray-400 text-sm mt-2">Your orders will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSection;