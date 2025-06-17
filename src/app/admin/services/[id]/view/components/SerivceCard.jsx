import Image from 'next/image';
import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center max-w-md bg-white shadow-md rounded-xl overflow-hidden p-4 mx-auto">
            <div className="w-full sm:w-1/3 relative h-32 sm:h-36">
                <Image
                    src={service.imageURL}
                    alt={service.name}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>
            <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{service.name}</h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">{service.shortDescription}</p>
                <a
                    href={"#"}
                    className="inline-block mt-4 px-4 py-2 bg-[#0A3460] text-white text-sm rounded-full hover:bg-[#082c50] transition"
                >
                    Read More
                </a>
            </div>
        </div>
    );
};

export default ServiceCard;
