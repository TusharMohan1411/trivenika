'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function ServicesBox({ services }) {
    return (
        <div className="w-full lg:flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {services?.map(service => (
                    <div key={service._id} className="flex flex-row sm:flex-row  bg-white shadow-md rounded-xl overflow-hidden p-4">
                        <div className="w-1/3 relative h-32 sm:h-36">
                            <Image
                                src={service.imageURL}
                                alt={service.name}
                                fill
                                className="object-cover rounded-lg" />
                        </div>
                        <div className="ml-5 sm:ml-6 flex-1">
                            <h3 className="text-lg sm:text-lg font-bold text-gray-900">{service.name}</h3>
                            <p className="text-gray-600 mt-1 text-xs sm:text-base">{service.shortDescription}</p>
                            <Link href={`/services/${service.slug}`} passHref
                                className="inline-block mt-4 px-4 py-2 bg-[#0A3460] text-white text-sm rounded-full hover:bg-[#082c50] transition"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServicesBox;
