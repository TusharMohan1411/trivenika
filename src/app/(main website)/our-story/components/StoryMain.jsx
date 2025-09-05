// app/our-story/page.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
// import LatestServices from '@/components/website/LatestServices';

export default function StoryMain() {
    const [language, setLanguage] = useState('english');

    const toggleLanguage = () => {
        setLanguage(language === 'english' ? 'hindi' : 'english');
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="bg-[#FFFDF7] min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full">
                {/* Background image - Replace with your actual image */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#1a5c38]/90">
                    <Image
                        src="/field-bg.jpg"
                        alt="Organic fields"
                        fill
                        priority
                        className="object-cover mix-blend-overlay "
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/50 to-[#1a5c38]/50"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {language === 'english' ? 'Our Story' : 'हमारी कहानी'}
                        </h1>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            {language === 'english'
                                ? 'Inspired by Tradition, Lived by Faith'
                                : 'परंपरा से प्रेरित, विश्वास से सजीव'}
                        </p>
                    </motion.div>

                    {/* Language toggle */}
                    <motion.button
                        onClick={toggleLanguage}
                        className="mt-8 bg-white/20 backdrop-blur-sm border border-white text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        {language === 'english' ? 'हिंदी में देखें' : 'View in English'}
                    </motion.button>
                </div>
            </div>

            {/* Story Content */}
            <div className="">
                {/* Introduction */}
                <motion.section
                    className="text-center max-w-7xl mx-auto px-4 py-16 max-[500px]:pb-6"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-[#2E8B57] mb-6"
                        variants={itemVariants}
                    >
                        {language === 'english' ? 'Trivenika Organic' : 'त्रिवेणिका ऑर्गेनिक'}
                    </motion.h2>

                    <motion.p
                        className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        {language === 'english'
                            ? 'Trivenika is not just a name — it is a spirit. It is the fragrance of the soil where life thrives on hard work, tradition and truth.'
                            : 'त्रिवेणिका सिर्फ एक नाम नहीं है — यह एक भावना है। यह उस मिट्टी की खुशबू है, जहाँ मेहनत, परंपरा और सच्चाई से जीवन फलता-फूलता है।'}
                    </motion.p>

                    <motion.div
                        className="bg-[#2E8B57]/10 p-8 rounded-2xl max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        <p className="text-xl text-[#2E8B57] italic">
                            {language === 'english'
                                ? 'It is a promise — of purity, health and prosperity.'
                                : 'यह एक वचन है — शुद्धता का, स्वास्थ्य का और समृद्धि का।'}
                        </p>
                    </motion.div>
                </motion.section>

                {/* Meaning of Trivenika */}
                <motion.section
                    className="mb-16 max-w-7xl mx-auto px-4 py-16 max-[500px]:pb-0"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
                        <motion.div variants={itemVariants}>
                            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                                <Image
                                    src="/rivers.png"
                                    alt="Triveni Sangam"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2E8B57]/50 to-transparent"></div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold text-[#2E8B57] mb-4 max-[500px]:pl-2">
                                {language === 'english'
                                    ? 'The Meaning of Trivenika'
                                    : 'त्रिवेणिका का अर्थ'}
                            </h3>

                            <p className="text-gray-700 mb-6  max-[500px]:pl-2">
                                {language === 'english'
                                    ? 'We chose the name Trivenika inspired by the "Triveni Sangam" — where three holy rivers meet: Ganga, Yamuna and the invisible Saraswati. In the same way, Trivenika is a confluence of three life-giving values:'
                                    : 'हमने त्रिवेणिका का नाम "त्रिवेणी संगम" से प्रेरित होकर चुना — जहाँ तीन पवित्र नदियाँ मिलती हैं: गंगा, यमुना और अदृश्य सरस्वती। उसी तरह, त्रिवेणिका तीन जीवनदायिनी मूल्यों का संगम है:'}
                            </p>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: language === 'english' ? 'Purity' : 'शुद्धता',
                                        desc: language === 'english'
                                            ? 'Every product is prepared from the purest form of nature, without any adulteration.'
                                            : 'हर उत्पाद प्रकृति के सबसे शुद्ध रूप से, बिना मिलावट के तैयार किया जाता है।'
                                    },
                                    {
                                        title: language === 'english' ? 'Health' : 'स्वास्थ्य',
                                        desc: language === 'english'
                                            ? 'Our wood-pressed oils, A2 Vedik Bilona Ghee and cold-ground spices nourish the body and balance the soul.'
                                            : 'हमारी लकड़ी से कुटी तेल, A2 वैदिक बिलौना घी और शीत पिसे मसाले शरीर को पोषण और आत्मा को संतुलन देते हैं।'
                                    },
                                    {
                                        title: language === 'english' ? 'Prosperity' : 'समृद्धि',
                                        desc: language === 'english'
                                            ? 'This brand is not just a business, but a vehicle for collective progress for farmers, employees and consumers.'
                                            : 'यह ब्रांड सिर्फ व्यापार नहीं, बल्कि किसानों, कर्मचारियों और उपभोक्ताओं की सामूहिक उन्नति का माध्यम है।'
                                    }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#2E8B57]/20 "
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="bg-[#2E8B57]/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-[#2E8B57] font-bold">{idx + 1}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#2E8B57]">{item.title}</h4>
                                            <p className="text-gray-700">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Inspiration */}
                <motion.section
                    className=" bg-[#f8fbf3] p-8 md:p-12 relative overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#2E8B57]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2E8B57]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-7xl mx-auto  py-10">
                        <motion.div
                            className="text-center mb-10"
                            variants={itemVariants}
                        >
                            <h3 className="text-3xl sm:text-4xl font-bold text-[#2E8B57] mb-4">
                                {language === 'english' ? 'Our Inspiration' : 'हमारी प्रेरणा'}
                            </h3>

                            <div className="w-24 h-1 bg-[#2E8B57] mx-auto rounded-full"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            <motion.div variants={itemVariants}>
                                <div className="relative h-80 w-full rounded-2xl overflow-hidden">
                                    {/* Replace with image of parents or family */}
                                    <Image
                                        src="/parents.png"
                                        alt="Parents"
                                        fill
                                        className="object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2E8B57]/50 to-transparent"></div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <p className="text-gray-700 mb-6 italic">
                                    {language === 'english'
                                        ? '"This journey began with a dream and a heartfelt tribute - dedicated to the sacred memory of our late father Shri Ram Gopal Ji and the infinite blessings and inspiration of our mother Smt. Laxmi Devi Ji."'
                                        : '"यह यात्रा एक सपने और एक भावभीनी श्रद्धांजलि के साथ शुरू हुई — हमारे स्वर्गीय पिता श्री राम गोपाल जी की पवित्र स्मृति और हमारी माता श्रीमती लक्ष्मी देवी जी के असीम आशीर्वाद व प्रेरणा को समर्पित।"'}
                                </p>

                                <p className="text-gray-700 mb-6">
                                    {language === 'english'
                                        ? 'His values taught us that true success is that which takes everyone along. We established RGLS Wellness in his name - to take his values to every home.'
                                        : 'उनके संस्कारों ने हमें सिखाया कि सच्ची सफलता वही है, जो सबको साथ लेकर चले। हमने उन्हीं के नाम पर RGLS Wellness की स्थापना की — ताकि उनके मूल्यों को हम हर घर तक पहुँचा सकें।'}
                                </p>

                                <p className="text-gray-700">
                                    {language === 'english'
                                        ? 'The aromatic smells of our mother\'s kitchen and the honest hard work of our father taught us that "purity is a habit, not a business". Trivenika is a living example of that ideal.'
                                        : 'हमारी माँ की रसोई की सौंधी खुशबू और पिता की ईमानदार मेहनत से हमने सीखा कि "शुद्धता एक आदत है, व्यापार नहीं"। त्रिवेणिका उसी आदर्श की एक जीवंत मिसाल है।'}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Products */}
                <motion.section
                    className="mb-8 max-w-7xl mx-auto px-4 py-16 max-[500px]:pb-5"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div
                        className="text-center mb-12"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-bold text-[#2E8B57] mb-4">
                            {language === 'english'
                                ? 'Our Pure Products'
                                : 'हमारे शुद्ध उत्पाद'}
                        </h3>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            {language === 'english'
                                ? 'Under Trivenika, we offer the following pure products'
                                : 'त्रिवेणिका के अंतर्गत हम निम्नलिखित शुद्ध उत्पादों की पेशकश करते हैं:'}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: language === 'english' ? 'Wood Pressed Oils' : 'लकड़ी से कुटे तेल',
                                items: language === 'english'
                                    ? 'Mustard, Coconut, Peanut, Linseed, Almond, Nigella and Sesame oil'
                                    : 'सरसों, नारियल, मूँगफली, अलसी, बादाम, कलौंजी व तिल का तेल',
                                image: '/wood-pressed-oil.png'
                            },
                            {
                                title: language === 'english' ? 'A2 Vedik Bilona Ghee' : 'A2 वैदिक बिलौना घी',
                                items: language === 'english'
                                    ? 'Pure ghee made from cow and buffalo milk prepared through traditional Vedik methods'
                                    : 'पारंपरिक वैदिक विधि से तैयार देसी गाय तथा भैंस के दूध से बना शुद्ध घी',
                                image: '/ghee.png'
                            },
                            {
                                title: language === 'english' ? 'Cold Pressed Spices' : 'शीत पिसे मसाले',
                                items: language === 'english'
                                    ? 'Turmeric, Coriander, Chilli, Cumin etc., rich in nutrition and flavor'
                                    : 'हल्दी, धनिया, मिर्च, जीरा आदि, जो पोषण और स्वाद से भरपूर हैं',
                                image: '/spices.png'
                            }
                        ].map((product, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-white rounded-2xl overflow-hidden border border-[#2E8B57]/20 shadow-sm hover:shadow-md transition-all"
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                            >
                                <div className="relative h-96">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-[#2E8B57] text-xl mb-3">{product.title}</h4>
                                    <p className="text-gray-700">{product.items}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Vision */}
                <motion.section
                    className="text-center max-w-5xl mx-auto mb-22  max-[500px]:px-4"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h3
                        className="text-2xl font-bold text-[#2E8B57] mb-6"
                        variants={itemVariants}
                    >
                        {language === 'english' ? 'Our Vision' : 'हमारी दृष्टि'}
                    </motion.h3>

                    <motion.p
                        className="text-gray-700 mb-8 text-lg"
                        variants={itemVariants}
                    >
                        {language === 'english'
                            ? 'When you adopt Trivenika, you don\'t just choose a brand — you choose a thought. A tradition, connected with modernity. A taste, that reaches the soul. And a promise, that is fulfilled every time.'
                            : 'जब आप त्रिवेणिका को अपनाते हैं, तो आप सिर्फ एक ब्रांड नहीं चुनते — आप एक सोच चुनते हैं। एक परंपरा, जो आधुनिकता से जुड़ी है। एक स्वाद, जो आत्मा तक पहुँचता है। और एक वादा, जो हर बार निभाया जाता है।'}
                    </motion.p>

                    <motion.div
                        className="bg-gradient-to-r from-[#2E8B57] to-[#1a5c38] rounded-2xl p-8 text-white"
                        variants={itemVariants}
                    >
                        <p className="text-xl italic">
                            {language === 'english'
                                ? 'Our dream is that Trivenika is not just a product, but becomes the soul of every kitchen, the identity of every mother\'s faith, and the guardian of every family\'s health.'
                                : 'हमारा सपना है कि त्रिवेणिका सिर्फ एक उत्पाद न रहे, बल्कि हर रसोई की आत्मा, हर माँ के विश्वास की पहचान, और हर परिवार की सेहत का संरक्षक बने।'}
                        </p>
                    </motion.div>
                </motion.section>
            </div>

            {/* <LatestServices /> */}

            {/* Enhanced Footer CTA */}
            <div className="relative bg-gradient-to-r from-[#2E8B57] to-[#1a5c38]  text-white py-16 text-center overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* Leaf pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white/20">
                            <path d="M50,5 C70,15 85,35 85,60 C85,85 65,95 50,95 C35,95 15,85 15,60 C15,35 30,15 50,5 Z" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-16 w-12 h-12 bg-white/15 rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/20 rounded-full animate-bounce"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <motion.h3
                        className="text-3xl md:text-4xl font-bold mb-6 font-serif"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {language === 'english'
                            ? 'Join Our Journey of Purity'
                            : 'शुद्धता की हमारी यात्रा में शामिल हों'}
                    </motion.h3>

                    <motion.p
                        className="text-white/90 mb-8 text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {language === 'english'
                            ? 'Experience the tradition, taste the purity, and become part of our family'
                            : 'परंपरा का अनुभव करें, शुद्धता का स्वाद चखें, और हमारे परिवार का हिस्सा बनें'}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link href={'/products'}>
                            <button
                                className="relative bg-white text-[#2E8B57] px-8 py-4 rounded-full font-bold hover:bg-[#f8f8f8] transition-all duration-300 group overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {language === 'english' ? 'Explore Our Products' : 'हमारे उत्पाद देखें'}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>

                                {/* Animated background */}
                                <div className="absolute inset-0 z-0">
                                    <div className="absolute inset-0 bg-[#2E8B57]/10 group-hover:bg-[#2E8B57]/20 transition-all duration-500"></div>
                                    <div className="absolute -inset-8 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-all duration-700"></div>
                                </div>
                            </button>
                        </Link>
                    </motion.div>

                    {/* Product icons */}
                    <motion.div
                        className="flex justify-center mt-12 gap-6 opacity-80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="bg-white/10 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div className="bg-white/10 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div className="bg-white/10 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}