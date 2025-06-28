"use client"
// app/not-found.jsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WebsiteLayout from '@/components/website/WebsiteLayout';

export default function NotFound() {
    return (
        <WebsiteLayout>
            <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center justify-center px-4">
                <div className="max-w-3xl w-full text-center">
                    {/* Animated 404 Text */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <h1 className="text-9xl md:text-[12rem] font-bold text-[#1a3c32] opacity-10">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.h1
                                className="text-6xl md:text-8xl font-bold text-[#1a3c32]"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                            >
                                Page Not Found
                            </motion.h1>
                        </div>
                    </motion.div>

                    {/* Message */}
                    <motion.p
                        className="mt-6 text-xl text-[#1a3c32]/90 max-w-xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Oops! The page you're looking for seems to have wandered off into the wilderness.
                    </motion.p>

                    {/* Home Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12"
                    >
                        <Link href="/">
                            <motion.div
                                className="inline-block px-8 py-4 bg-[#1a3c32] text-[#f5f5dc] rounded-full font-medium text-lg shadow-lg"
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#2d5b4d",
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Return to Home
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Additional Links */}
                    <motion.div
                        className="mt-8 flex flex-wrap justify-center gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <Link href="/collections" className="text-[#1a3c32] hover:text-[#2d5b4d] font-medium">
                            Browse Collections
                        </Link>
                        <Link href="/products" className="text-[#1a3c32] hover:text-[#2d5b4d] font-medium">
                            View Products
                        </Link>
                        <Link href="/contact" className="text-[#1a3c32] hover:text-[#2d5b4d] font-medium">
                            Contact Support
                        </Link>
                    </motion.div>
                </div>

                {/* Floating Leaves */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-[#1a3c32] opacity-20"
                            style={{
                                fontSize: `${Math.random() * 30 + 20}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, (i % 2 === 0 ? 10 : -10), 0],
                                rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            }}
                        >
                            🍃
                        </motion.div>
                    ))}
                </div>
            </div>
        </WebsiteLayout>
    );
}