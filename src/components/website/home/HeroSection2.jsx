"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function HeroSection2() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            title: "Expert Tax Advisory Services",
            subtitle: "Strategic Tax Planning & Compliance Solutions",
            image: "/hero1.jpg"
        },
        {
            title: "Corporate Tax Specialists",
            subtitle: "Optimizing Business Tax Structures Since 2005",
            image: "/hero2.jpg"
        },
        {
            title: "Tax Dispute Resolution",
            subtitle: "Effective Representation Before Tax Authorities",
            image: "/hero3.jpg"
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative w-full h-[92vh] overflow-hidden">
            {/* Sliding Image Carousel */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <motion.div
                    className="flex h-full"
                    animate={{ x: `-${currentSlide * 100}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full flex-shrink-0 h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Dark Blue Overlay (#003366) */}
            <div className="absolute inset-0 bg-[#021f3b]/80 z-10" />

            {/* Content Overlay */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
                <div className="max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-bold text-yellow-200 mb-4 font-poppins"
                        >
                            {slides[currentSlide].title}
                        </motion.h1>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`subtitle-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
                        >
                            {slides[currentSlide].subtitle}
                        </motion.p>
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href={'/talk-to-lawyer'}>
                            <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
                                Talk to Expert
                            </button>
                        </Link>
                        <Link href={'/services'}>
                            <button className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
                                Our Services
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                            ? 'bg-white w-6 scale-125'
                            : 'bg-gray-300 hover:bg-gray-100'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-[#01021c] to-transparent z-10"></div>
        </div>
    );
}

export default HeroSection2;
