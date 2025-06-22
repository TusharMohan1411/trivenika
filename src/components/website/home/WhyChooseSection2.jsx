// app/components/WhyChooseSection.jsx
'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const reasons = [
    {
        image: "/i1.png",
        title: "Wood-Pressed Extraction",
        desc: "Traditional cold-press (lakdi-ka-ghan) method that preserves nutrients and flavor.",
        color: "#e8f5e9"
    },
    {
        image: "/i2.png",
        title: "100% Natural & Pure",
        desc: "No chemicals, no preservatives — just the goodness of raw seeds and nature.",
        color: "#f1f8e9"
    },
    {
        image: "/i3.png",
        title: "Lab Tested for Safety",
        desc: "Every batch is tested for purity, safety, and nutritional value.",
        color: "#e8f5e9"
    },
    {
        image: "/i4.png",
        title: "Nutrient-Rich Oils",
        desc: "Packed with antioxidants, vitamins, and healthy fats for daily wellness.",
        color: "#f1f8e9"
    },
    {
        image: "/i5.png",
        title: "Freshly Packed in Small Batches",
        desc: "We produce in limited batches to maintain freshness and quality.",
        color: "#e8f5e9"
    },
    {
        image: "/i6.png",
        title: "Made with Love in India",
        desc: "Locally sourced seeds and proudly made using traditional Indian methods.",
        color: "#f1f8e9"
    },
];

export default function WhyChooseSection2() {
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

    const iconVariants = {
        rest: {
            scale: 1,
            rotate: 0
        },
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

    return (
        <section className="bg-[#FFFDF7] px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#2E8B57]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#2E8B57]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto">
                {/* Section header with animation */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-4">
                        Why Choose Wood–Pressed Oils?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover the purity of traditional extraction methods that preserve nature's goodness
                    </p>

                    {/* Nature divider */}
                    <div className="mt-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-32 h-0.5 bg-[#2E8B57]/20"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <div className="bg-[#2E8B57] w-3 h-3 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Cards with animations */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {reasons.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="relative group"
                            variants={itemVariants}
                        >
                            {/* Card with hover animation */}
                            <motion.div
                                className="h-full bg-white rounded-xl overflow-hidden border border-[#e8f5e9]"
                                variants={cardVariants}
                                initial="rest"
                                whileHover="hover"
                            >
                                <div className="p-8 flex flex-col h-full">
                                    {/* Icon with animation */}
                                    <motion.div
                                        className="w-16 h-16 mb-6 flex items-center justify-center rounded-full"
                                        style={{ backgroundColor: item.color }}
                                        variants={iconVariants}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={40}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-[#2E8B57] mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 flex-grow">
                                        {item.desc}
                                    </p>

                                    {/* Learn more link */}
                                    <div className="mt-auto">
                                        <a
                                            href="#"
                                            className="inline-flex items-center text-[#2E8B57] font-medium group-hover:underline"
                                        >
                                            Learn more
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-[#2E8B57] border-r-white"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Nature Commitment */}
                <motion.div
                    className="mt-24 max-w-4xl mx-auto bg-[#f8fbf3] rounded-2xl p-8 md:p-12 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* Decorative leaf pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                        <svg viewBox="0 0 100 100" className="text-[#2E8B57]">
                            <path d="M50,5 C70,15 85,35 85,60 C85,85 65,95 50,95 C35,95 15,85 15,60 C15,35 30,15 50,5 Z" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="bg-[#2E8B57]/10 w-20 h-20 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#2E8B57] mb-4">
                                    Our Commitment to Nature
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    We partner with local farmers who use traditional methods to produce oils and spices that are not only pure but also sustainable. Each product supports eco-friendly practices and fair trade.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="bg-[#2E8B57]/10 text-[#2E8B57] px-4 py-2 rounded-full text-sm font-medium">
                                        Eco-friendly Packaging
                                    </span>
                                    <span className="bg-[#2E8B57]/10 text-[#2E8B57] px-4 py-2 rounded-full text-sm font-medium">
                                        Sustainable Farming
                                    </span>
                                    <span className="bg-[#2E8B57]/10 text-[#2E8B57] px-4 py-2 rounded-full text-sm font-medium">
                                        Fair Trade Practices
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}