// app/components/HeroSection.jsx
'use client';

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/parallax';
import { useRef } from "react";
import { Truck, Headset, Lock, BadgeCheck } from 'lucide-react';


const HeroSection = () => {
    const swiperRef = useRef(null);
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Variants for staggering
    const featuresContainer = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, when: 'beforeChildren' }
        }
    };
    const featureItem = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    const features = [
        { Icon: Truck, title: 'Free Shipping', text: 'On all orders above ₹499' },
        { Icon: Headset, title: '24/7 Support', text: 'Instant customer support' },
        { Icon: Lock, title: 'Secure Payment', text: 'Safe & encrypted payments' },
        { Icon: BadgeCheck, title: 'Genuine Quality', text: '100% organic products' }
    ];

    return (
        <section className="bg-[#FDF1E1] pt-4 sm:pt-8 pb-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left - Carousel Section */}
                    <div className="w-full lg:w-[65%] aspect-[16/9] relative">
                        <Swiper
                            ref={swiperRef}
                            modules={[Parallax, Autoplay, Pagination, Navigation]}
                            parallax={true}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            speed={800}
                            pagination={{ clickable: true }}
                            navigation={false}
                            loop={true}
                            className="rounded-2xl shadow-xl relative h-full"
                        >
                            <div
                                slot="container-start"
                                className="absolute inset-0"
                                data-swiper-parallax="-20%"
                            >
                                {/* Background gradient if needed */}
                            </div>

                            {slides.map((slide, index) => (
                                <SwiperSlide key={index} className="relative w-full h-full">
                                    <div className="w-full h-full relative">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Right - Content Section */}
                    <motion.div
                        className="flex-1 max-[640px]:px-2"
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

                        <motion.div variants={itemVariants} className=" text-center sm:text-left">
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
                    className="mt-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={featuresContainer}
                >
                    {features.map(({ Icon, title, text }, i) => (
                        <motion.div
                            key={i}
                            className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg duration-300 ease-in-out flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1"
                            variants={featureItem}
                        >
                            <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full mb-4">
                                <Icon className="h-6 sm:h-8 h6 sm:w-8 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-lg mb-2">{title}</h3>
                            <p className="text-gray-500 text-sm">{text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;