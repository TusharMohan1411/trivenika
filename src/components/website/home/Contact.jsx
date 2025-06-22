import React from 'react';
import { ContactForm } from '../common/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaBuilding, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
    return (
        <section className="relative overflow-hidden pt-10 pb-28 px-4 bg-gradient-to-br from-[#fffef8] to-[#fdfdf0]">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-yellow-100 opacity-40"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-yellow-100 opacity-30"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-yellow-100 opacity-20"></div>
            </div>

            {/* Floating shapes */}
            <div className="absolute top-40 left-20 w-16 h-16 rounded-lg bg-[#F5EFE6] opacity-20 rotate-45"></div>
            <div className="absolute bottom-40 right-24 w-20 h-20 rounded-full bg-yellow-200 opacity-20"></div>

            {/* Main content */}
            <div className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center px-6 py-2 bg-white rounded-full shadow-sm mb-4">
                        <span className="text-sm font-medium text-emerald-600">Get in Touch</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Connect With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00564F] to-teal-600">Farmers & Experts</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Have questions or need assistance? Our team is ready to provide personalized guidance.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 bg-white shadow-xl rounded-3xl">
                    {/* Left: Contact Info */}
                    <div className="lg:w-2/5">
                        <div className=" p-8 h-full">
                            <div className="mb-10">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Office</h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#00564F] to-teal-500 rounded-full mb-6"></div>
                                <p className="text-gray-600 mb-8">
                                    Visit our office or reach out through any of our communication channels. We're here to help you with all your legal needs.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-[#00564F] text-xl" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-800 mb-1">Address</h4>
                                        <p className="text-gray-600">Kirdhan Rd, Dhingsara, Haryana, India</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center">
                                        <FaPhone className="text-[#00564F] text-xl" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                                        <p className="text-gray-600">+91 85699 96206</p>
                                        <div className="mt-2 flex items-center text-sm text-green-600">
                                            <FaWhatsapp className="mr-2" />
                                            <span>Available on WhatsApp</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                                        <FaEnvelope className="text-[#00564F] text-xl" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                                        <p className="text-gray-600">contact@trivenika.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:w-3/5">
                        <div className="p-3 md:p-8 h-full">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}