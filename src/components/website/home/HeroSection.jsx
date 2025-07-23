// app/components/HeroSection.jsx
'use client';
'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/parallax';

import { Truck, Headset, Lock, BadgeCheck } from 'lucide-react';

export default function HeroSection({ banners = [] }) {
    // No useEffect or loading state anymore
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const featuresContainer = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, when: "beforeChildren" },
        },
    };

    const featureItem = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    };

    const features = [
        { Icon: Truck, title: 'Free Shipping', text: 'On all orders above ₹999' },
        { Icon: Headset, title: '24/7 Support', text: 'Instant customer support' },
        { Icon: Lock, title: 'Secure Payment', text: 'Safe & encrypted payments' },
        { Icon: BadgeCheck, title: 'Genuine Quality', text: '100% organic products' }
    ];

    return (
        <section className="bg-[#FDF1E1] pt-13 sm:pt-12 pb-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    <div className="w-full lg:w-[65%] aspect-[16/9] relative">
                        {banners?.length === 0 ? (
                            <div className="w-full h-full flex items-center justify-center bg-white rounded-xl">
                                <p className="text-gray-400">No banners available</p>
                            </div>
                        ) : (
                            <Swiper
                                modules={[Parallax, Autoplay, Pagination, Navigation]}
                                parallax={true}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                speed={800}
                                pagination={{ clickable: true }}
                                navigation={false}
                                loop={true}
                                className="rounded-2xl shadow-xl relative h-full"
                            >
                                {banners.map((slide, index) => (
                                    <SwiperSlide key={slide._id || index}>
                                        <div className="w-full h-full relative group">
                                            {slide.link ? (
                                                <Link href={slide.link}>
                                                    <Image
                                                        src={slide.image}
                                                        alt={`Banner ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </Link>
                                            ) : (
                                                <Image
                                                    src={slide.image}
                                                    alt={`Banner ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}

                                            {slide.link && (
                                                <a
                                                    href={slide.link}
                                                    className="absolute bottom-4 left-4 bg-[#2E8B57] text-white px-5 py-2 rounded shadow-md hover:bg-[#256e46] transition"
                                                >
                                                    {slide.buttonText || "Shop Now"}
                                                </a>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
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
