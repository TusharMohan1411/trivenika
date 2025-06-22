// app/components/OilUsageSection.jsx
'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function OilUsageSection2() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        hover: {
            rotate: -5,
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    return (
        <section className="px-4 md:px-8 py-16 md:py-24 bg-[#FFFDF7] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#2E8B57]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#2E8B57]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/4 right-0 w-40 h-40 bg-[#2E8B57]/5 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-block mb-4"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </div>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-4">
                        Discover the Versatility of Our Oils
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Pure, natural oils that enhance every aspect of your life - from cooking to wellness rituals
                    </p>
                </motion.div>

                {/* Content container */}
                <motion.div
                    className="bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-48 h-48 bg-[#ffffff]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffffff]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

                    {/* Image with animation */}
                    <motion.div
                        className="relative w-64 h-64 flex-shrink-0"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                    >
                        {/* Floating droplets */}
                        <div className="absolute top-4 -right-4 w-8 h-8 bg-[#FFFDF7]/50 rounded-full"></div>
                        <div className="absolute -bottom-2 -left-4 w-12 h-12 bg-[#FFFDF7]/30 rounded-full"></div>

                        <div className="absolute inset-0 bg-[#FFFDF7]/10 rounded-full"></div>
                        <div className="absolute inset-4 bg-[#FFFDF7]/20 rounded-full"></div>

                        <Image
                            src="/oil-uses.png" // Replace with your actual image
                            alt="Oil Uses"
                            fill
                            className="object-contain z-10"
                        />
                    </motion.div>

                    {/* Text content */}
                    <div className="flex-1">
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold text-white mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Where Can You Use Our Pure Oils?
                        </motion.h2>

                        <motion.ul
                            className="space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <div className="bg-[#FFFDF7] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Cooking & Frying</h3>
                                    <p className="text-[#FFFDF7]/80">Perfect for daily cooking, deep frying, and tadkas</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <div className="bg-[#FFFDF7] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">On Rotis or Rice</h3>
                                    <p className="text-[#FFFDF7]/80">Add a spoonful for better taste and digestion</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <div className="bg-[#FFFDF7] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Hair Oil</h3>
                                    <p className="text-[#FFFDF7]/80">Nourishes scalp, promotes strong and shiny hair</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <div className="bg-[#FFFDF7] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Baby Massage</h3>
                                    <p className="text-[#FFFDF7]/80">Gentle and safe for baby's skin and bone strength</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <div className="bg-[#FFFDF7] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Skin Moisturizer</h3>
                                    <p className="text-[#FFFDF7]/80">Natural hydration for dry skin and lips</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <div className="bg-[#FFFDF7] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Pooja & Rituals</h3>
                                    <p className="text-[#FFFDF7]/80">Pure and traditional choice for religious use</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <div className="bg-[#FFFDF7] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Oil Pulling</h3>
                                    <p className="text-[#FFFDF7]/80">Ayurvedic detox method for oral health</p>
                                </div>
                            </motion.li>
                        </motion.ul>

                        {/* CTA Button */}
                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <a
                                href="/products"
                                className="inline-flex items-center bg-[#FFFDF7] text-[#2E8B57] font-semibold py-3 px-8 rounded-full hover:bg-[#f5f5e9] transition-all duration-300 transform hover:scale-105"
                            >
                                Explore Our Oils
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Nature Benefits */}
                <motion.div
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#2E8B57]/20 flex items-start">
                        <div className="bg-[#2E8B57]/10 p-3 rounded-full mr-4 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-[#2E8B57] mb-2">Pure & Natural</h3>
                            <p className="text-gray-600 text-sm">Unrefined oils with no chemicals or additives</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#2E8B57]/20 flex items-start">
                        <div className="bg-[#2E8B57]/10 p-3 rounded-full mr-4 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-[#2E8B57] mb-2">Traditional Methods</h3>
                            <p className="text-gray-600 text-sm">Wood-pressed using time-honored techniques</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#2E8B57]/20 flex items-start">
                        <div className="bg-[#2E8B57]/10 p-3 rounded-full mr-4 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-[#2E8B57] mb-2">Nutrient Rich</h3>
                            <p className="text-gray-600 text-sm">Packed with antioxidants, vitamins, and healthy fats</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}