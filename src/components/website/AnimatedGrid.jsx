// app/components/AnimatedGrid.jsx
'use client';

import { motion } from 'framer-motion';
import ProductCard2 from './ProductCard2';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.15, when: 'beforeChildren' }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

export default function AnimatedGrid({ services }) {
    return (
        <motion.div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            {services.map((item, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                    <ProductCard2 product={item} />
                </motion.div>
            ))}
        </motion.div>
    );
}
