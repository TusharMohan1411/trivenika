// components/MultipleUses.jsx
'use client';

import { motion } from "framer-motion";
import Image from 'next/image';

export default function MultipleUses({ multipleUseHeading, multipleUsePoints = [] }) {
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
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        rest: {
            scale: 1,
            rotate: 0
        },
        hover: {
            scale: 1.05,
            rotate: -2,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    return (
        <motion.div
            className="relative overflow-hidden rounded-3xl max-w-7xl mx-auto py-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] rounded-3xl"></div>

            {/* Floating decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#ffffff]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#ffffff]/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-center w-full gap-8 sm:gap-20">
                {/* Chef Image with animation */}
                <motion.div
                    className=""
                    variants={itemVariants}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                >
                    <div className="relative w-80 h-80 overflow-hidden">
                        <div className="absolute inset-0"></div>
                        <Image
                            src="/chef.png"
                            alt="Chef"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Text content */}
                <div className="">
                    <motion.h2
                        className="text-2xl md:text-3xl font-bold text-white mb-6"
                        variants={itemVariants}
                    >
                        {multipleUseHeading}
                    </motion.h2>

                    <motion.ul
                        className="space-y-4"
                        variants={containerVariants}
                    >
                        {multipleUsePoints.map((point, index) => (
                            <motion.li
                                key={index}
                                className="flex items-start"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-white text-lg">{point}</span>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Usage Tips */}
                    <motion.div
                        className="mt-8 flex flex-wrap gap-3"
                        variants={itemVariants}
                    >
                        <div className="bg-[#ffffff]/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                            <span className="font-medium">Tip:</span> Use at medium heat for best results
                        </div>
                        <div className="bg-[#ffffff]/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                            <span className="font-medium">Tip:</span> Store in cool, dark place
                        </div>
                    </motion.div>
                </div>

                {/* Decorative cooking utensils */}
                <motion.div
                    className="absolute bottom-4 right-4 flex gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="bg-[#ffffff]/20 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                        </svg>
                    </div>
                    <div className="bg-[#ffffff]/20 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Floating oil droplet */}
            <motion.div
                className="absolute top-8 right-8 w-12 h-12 bg-[#ffffff]/30 rounded-full"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
}