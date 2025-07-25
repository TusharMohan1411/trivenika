'use client'
import React from 'react'
import { motion } from 'framer-motion' // Import Framer Motion
import WebsiteLayout from '@/components/website/WebsiteLayout'
import ServicesBox from './ServicesBox'
import {
    FaLeaf,
    FaFlask,
    FaRecycle,
    FaPaw,
} from 'react-icons/fa'

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
}

const fadeIn = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
}

export default function ServicesClient({ services }) {
    const badges = [
        { label: 'Organic', Icon: FaLeaf },
        { label: 'Chemical-Free', Icon: FaFlask },
        { label: 'Sustainable', Icon: FaRecycle },
        { label: 'Cruelty-Free', Icon: FaPaw },
    ]

    return (
        <WebsiteLayout>
            <div className='pb-10 sm:pb-20 pt-6 sm:pt-0'>
                {/* Enhanced Header Section */}
                <div className="relative overflow-hidden">
                    {/* Background animation */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        initial="hidden"
                        animate="show"
                        variants={fadeIn}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#e8f5e9] to-transparent opacity-90"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[url('/images/nature-pattern.svg')] bg-repeat-x opacity-20"></div>
                    </motion.div>

                    <motion.div
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-12 md:pt-16 md:py-16 relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <div className="text-center">
                            {/* Tagline */}
                            <motion.div
                                className="inline-flex items-center justify-center mb-4"
                                variants={itemVariants}
                            >
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                <span className="text-emerald-600 font-medium">100% Natural Products</span>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full ml-2"></div>
                            </motion.div>

                            {/* Main heading */}
                            <motion.h1
                                className='font-bold text-4xl md:text-5xl lg:text-6xl mb-5 tracking-tight text-gray-900'
                                variants={itemVariants}
                            >
                                Pure Nature, <span className="text-emerald-600">Pure Wellness</span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                className="text-xs md:text-lg text-gray-600 max-w-2xl mx-auto mb-8"
                                variants={itemVariants}
                            >
                                Discover our carefully crafted natural products that bring harmony to your body and soul.
                                Each formulation is a blend of traditional wisdom and modern science.
                            </motion.p>

                            {/* Badges */}
                            <motion.div
                                className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                            >
                                {badges.map(({ label, Icon }, i) => (
                                    <motion.span
                                        key={i}
                                        className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs sm:text-sm font-medium inline-flex items-center"
                                        variants={itemVariants}
                                        custom={i}
                                    >
                                        <Icon className="w-3 h-3 mr-1" aria-hidden="true" />
                                        {label}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Products Grid Section (no animation) */}
                <div className='w-full mt-6'>
                    <ServicesBox services={services} />
                </div>
            </div>
        </WebsiteLayout>
    )
}