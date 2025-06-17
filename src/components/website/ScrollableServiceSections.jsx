'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import styles from './post.module.css';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import remarkGfm from 'remark-gfm'; // Import the plugin


const serviceBigDescription = [
    {
        name: 'Design',
        title: 'What is GST Registration?',
        content: 'GST registration is the process by which a business obtains a unique identification number, known as a GSTIN (Goods and Services Tax Identification Number), making it liable to pay Goods and Services Tax (GST) in India. According to the Central Goods and Services Tax Act of 2017, businesses with an annual turnover exceeding ₹40 lakh (or ₹20 lakh in specific special category states) are required to register as taxable entities. The GSTIN, a 15-digit number, uniquely identifies each taxpayer under the GST framework and allows authorities to monitor transactions and related data effectively.GST, or Goods and Services Tax, is a destination- based, multi - stage, indirect tax that replaces various other taxes, including VAT and excise duties.Under the GST Act of 2017, businesses that previously paid service tax, excise duty, or VAT must now register for GST.Additionally, GST registration is mandatory for eCommerce sellers regardless of turnover. GST apply online through the official portal allows businesses and individuals to complete their GST registration without visiting government offices.This online process ensures a smooth and hassle - free experience, making it convenient for taxpayers to comply with GST regulations efficiently..After submitting an application, the portal generates an ARN(Application Reference Number) status immediately, allowing applicants to track their registration progress.',
    },
    {
        name: 'Integration',
        title: 'Secure Payment Systems',
        content: 'GST registration is the process by which a business obtains a unique identification number, known as a GSTIN (Goods and Services Tax Identification Number), making it liable to pay Goods and Services Tax (GST) in India. According to the Central Goods and Services Tax Act of 2017, businesses with an annual turnover exceeding ₹40 lakh (or ₹20 lakh in specific special category states) are required to register as taxable entities. The GSTIN, a 15-digit number, uniquely identifies each taxpayer under the GST framework and allows authorities to monitor transactions and related data effectively.GST, or Goods and Services Tax, is a destination- based, multi - stage, indirect tax that replaces various other taxes, including VAT and excise duties.Under the GST Act of 2017, businesses that previously paid service tax, excise duty, or VAT must now register for GST.Additionally, GST registration is mandatory for eCommerce sellers regardless of turnover. GST apply online through the official portal allows businesses and individuals to complete their GST registration without visiting government offices.This online process ensures a smooth and hassle - free experience, making it convenient for taxpayers to comply with GST regulations efficiently..After submitting an application, the portal generates an ARN(Application Reference Number) status immediately, allowing applicants to track their registration progress.',
    },
    {
        name: 'CMS',
        title: 'Product & Order Management',
        content: 'GST registration is the process by which a business obtains a unique identification number, known as a GSTIN (Goods and Services Tax Identification Number), making it liable to pay Goods and Services Tax (GST) in India. According to the Central Goods and Services Tax Act of 2017, businesses with an annual turnover exceeding ₹40 lakh (or ₹20 lakh in specific special category states) are required to register as taxable entities. The GSTIN, a 15-digit number, uniquely identifies each taxpayer under the GST framework and allows authorities to monitor transactions and related data effectively.GST, or Goods and Services Tax, is a destination- based, multi - stage, indirect tax that replaces various other taxes, including VAT and excise duties.Under the GST Act of 2017, businesses that previously paid service tax, excise duty, or VAT must now register for GST.Additionally, GST registration is mandatory for eCommerce sellers regardless of turnover. GST apply online through the official portal allows businesses and individuals to complete their GST registration without visiting government offices.This online process ensures a smooth and hassle - free experience, making it convenient for taxpayers to comply with GST regulations efficiently..After submitting an application, the portal generates an ARN(Application Reference Number) status immediately, allowing applicants to track their registration progress.',
    },
    {
        name: 'Analytics',
        title: 'Data-Driven Insights',
        content: 'GST registration is the process by which a business obtains a unique identification number, known as a GSTIN (Goods and Services Tax Identification Number), making it liable to pay Goods and Services Tax (GST) in India. According to the Central Goods and Services Tax Act of 2017, businesses with an annual turnover exceeding ₹40 lakh (or ₹20 lakh in specific special category states) are required to register as taxable entities. The GSTIN, a 15-digit number, uniquely identifies each taxpayer under the GST framework and allows authorities to monitor transactions and related data effectively.GST, or Goods and Services Tax, is a destination- based, multi - stage, indirect tax that replaces various other taxes, including VAT and excise duties.Under the GST Act of 2017, businesses that previously paid service tax, excise duty, or VAT must now register for GST.Additionally, GST registration is mandatory for eCommerce sellers regardless of turnover. GST apply online through the official portal allows businesses and individuals to complete their GST registration without visiting government offices.This online process ensures a smooth and hassle - free experience, making it convenient for taxpayers to comply with GST regulations efficiently..After submitting an application, the portal generates an ARN(Application Reference Number) status immediately, allowing applicants to track their registration progress.',
    },
    {
        name: 'Security',
        title: 'Enterprise-Grade Protection',
        content: 'GST registration is the process by which a business obtains a unique identification number, known as a GSTIN (Goods and Services Tax Identification Number), making it liable to pay Goods and Services Tax (GST) in India. According to the Central Goods and Services Tax Act of 2017, businesses with an annual turnover exceeding ₹40 lakh (or ₹20 lakh in specific special category states) are required to register as taxable entities. The GSTIN, a 15-digit number, uniquely identifies each taxpayer under the GST framework and allows authorities to monitor transactions and related data effectively.GST, or Goods and Services Tax, is a destination- based, multi - stage, indirect tax that replaces various other taxes, including VAT and excise duties.Under the GST Act of 2017, businesses that previously paid service tax, excise duty, or VAT must now register for GST.Additionally, GST registration is mandatory for eCommerce sellers regardless of turnover. GST apply online through the official portal allows businesses and individuals to complete their GST registration without visiting government offices.This online process ensures a smooth and hassle - free experience, making it convenient for taxpayers to comply with GST regulations efficiently..After submitting an application, the portal generates an ARN(Application Reference Number) status immediately, allowing applicants to track their registration progress.',
    },
    {
        name: 'Support',
        title: '24/7 Technical Assistance',
        content: 'GST registration is the process by which a business obtains a unique identification number, known as a GSTIN (Goods and Services Tax Identification Number), making it liable to pay Goods and Services Tax (GST) in India. According to the Central Goods and Services Tax Act of 2017, businesses with an annual turnover exceeding ₹40 lakh (or ₹20 lakh in specific special category states) are required to register as taxable entities. The GSTIN, a 15-digit number, uniquely identifies each taxpayer under the GST framework and allows authorities to monitor transactions and related data effectively.GST, or Goods and Services Tax, is a destination- based, multi - stage, indirect tax that replaces various other taxes, including VAT and excise duties.Under the GST Act of 2017, businesses that previously paid service tax, excise duty, or VAT must now register for GST.Additionally, GST registration is mandatory for eCommerce sellers regardless of turnover. GST apply online through the official portal allows businesses and individuals to complete their GST registration without visiting government offices.This online process ensures a smooth and hassle - free experience, making it convenient for taxpayers to comply with GST regulations efficiently..After submitting an application, the portal generates an ARN(Application Reference Number) status immediately, allowing applicants to track their registration progress.',
    },
];

