// app/components/TestimonialSlider.jsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";

export default function Testimonials({ testimonials }) {

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
                                        src={t.imageURL}
                                        alt={`${t.name} testimony`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-6 flex flex-col h-full">
                                    {/* <div className="text-yellow-400 text-xl mb-3">★★★★★</div> */}
                                    <h3 className="font-bold text-lg mb-2">{t.company}</h3>
                                    <p className="text-gray-800 text-base mb-4 flex-grow">
                                        “{t.message}”
                                    </p>

                                    <div className="mt-3 flex items-center gap-3">
                                        {/* User icon */}
                                        <BiUserCircle className="text-4xl text-[#2E8B57]" />
                                        <div>
                                            <p className="font-semibold text-gray-900">{t.userName}</p>
                                            <p className="text-xs text-gray-500">{t.designation}</p>
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
