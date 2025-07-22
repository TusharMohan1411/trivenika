// components/website/EmptyCart.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const EmptyCart = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-64 h-64 mx-auto mb-0"
                >
                    {/* Shopping cart icon with animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            className="w-40 h-40 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                        </svg>
                    </div>
                </motion.div>

                <motion.h2
                    className="text-3xl font-bold text-gray-800 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Your Cart is Empty
                </motion.h2>

                <motion.p
                    className="text-gray-600 mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Looks like you haven't added any items to your cart yet. Start shopping to fill it with amazing products!
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link href="/products">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Browse Products
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default EmptyCart;