export default function ScrollableServiceSections({ serviceBigDescription }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef([]);
    const [progress, setProgress] = useState(0);
    const isScrolling = useRef(false);

    const handleIntersection = useCallback((entries) => {
        if (isScrolling.current) return;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const idx = Number(entry.target.getAttribute('data-index'));
                setActiveIndex(idx);
            }
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Increased threshold for more reliable detection
        });

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, [handleIntersection]);

    useEffect(() => {
        const newProgress = (activeIndex / (serviceBigDescription.length - 1)) * 100;
        setProgress(newProgress);
    }, [activeIndex]);

    const scrollToSection = useCallback((idx) => {
        isScrolling.current = true;
        setActiveIndex(idx); // Immediately update active index

        sectionRefs.current[idx]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Reset the flag after scroll completes
        setTimeout(() => {
            isScrolling.current = false;
        }, 1000);
    }, []);

    // Initialize refs array
    useEffect(() => {
        sectionRefs.current = serviceBigDescription.map((_, i) => sectionRefs.current[i] ?? null);
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-16 ">
            {/* Prevent sidebar stretch by aligning items to start */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="max-[640px]:hidden lg:w-1/4 lg:sticky lg:top-6 lg:h-fit lg:max-h-screen">
                    <div className="rounded-2xl bg-gradient-to-b from-white to-[#f0f7ff] shadow-xl border border-[#00336620] p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-[#003366] mb-2">Services</h3>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#003366] rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        <LayoutGroup>
                            <ul className="space-y-3 relative">
                                {serviceBigDescription.map(({ name }, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => scrollToSection(index)}
                                            className={`w-full text-left py-4 px-4 rounded-xl transition-all duration-300 flex items-start ${activeIndex === index
                                                ? 'bg-[#003366] text-white shadow-lg'
                                                : 'bg-white text-[#003366] hover:bg-[#e6f0ff] border border-[#00336620]'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${activeIndex === index
                                                        ? 'bg-white text-[#003366] font-bold'
                                                        : 'bg-[#003366] text-white'
                                                        }`}
                                                >
                                                    {index + 1}
                                                </div>
                                                <span className="font-medium">{name}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </LayoutGroup>

                        <div className="mt-8 bg-gradient-to-r from-[#003366] to-[#0055aa] rounded-xl p-4 text-white">
                            <div className="font-bold text-sm mb-1">Need Assistance?</div>
                            <div className="text-xs opacity-90 mb-2">Our experts are ready to help</div>
                            <Link href={'/talk-to-lawyer'}>
                                <button className="bg-white text-[#003366] text-sm font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all">
                                    Contact Support
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-3/4 space-y-12">
                    {serviceBigDescription.map(({ title, content }, index) => (
                        <section
                            key={index}
                            data-index={index}
                            ref={(el) => (sectionRefs.current[index] = el)}
                            className={`scroll-mt-24 p-8 rounded-2xl transition-all duration-300 ${activeIndex === index
                                ? 'bg-gradient-to-br from-white to-[#f0f7ff] shadow-xl border border-[#00336620]'
                                : 'bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-[#003366] w-12 h-12 rounded-lg flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-[#003366]">{title}</h2>
                            </div>
                            <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <div className={`${styles.postStyle}`}>
                                    <ReactMarkdown
                                        rehypePlugins={[rehypeRaw]}
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
