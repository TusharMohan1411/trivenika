// components/CollectionsBarClient.jsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CollectionsBarClient({ collections }) {
    const pathname = usePathname();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.06, ease: 'easeOut' } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="overflow-x-auto hide-scrollbar py-2 sm:py-4 mt-3">
            <motion.div
                className="flex w-full space-x-2 sm:space-x-4 justify-start sm:justify-center snap-x snap-mandatory px-2 sm:px-5"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {collections.map((col) => {
                    const isActive = pathname.includes(`/collections/${col.slug}`);
                    return (
                        <motion.div
                            key={col._id}
                            variants={itemVariants}
                            className="flex-shrink-0 w-32 sm:w-40 sm:h-32 snap-center"
                        >
                            <Link
                                href={`/collections/${col.slug}`}
                                className={`group flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg p-2 sm:p-3 rounded-2xl bg-white border ${isActive
                                    ? 'border-primary bg-gradient-to-tr border-2 from-green-100 to-green-50'
                                    : 'border-gray-300'
                                    }`}
                            >
                                <div
                                    className={`p-0 sm:p-2 rounded-full transition-all duration-200 ${isActive
                                        ? 'bg-white'
                                        : 'bg-gray-200 group-hover:bg-green-100'
                                        }`}
                                >
                                    <Image
                                        src={col.icon}
                                        alt={col.name}
                                        width={100}
                                        height={100}
                                        className="h-12 sm:h-14 w-12 sm:w-14 object-contain rounded-full"
                                    />
                                </div>

                                <span
                                    className={`mt-2 text-xs sm:text-sm font-semibold text-center ${isActive
                                        ? 'text-green-800'
                                        : 'text-gray-700 group-hover:text-green-700'
                                        }`}
                                >
                                    {col.name}
                                </span>
                                {/* 
                                {isActive && (
                                    <motion.div
                                        className="w-6 h-1 bg-green-600 rounded-full mt-2"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                )} */}
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}