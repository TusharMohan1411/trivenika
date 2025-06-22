// app/components/HeroSection.jsx
'use client';

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Mock data for carousel slides (will be replaced with DB data later)
    const slides = [
        {
            id: 1,
            title: "Summer Special Offer",
            subtitle: "Get 20% off on all oils",
            image: "/hero.png",
            link: "/offers/summer-sale",
            buttonText: "Shop Now"
        },
        {
            id: 2,
            title: "New Arrivals",
            subtitle: "Freshly pressed coconut oil",
            image: "/hero.png",
            link: "/products/coconut-oil",
            buttonText: "Discover"
        },
        {
            id: 3,
            title: "Organic Spices",
            subtitle: "Pure, chemical-free spices",
            image: "/hero.png",
            link: "/category/spices",
            buttonText: "Explore"
        }
    ];

    // Auto-rotate slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

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
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="bg-[#FDF1E1] py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left - Carousel Section */}
                    <div className="w-full lg:w-[55%] relative">
                        <div className="overflow-hidden rounded-2xl shadow-xl h-[400px] sm:h-[500px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={slides[currentSlide].image}
                                            alt={slides[currentSlide].title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-2xl"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded-2xl" />
                                        <div className="absolute bottom-8 left-8 max-w-md">
                                            <motion.h2
                                                className="text-white font-bold text-3xl md:text-4xl mb-2"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                {slides[currentSlide].title}
                                            </motion.h2>
                                            <motion.p
                                                className="text-white text-lg mb-4"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                {slides[currentSlide].subtitle}
                                            </motion.p>
                                            <motion.a
                                                href={slides[currentSlide].link}
                                                className="inline-block bg-[#2E8B57] hover:bg-[#256e46] text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                {slides[currentSlide].buttonText}
                                            </motion.a>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Carousel Navigation */}
                        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
                            <button
                                onClick={prevSlide}
                                className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                                aria-label="Previous slide"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                                aria-label="Next slide"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-4 space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                        ? "bg-[#2E8B57] w-8"
                                        : "bg-gray-300 hover:bg-[#2E8B57]/50"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right - Content Section */}
                    <motion.div
                        className="flex-1"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-[#2E8B57] font-bold text-3xl md:text-4xl mb-4"
                            variants={itemVariants}
                        >
                            🌿 Pure, Natural <br />
                            <span className="text-[#1a5c38]">Wood-Pressed</span>
                        </motion.h2>

                        <motion.p
                            className="text-gray-600 text-base md:text-lg leading-relaxed mb-6"
                            variants={itemVariants}
                        >
                            Wood-pressed oils made just like dadi-nani used to — pure, slow, and full of nutrition. Experience the taste of purity and the power of nature in every drop.
                        </motion.p>

                        <motion.ul
                            className="text-base text-gray-700 space-y-2 mb-8"
                            variants={containerVariants}
                        >
                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>100% Natural & Unrefined</strong></span>
                            </motion.li>
                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>No Chemicals or Preservatives</span>
                            </motion.li>
                            <motion.li
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E8B57] mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Lab-Tested for Quality Assurance</span>
                            </motion.li>
                        </motion.ul>

                        <motion.div variants={itemVariants}>
                            <a
                                href="/products"
                                className="inline-block bg-[#2E8B57] hover:bg-[#256e46] text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                Explore Products
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Features Section */}
                <motion.div
                    className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="bg-[#2E8B57]/10 p-3 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-[#2E8B57] text-lg mb-2">Free Shipping</h3>
                        <p className="text-gray-500 text-sm">Free shipping on all orders above ₹499</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="bg-[#2E8B57]/10 p-3 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-[#2E8B57] text-lg mb-2">24/7 Support</h3>
                        <p className="text-gray-500 text-sm">Instant access to customer support</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="bg-[#2E8B57]/10 p-3 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-[#2E8B57] text-lg mb-2">Secure Payment</h3>
                        <p className="text-gray-500 text-sm">We ensure secure money transfers</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="bg-[#2E8B57]/10 p-3 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-[#2E8B57] text-lg mb-2">Genuine Quality</h3>
                        <p className="text-gray-500 text-sm">High quality, natural products</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;