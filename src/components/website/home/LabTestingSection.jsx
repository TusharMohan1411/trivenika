// app/components/LabTestingSection.jsx
'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function LabTestingSection() {
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
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        rest: {
            scale: 1,
            y: 0
        },
        hover: {
            scale: 1.03,
            y: -5,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    return (
        <section className="bg-[#FFFDF7] px-4 md:px-8 py-b md:pb-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Text Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.span
                            className="inline-block bg-[#e8f5e9] text-[#2E8B57] font-semibold text-sm px-4 py-2 rounded-full mb-6"
                            variants={itemVariants}
                        >
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Purity You Can Trust
                            </div>
                        </motion.span>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-6"
                            variants={itemVariants}
                        >
                            Lab Testing & Quality Assurance
                        </motion.h2>

                        <motion.p
                            className="text-gray-700 mb-6 text-lg leading-relaxed"
                            variants={itemVariants}
                        >
                            We believe in complete transparency and quality. Every batch of our
                            wood-pressed oils is tested in certified laboratories to ensure it
                            is:
                        </motion.p>

                        <motion.ul
                            className="space-y-4 mb-8"
                            variants={containerVariants}
                        >
                            {[
                                "100% pure and unrefined",
                                "Free from harmful chemicals & preservatives",
                                "Safe, nutritious, and rich in natural antioxidants"
                            ].map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    className="flex items-start"
                                    variants={itemVariants}
                                >
                                    <div className="bg-[#2E8B57]/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57]" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 text-lg">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.p
                            className="text-gray-700 mb-10 text-lg leading-relaxed"
                            variants={itemVariants}
                        >
                            From sourcing premium seeds to cold extraction in wooden ghanis, we
                            maintain strict hygiene and testing standards — so you get only the
                            best, just as nature intended.
                        </motion.p>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            variants={containerVariants}
                        >
                            {[
                                {
                                    title: "FSSAI Certified",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "No Added Preservatives",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Free from Adulteration",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    )
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-white border border-[#2E8B57]/20 rounded-xl p-4 flex flex-col items-center text-center"
                                    variants={itemVariants}
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                >
                                    <div className="bg-[#2E8B57]/10 p-3 rounded-full mb-3">
                                        {item.icon}
                                    </div>
                                    <span className="text-gray-800 font-medium">{item.title}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Image Section */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative aspect-square w-full max-w-lg mx-auto">
                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#2E8B57]/10 rounded-full z-0"></div>
                            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#2E8B57]/10 rounded-full z-0"></div>

                            {/* Main image */}
                            <motion.div
                                className="relative w-full h-full rounded-2xl overflow-hidden border-8 border-white shadow-xl z-10"
                                whileHover={{ rotate: -1 }}
                            >
                                <Image
                                    src={"/lab-report.png"}
                                    alt="Lab Report"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            {/* Floating certification badges */}
                            <motion.div
                                className="absolute -bottom-6 left-6 bg-white shadow-lg rounded-lg p-4 z-20"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center">
                                    <div className="bg-[#2E8B57]/10 p-2 rounded-full mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#2E8B57]">ISO Certified Lab</p>
                                        <p className="text-xs text-gray-500">Testing Facility</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute -top-6 right-6 bg-white shadow-lg rounded-lg p-4 z-20"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center">
                                    <div className="bg-[#2E8B57]/10 p-2 rounded-full mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#2E8B57]">Batch Reports</p>
                                        <p className="text-xs text-gray-500">Available Online</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Quality assurance process */}
                        <motion.div
                            className="mt-12 bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] rounded-2xl p-6 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="absolute top-0 left-0 w-48 h-48 bg-[#ffffff]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffffff]/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Our Quality Assurance Process
                            </h3>

                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { step: "1", title: "Sourcing", desc: "Premium organic seeds" },
                                    { step: "2", title: "Extraction", desc: "Wood-pressed method" },
                                    { step: "3", title: "Testing", desc: "Lab certification" }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-[#ffffff]/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                        <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="font-bold text-[#2E8B57]">{item.step}</span>
                                        </div>
                                        <h4 className="font-semibold text-white">{item.title}</h4>
                                        <p className="text-xs text-white/80 max-[600px]:hidden">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Trust badges */}
                {/* <motion.div
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <div className="bg-white rounded-2xl p-6 text-center border border-[#2E8B57]/10 flex flex-col items-center">
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-[#2E8B57]">FSSAI Certified</h3>
                        <p className="text-gray-600 text-sm">Food Safety Certified</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center border border-[#2E8B57]/10 flex flex-col items-center">
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-[#2E8B57]">ISO Standards</h3>
                        <p className="text-gray-600 text-sm">Quality Management</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center border border-[#2E8B57]/10 flex flex-col items-center">
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-[#2E8B57]">100% Natural</h3>
                        <p className="text-gray-600 text-sm">No Chemicals Added</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center border border-[#2E8B57]/10 flex flex-col items-center">
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-[#2E8B57]">Eco-Friendly</h3>
                        <p className="text-gray-600 text-sm">Sustainable Practices</p>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}