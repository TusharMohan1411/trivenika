import Image from 'next/image';
import React from 'react';

const ServiceCard = ({ image, title, description, link }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-xl overflow-hidden p-4 max-w-2xl mx-auto">
            <div className="w-full sm:w-1/3 relative h-32 sm:h-36">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>
            <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">{description}</p>
                <a
                    href={link}
                    className="inline-block mt-4 px-4 py-2 bg-[#0A3460] text-white text-sm rounded-full hover:bg-[#082c50] transition"
                >
                    Read More
                </a>
            </div>
        </div>
    );
};

export default ServiceCard;
