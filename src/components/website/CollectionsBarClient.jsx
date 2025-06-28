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
        <div className="bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="flex space-x-6 items-center justify-center overflow-x-auto hide-scrollbar px-4 sm:px-5 py-10"
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
                                className="flex-shrink-0"
                            >
                                <Link
                                    href={`/collections/${col.slug}`}
                                    className={`group flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg p-3 rounded-2xl bg-white ${isActive
                                        ? 'shadow-xl bg-gradient-to-tr from-green-100 to-green-50'
                                        : ''
                                        }`}
                                >
                                    <div
                                        className={`p-2 rounded-full transition-all duration-200 ${isActive
                                            ? 'bg-white text-white'
                                            : 'bg-gray-200 group-hover:bg-green-100'
                                            }`}
                                    >
                                        <Image
                                            src={col.icon}
                                            alt={col.name}
                                            width={50}
                                            height={50}
                                            className="object-contain rounded-full"
                                        />
                                    </div>

                                    <span
                                        className={`mt-2 text-sm font-semibold ${isActive
                                            ? 'text-green-800'
                                            : 'text-gray-700 group-hover:text-green-700'
                                            }`}
                                    >
                                        {col.name}
                                    </span>

                                    {isActive && (
                                        <motion.div
                                            className="w-6 h-1 bg-green-600 rounded-full mt-3"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

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
