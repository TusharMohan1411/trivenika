// app/components/FeaturesSection.jsx
'use client';

import { motion } from "framer-motion";

const FeaturesSection = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const iconVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.2,
            rotate: -5,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    const cardVariants = {
        rest: {
            y: 0,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
        },
        hover: {
            y: -8,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="py-12 px-4 sm:px-6 bg-[#FFFDF7]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-4">
                        Why Choose Nature's Best
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We're committed to bringing you the purest natural products with care for you and the planet.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Free Shipping Card */}
                    <motion.div
                        className="bg-white rounded-xl overflow-hidden border border-[#e8f5e9]"
                        variants={itemVariants}
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                    >
                        <div className="p-8 flex flex-col items-center text-center">
                            <motion.div
                                className="bg-[#e8f5e9] p-4 rounded-full mb-6"
                                variants={iconVariants}
                            >
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-[#2E8B57]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <div className="absolute -top-1 -right-1 bg-[#2E8B57] rounded-full w-6 h-6 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                            <h3 className="font-bold text-xl text-[#2E8B57] mb-3">Free Shipping</h3>
                            <p className="text-gray-600 mb-4">
                                Free shipping on all orders above ₹499
                            </p>
                            <div className="mt-auto w-full">
                                <div className="relative pt-1">
                                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                                        <div
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#2E8B57]"
                                            style={{ width: '90%' }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 absolute right-0 top-0">90%</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">of orders qualify</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 24/7 Support Card */}
                    <motion.div
                        className="bg-white rounded-xl overflow-hidden border border-[#e8f5e9]"
                        variants={itemVariants}
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                    >
                        <div className="p-8 flex flex-col items-center text-center">
                            <motion.div
                                className="bg-[#e8f5e9] p-4 rounded-full mb-6"
                                variants={iconVariants}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-[#2E8B57]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </motion.div>
                            <h3 className="font-bold text-xl text-[#2E8B57] mb-3">24/7 Support</h3>
                            <p className="text-gray-600 mb-4">
                                Instant access to our natural products experts
                            </p>
                            <div className="mt-auto flex items-center justify-center space-x-2">
                                <div className="bg-[#2E8B57] text-white text-xs px-3 py-1 rounded-full">
                                    Monitored
                                </div>
                                <div className="bg-[#2E8B57]/10 text-[#2E8B57] text-xs px-3 py-1 rounded-full">
                                    24/7
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secure Payment Card */}
                    <motion.div
                        className="bg-white rounded-xl overflow-hidden border border-[#e8f5e9]"
                        variants={itemVariants}
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                    >
                        <div className="p-8 flex flex-col items-center text-center">
                            <motion.div
                                className="bg-[#e8f5e9] p-4 rounded-full mb-6"
                                variants={iconVariants}
                            >
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-[#2E8B57]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <div className="absolute -top-1 -right-1 bg-[#2E8B57] rounded-full w-6 h-6 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">100%</span>
                                    </div>
                                </div>
                            </motion.div>
                            <h3 className="font-bold text-xl text-[#2E8B57] mb-3">Secure Payment</h3>
                            <p className="text-gray-600 mb-4">
                                We ensure secure transactions with encrypted payments
                            </p>
                            <div className="mt-auto flex justify-center space-x-4">
                                <div className="bg-gray-100 p-2 rounded-md">
                                    <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-6" />
                                </div>
                                <div className="bg-gray-100 p-2 rounded-md">
                                    <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-6" />
                                </div>
                                <div className="bg-gray-100 p-2 rounded-md">
                                    <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-6" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Genuine Quality Card */}
                    <motion.div
                        className="bg-white rounded-xl overflow-hidden border border-[#e8f5e9] relative"
                        variants={itemVariants}
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                    >
                        <div className="absolute top-4 right-4 bg-[#2E8B57] text-white text-xs px-2 py-1 rounded-full">
                            Popular
                        </div>
                        <div className="p-8 flex flex-col items-center text-center">
                            <motion.div
                                className="bg-[#e8f5e9] p-4 rounded-full mb-6"
                                variants={iconVariants}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-[#2E8B57]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </motion.div>
                            <h3 className="font-bold text-xl text-[#2E8B57] mb-3">Genuine Quality</h3>
                            <p className="text-gray-600 mb-4">
                                Authentic, lab-tested natural products
                            </p>
                            <div className="mt-auto">
                                <div className="inline-flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-yellow-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">4.9/5</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Customer Satisfaction</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Nature Divider */}
                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-[#2E8B57] w-20 h-20 rounded-full opacity-10 animate-ping"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-[#2E8B57]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                {/* Nature Commitment */}
                <motion.div
                    className="text-center mt-8 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <h3 className="text-2xl font-bold text-[#2E8B57] mb-4">
                        Our Commitment to Nature
                    </h3>
                    <p className="text-gray-600 mb-6">
                        We partner with local farmers who use traditional methods to produce oils and spices that are not only pure but also sustainable. Each product supports eco-friendly practices and fair trade.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center bg-[#e8f5e9] px-4 py-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-[#2E8B57]">Eco-friendly Packaging</span>
                        </div>
                        <div className="flex items-center bg-[#e8f5e9] px-4 py-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-[#2E8B57]">Sustainable Farming</span>
                        </div>
                        <div className="flex items-center bg-[#e8f5e9] px-4 py-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-[#2E8B57]">Fair Trade Practices</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturesSection;