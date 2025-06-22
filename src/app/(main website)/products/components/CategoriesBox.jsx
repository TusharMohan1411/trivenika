'use client';
import React from 'react';
import { motion } from 'framer-motion';

const CategoriesBox = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="w-full">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-5 border border-[#e0e7ff]">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#d1ddf0]">
                    <h2 className="text-xl font-bold text-[#0A3460]">Browse Categories</h2>
                    <div className="bg-[#0A3460] text-white text-xs font-bold px-2 py-1 rounded-md">
                        {categories.length}
                    </div>
                </div>

                <ul className="space-y-2">
                    {/* All Categories */}
                    <motion.li whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                            onClick={() => onSelectCategory('all')}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${selectedCategory === 'all'
                                    ? 'bg-gradient-to-r from-[#0A3460] to-[#1e5a9e] text-white shadow-lg'
                                    : 'text-[#0A3460] hover:bg-[#f0f5ff]'
                                }`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full ${selectedCategory === 'all' ? 'bg-white' : 'bg-[#0A3460]'
                                    }`}
                            ></span>
                            <span className="font-medium">All Categories</span>
                        </button>
                    </motion.li>

                    {/* Dynamic Categories */}
                    {categories.map((cat) => (
                        <motion.li key={cat._id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <button
                                onClick={() => onSelectCategory(cat._id)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${selectedCategory === cat._id
                                        ? 'bg-gradient-to-r from-[#0A3460] to-[#1e5a9e] text-white shadow-lg'
                                        : 'text-[#0A3460] hover:bg-[#f0f5ff]'
                                    }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${selectedCategory === cat._id ? 'bg-white' : 'bg-[#0A3460]'
                                        }`}
                                ></span>
                                <span className="font-medium">{cat.name}</span>
                            </button>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoriesBox;
