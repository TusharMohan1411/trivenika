// app/components/TestimonialSlider.jsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        name: "Riya Verma",
        location: "Kurukshetra, Haryana",
        image: "/testimonial1.png",
        text: "I've tried many ghee brands, but this A2 Desi Cow Ghee has a rich aroma and taste that reminds me of homemade ghee. I feel more energetic and my digestion has improved too!",
        photo: "/user1.jpg",
    },
    {
        name: "Avinash Arora",
        location: "Mumbai, Maharashtra",
        image: "/testimonial1.png",
        text: "I've tried many ghee brands, but this A2 Desi Cow Ghee has a rich aroma and taste that reminds me of homemade ghee. I feel more energetic and my digestion has improved too!",
        photo: "/user2.jpg",
    },
    {
        name: "Pooja Singh",
        location: "Lucknow, UP",
        image: "/testimonial1.png",
        text: "Very authentic product. My family loved the aroma and purity of the ghee. Will definitely buy again!",
        photo: "/user3.jpg",
    },
    {
        name: "Ramesh Kumar",
        location: "Delhi",
        image: "/testimonial1.png",
        text: "Best oil and ghee quality. I use them for daily cooking and even for rituals. Highly recommended!",
        photo: "/user4.jpg",
    },
];

export default function TestimonialSlider() {
    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const next = () => {
        setIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const visibleTestimonials = [
        testimonials[index],
        testimonials[(index + 1) % testimonials.length],
    ];

    return (
        <section className="bg-[#FFFCF6] py-12 px-4 md:px-16">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    What Our Customers Say
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                    Real Stories. Genuine Experiences. Trusted by Families Across India.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleTestimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col gap-4"
                        >
                            <div className="text-yellow-500 text-xl">★★★★★</div>
                            <p className="text-gray-700 text-sm">{t.text}</p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div>
                                    <p className="font-semibold text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.location}</p>
                                </div>
                            </div>
                            <div className="w-full h-40 rounded-lg overflow-hidden mt-2">
                                <Image
                                    src={t.image}
                                    alt="testimonial"
                                    height={300}
                                    width={100}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex justify-center gap-6 mt-8">
                    <button
                        onClick={prev}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={next}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
