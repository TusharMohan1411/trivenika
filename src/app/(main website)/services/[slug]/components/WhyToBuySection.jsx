// components/WhyToBuySection.jsx
import React from 'react';
import Image from 'next/image';

const WhyToBuySection = ({ whyToBuy }) => {
    if (!whyToBuy || whyToBuy.length === 0) return null;

    return (
        <section className="py-16 bg-amber-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-amber-800 mb-4">
                        Why Choose Our Natural Products?
                    </h2>
                    <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whyToBuy.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-2"
                        >
                            <div className="relative h-48 bg-gradient-to-r from-amber-100 to-amber-200">
                                {item.icon && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white p-4 rounded-full shadow-lg border-4 border-amber-100">
                                            <Image
                                                src={item.icon}
                                                alt={item.title || "Benefit icon"}
                                                width={80}
                                                height={80}
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-amber-900 mb-2">{item.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center bg-amber-800 text-white px-6 py-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">100% Natural, Chemical-Free & Traditionally Made</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyToBuySection;