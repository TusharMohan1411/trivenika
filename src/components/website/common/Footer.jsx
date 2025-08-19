"use client"
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const quickLinks = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Track Order', href: '/track-order' },
        { label: 'Our Story', href: '/our-story' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Blogs', href: '/blogs' },
    ];

    const policyLinks = [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms&conditions' },
        { label: 'Refund Policy', href: '/refund-policy' },
    ];

    const paymentImages = [
        { src: '/footer/ApplePay.png', alt: 'Apple Pay' },
        { src: '/footer/Discover.png', alt: 'Discover' },
        { src: '/footer/Mastercard.png', alt: 'Mastercard' },
        { src: '/footer/Visa.png', alt: 'Visa' },
        { src: '/footer/Cart.png', alt: 'cart' },
    ]

    const socialLinks = [
        { name: 'Facebook', icon: 'M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z' },
        // { name: 'Twitter', icon: 'M22 5.924a8.008 8.008 0 0 1-2.357.646 4.11 4.11 0 0 0 1.804-2.27 8.169 8.169 0 0 1-2.606.996A4.096 4.096 0 0 0 15.847 4c-2.266 0-4.103 1.837-4.103 4.103 0 .322.036.635.106.935-3.41-.17-6.433-1.804-8.457-4.287a4.101 4.101 0 0 0-.554 2.062 4.1 4.1 0 0 0 1.825 3.415 4.09 4.09 0 0 1-1.859-.513v.052a4.104 4.104 0 0 0 3.292 4.023 4.099 4.099 0 0 1-1.853.07 4.11 4.11 0 0 0 3.833 2.85A8.261 8.261 0 0 1 2 18.282a11.587 11.587 0 0 0 6.29 1.84c7.547 0 11.673-6.252 11.673-11.673 0-.178-.004-.355-.012-.531A8.33 8.33 0 0 0 22 5.924z' },
        { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
    ];

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#101010] text-white pt-16 pb-8 px-4">

            {/* Animated Nature Background */}
            <div className="absolute inset-0 z-0">
                {/* Subtle animated trees */}
                <div className="absolute left-[5%] bottom-0 w-20 h-40 opacity-10 animate-float-1">
                    <TreeSVG />
                </div>
                <div className="absolute left-[15%] bottom-0 w-24 h-48 opacity-15 animate-float-2">
                    <TreeSVG />
                </div>
                <div className="absolute right-[10%] bottom-0 w-16 h-36 opacity-10 animate-float-3">
                    <TreeSVG />
                </div>
                <div className="absolute right-[20%] bottom-0 w-20 h-44 opacity-15 animate-float-4">
                    <TreeSVG />
                </div>

                {/* Animated grass */}
                <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20">
                    <GrassSVG />
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand & Contact */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <div className="relative w-40 h-16">
                                <Image
                                    src="/logo.png"
                                    alt="Legal Services Logo"
                                    layout="fill"
                                    objectFit="contain"
                                    className="filter brightness-0 invert"
                                />
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-300 mb-3 text-sm">
                                Blending nature’s best with traditional wisdom, Trivenika Organic offers 100% pure and chemical-free oils and ghee for a healthier you.
                            </p>

                            <div className="mt-8">
                                <h4 className="font-semibold mb-4">Follow Us</h4>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="bg-primary hover:bg-primary p-3 rounded-full transition-all"
                                            aria-label={social.name}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d={social.icon} />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-primary inline-block">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href}>
                                        <p className="flex items-center gap-3 group text-gray-300 hover:text-white transition-colors">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            <span className="group-hover:underline group-hover:underline-offset-4">{link.label}</span>
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* legal */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-primary inline-block">Policies</h3>
                        <ul className="space-y-3">
                            {policyLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href}>
                                        <p className="flex items-center gap-3 group text-gray-300 hover:text-white transition-colors">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            <span className="group-hover:underline group-hover:underline-offset-4">{link.label}</span>
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-primary p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold">Our Office</h4>
                                <p className="text-gray-300 text-sm">RGLS Wellness</p>
                                <p className="text-gray-300 text-sm">Kirdhan Rd, Dhingsara, Haryana, India</p>
                                <p className="text-gray-300 text-sm">GSTIN - 06IJAPD2318P1Z5</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-primary p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold">Email Us</h4>
                                <p className="text-gray-300 text-sm">contact@trivenika.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-primary p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold">Call Us</h4>
                                <p className="text-gray-300 text-sm">+91 8569996206</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-primary pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-300 text-sm">
                        © {new Date().getFullYear()} Trivenika. All rights reserved.
                    </div>
                    <div className='flex gap-4 items-center'>
                        {paymentImages.map((itm, idx) => (
                            <Image
                                key={idx}
                                src={itm.src}
                                alt={itm.alt}
                                height={100}
                                width={150}
                                className='h-10 w-auto'
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(1deg); }
                }
                .animate-float-1 { animation: float 8s ease-in-out infinite; }
                .animate-float-2 { animation: float 10s ease-in-out infinite; }
                .animate-float-3 { animation: float 7s ease-in-out infinite 0.5s; }
                .animate-float-4 { animation: float 9s ease-in-out infinite 0.3s; }
            `}</style>
        </footer>
    );
}

// Tree SVG Component
const TreeSVG = () => (
    <svg viewBox="0 0 100 150" className="w-full h-full">
        {/* Trunk */}
        <path
            d="M45 70 L45 140 L55 140 L55 70 Z"
            fill="rgba(210, 180, 140, 0.3)"
        />
        {/* Leaves */}
        <path
            d="M15 70 Q50 5 85 70 Q75 50 65 60 Q55 40 45 60 Q35 50 25 60 Q15 50 15 70 Z"
            fill="rgba(144, 238, 144, 0.2)"
            className="animate-pulse"
        />
        <ellipse
            cx="50" cy="50"
            rx="35" ry="25"
            fill="rgba(152, 251, 152, 0.15)"
        />
    </svg>
);

// Grass SVG Component
const GrassSVG = () => (
    <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
            <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(124, 252, 0, 0.3)" />
                <stop offset="100%" stopColor="rgba(34, 139, 34, 0.2)" />
            </linearGradient>
        </defs>

        <path
            d="M0,100 
                C50,80 100,90 150,70 
                C200,50 250,60 300,40 
                C350,20 400,30 450,10 
                C500,30 550,20 600,40 
                C650,60 700,50 750,70 
                C800,90 850,80 900,100 
                L0,100 Z"
            fill="url(#grassGradient)"
            className="animate-pulse"
        />
    </svg>
);