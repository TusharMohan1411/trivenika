// components/WhyToBuySection.jsx
'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const WhyToBuySection = ({ whyToBuy, productName }) => {
    if (!whyToBuy || whyToBuy.length === 0) return null;

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
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        rest: {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
        },
        hover: {
            scale: 1.03,
            y: -10,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    const imageVariants = {
        rest: {
            scale: 1,
            rotate: 0
        },
        hover: {
            scale: 1.1,
            rotate: -2,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    return (
        <section className="py-16 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
            {/* Decorative elements */}
            {/* <div className="absolute top-0 left-0 w-64 h-64 bg-[#2E8B57]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#2E8B57]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-block mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10
                        }}
                    >
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-4">
                        Why Choose Our {productName}?
                    </h2>

                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Discover the purity of nature with our traditionally made oils and spices, crafted with care for your health and well-being.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {whyToBuy.map((item, index) => (
                        <motion.div
                            key={item._id || index}
                            className="relative group"
                            variants={itemVariants}
                        >
                            {/* Card with animation */}
                            <motion.div
                                className="h-full bg-white rounded-2xl overflow-hidden border border-[#e8f5e9]"
                                variants={cardVariants}
                                initial="rest"
                                whileHover="hover"
                            >
                                {/* Image section - larger and more prominent */}
                                <motion.div
                                    className="relative h-96 bg-gradient-to-br from-[#2E8B57]/10 to-[#f8fbf3] flex items-center justify-center p-4"
                                    variants={imageVariants}
                                >
                                    {item.icon && (
                                        <Image
                                            src={item.icon}
                                            alt={item.title || "Benefit"}
                                            width={320}
                                            height={320}
                                            className="object-contain rounded-xl"
                                        />
                                    )}

                                </motion.div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#2E8B57] mb-3">{item.title}</h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">{item.content}</p>

                                    {/* <div className="mt-4 flex items-center">
                                        <div className="bg-[#2E8B57]/10 text-[#2E8B57] px-3 py-1 rounded-full text-sm font-medium">
                                            Learn more
                                        </div>
                                        <div className="ml-auto bg-[#2E8B57] w-8 h-8 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div> */}
                                </div>
                            </motion.div>

                            {/* Floating decoration */}
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#2E8B57] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Nature Commitment */}
                <motion.div
                    className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] rounded-3xl p-8 md:p-12 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-48 h-48 bg-[#ffffff]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffffff]/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="flex-shrink-0">
                            <div className="bg-[#FFFDF7] w-20 h-20 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Our Commitment to Purity
                            </h3>
                            <p className="text-[#FFFDF7]/90 mb-6">
                                We partner with local farmers who use traditional methods to produce oils and spices that are not only pure but also sustainable. Each product supports eco-friendly practices and fair trade.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <span className="bg-[#FFFDF7] text-[#2E8B57] px-4 py-2 rounded-full text-sm font-medium">
                                    Eco-friendly Packaging
                                </span>
                                <span className="bg-[#FFFDF7] text-[#2E8B57] px-4 py-2 rounded-full text-sm font-medium">
                                    Sustainable Farming
                                </span>
                                <span className="bg-[#FFFDF7] text-[#2E8B57] px-4 py-2 rounded-full text-sm font-medium">
                                    Fair Trade Practices
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <a
                        href="/products"
                        className="inline-flex items-center bg-[#2E8B57] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#256e46] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        Explore Our Natural Products
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyToBuySection;