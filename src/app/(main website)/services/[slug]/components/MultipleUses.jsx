// components/MultipleUses.jsx
'use client';

import Image from 'next/image';

export default function MultipleUses({ multipleUseHeading, multipleUsePoints = [] }) {
    return (
        <div className="bg-green-600 text-white rounded-2xl px-6 py-8 flex flex-col md:flex-row items-center gap-6">
            {/* Static Chef Image */}
            <div className="flex-shrink-0">
                <Image
                    src="/chef.png" // 🔁 Replace with your actual image path in public folder
                    alt="Chef"
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px] object-contain"
                />
            </div>

            {/* Text content */}
            <div>
                <h2 className="text-lg md:text-xl font-semibold mb-3">{multipleUseHeading}</h2>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                    {multipleUsePoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
