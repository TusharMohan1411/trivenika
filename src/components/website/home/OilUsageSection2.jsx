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
        <section className="px-4 md:px-8 pt-8 bg-[#FFFDF7] relative overflow-hidden">

            <div className="">
                {/* Section header */}
                <motion.div
                    className="text-center mb-6"
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
                    className="bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] rounded-xl p-0 md:p-1 grid grid-cols-1 lg:grid-cols-3 items-center gap-8 md:gap-2 overflow-hidden shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-48 h-48 bg-[#ffffff]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffffff]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

                    <motion.div
                        className="w-full h-full"
                    >
                        <Image
                            src="/uses.png"
                            alt="Oil Uses"
                            height={1000}
                            width={1000}
                            className="object-cover z-10 rounded-2xl h-full"
                        />
                    </motion.div>


                    {/* Text content */}
                    <div className="flex-1 px-4 py-2">
                        <motion.h2
                            className="text-2xl md:text-2xl font-bold text-white mb-3"
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
                                    <p className="text-[#FFFDF7]/80 text-sm sm:text-sm">Perfect for daily cooking, deep frying, and tadkas</p>
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
                                    <p className="text-[#FFFDF7]/80 text-sm sm:text-sm">Add a spoonful for better taste and digestion</p>
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
                                    <p className="text-[#FFFDF7]/80 text-sm sm:text-sm">Nourishes scalp, promotes strong and shiny hair</p>
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
                                    <p className="text-[#FFFDF7]/80 text-sm sm:text-sm">Gentle and safe for baby's skin and bone strength</p>
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
                                    <p className="text-[#FFFDF7]/80 text-sm sm:text-sm">Natural hydration for dry skin and lips</p>
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
                                    <p className="text-[#FFFDF7]/80 text-sm sm:text-sm">Pure and traditional choice for religious use</p>
                                </div>
                            </motion.li>
                        </motion.ul>
                    </div>

                    <motion.div
                        className=" h-full"
                    >
                        <Image
                            src="/uses2.png"
                            alt="Oil Uses"
                            height={1000}
                            width={1000}
                            className="object-cover z-10 h-full rounded-2xl"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}