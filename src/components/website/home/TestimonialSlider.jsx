// app/components/TestimonialSlider.jsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";

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
    return (
        <section className="bg-[#FFFCF6] py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2E8B57]">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Real Stories. Genuine Experiences. Trusted by Families Across India.
                    </p>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    speed={1200}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {testimonials.map((t, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="bg-white rounded-2xl overflow-hidden border-2 flex flex-col h-full">
                                {/* Vertical Testimonial image */}
                                <div className="w-full h-72 relative">
                                    <Image
                                        src={t.image}
                                        alt={`${t.name} testimony`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-6 flex flex-col h-full">
                                    {/* <div className="text-yellow-400 text-xl mb-3">★★★★★</div> */}
                                    <h3 className="font-bold text-lg mb-2">Excellent Quality</h3>
                                    <p className="text-gray-800 text-base mb-4 flex-grow">
                                        “{t.text}”
                                    </p>

                                    <div className="mt-3 flex items-center gap-3">
                                        {/* User icon */}
                                        <BiUserCircle className="text-4xl text-[#2E8B57]" />
                                        <div>
                                            <p className="font-semibold text-gray-900">{t.name}</p>
                                            <p className="text-xs text-gray-500">{t.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
