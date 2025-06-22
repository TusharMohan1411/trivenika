// app/components/TestimonialSlider.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";


const testimonials = [
    {
        name: "Riya Verma",
        location: "Kurukshetra, Haryana",
        image: "/testimonial1.png",
        text: "I've tried many ghee brands, but this A2 Desi Cow Ghee has a rich aroma and taste that reminds me of homemade ghee. I feel more energetic and my digestion has improved too!",
    },
    {
        name: "Avinash Arora",
        location: "Mumbai, Maharashtra",
        image: "/testimonial1.png",
        text: "The wood-pressed coconut oil has transformed my hair care routine. After just 2 months of use, my hair is stronger and shinier than ever before. Truly authentic!",
    },
    {
        name: "Pooja Singh",
        location: "Lucknow, UP",
        image: "/testimonial1.png",
        text: "Very authentic product. My family loved the aroma and purity of the ghee. Will definitely buy again!",
    },
    {
        name: "Ramesh Kumar",
        location: "Delhi",
        image: "/testimonial1.png",
        text: "Best oil and ghee quality. I use them for daily cooking and even for rituals. Highly recommended!",
    },
    {
        name: "Sunita Reddy",
        location: "Hyderabad, Telangana",
        image: "/testimonial1.png",
        text: "The spices are incredibly fresh and aromatic. They've completely elevated my cooking. The packaging is eco-friendly too!",
    },
];

export default function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 0: left, 1: right
    const [itemsPerView, setItemsPerView] = useState(3);
    const sliderRef = useRef(null);
    const [paused, setPaused] = useState(false);

    // Auto-rotate slides every 5 seconds
    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [paused]);

    // Handle responsive items per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerView(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerView(2);
            } else {
                setItemsPerView(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setDirection(0);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : 0);
        setCurrentIndex(index);
    };

    // Calculate visible testimonials
    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < itemsPerView; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push(testimonials[index]);
        }
        return visible;
    };

    const visibleTestimonials = getVisibleTestimonials();

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

    const testimonialVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 1
        }),
        center: {
            x: 0,
            // opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0
        })
    };

    return (
        <section
            className="bg-[#FFFCF6] py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#2E8B57]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#2E8B57]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div
                        className="inline-block mb-6"
                        variants={itemVariants}
                    >
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-4"
                        variants={itemVariants}
                    >
                        What Our Customers Say
                    </motion.h2>

                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Real Stories. Genuine Experiences. Trusted by Families Across India.
                    </motion.p>

                    {/* Nature divider */}
                    <motion.div
                        className="mt-8 flex justify-center"
                        variants={itemVariants}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-32 h-0.5 bg-[#2E8B57]/20"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <div className="bg-[#2E8B57] w-3 h-3 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Navigation arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all -translate-x-1/2"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="text-[#2E8B57]" size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all translate-x-1/2"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="text-[#2E8B57]" size={24} />
                    </button>

                    {/* Testimonials grid */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        ref={sliderRef}
                    >
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            {visibleTestimonials.map((testimonial, index) => (
                                <motion.div
                                    key={`${testimonial.name}-${currentIndex}-${index}`}
                                    custom={direction}
                                    variants={testimonialVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="h-full"
                                >
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#2E8B57]/10 h-full flex flex-col">
                                        {/* Testimonial image - vertical orientation */}
                                        <div className="relative h-48 md:h-56">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex items-center mb-4">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 text-yellow-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-gray-700 italic mb-6 flex-grow">
                                                "{testimonial.text}"
                                            </p>

                                            <div className="flex items-center gap-3 mt-auto">
                                                {/* User placeholder with nature icon */}
                                                <div className="bg-[#2E8B57]/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center mt-10 space-x-2">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx
                                    ? "bg-[#2E8B57] w-8"
                                    : "bg-gray-300 hover:bg-[#2E8B57]/50"
                                    }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Trust badges */}
                <motion.div
                    className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] rounded-3xl p-8 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="absolute top-0 left-0 w-48 h-48 bg-[#ffffff]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffffff]/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">
                            Trusted by Thousands of Families
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-[#ffffff]/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-white">4.9/5</p>
                                <p className="text-white/80 text-sm">Customer Rating</p>
                            </div>

                            <div className="bg-[#ffffff]/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-white">10K+</p>
                                <p className="text-white/80 text-sm">Happy Families</p>
                            </div>

                            <div className="bg-[#ffffff]/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-white">100%</p>
                                <p className="text-white/80 text-sm">Natural Products</p>
                            </div>

                            <div className="bg-[#ffffff]/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-white">50+</p>
                                <p className="text-white/80 text-sm">Cities Served</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}