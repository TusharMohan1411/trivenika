'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiShoppingCart, FiHome, FiGrid, FiUser, FiMessageSquare } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import BigNav from './BigNav'
import MobileNav from './MobileNav'
import LoginButton from '@/components/auth/LoginButton'
import CartDrawer from '../CartDrawer'

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const items = [
        { name: 'Home', href: '/', icon: <FiHome size={24} /> },
        { name: 'Products', href: '/products', icon: <FiGrid size={24} /> },
        { name: 'Cart', href: '/cart', icon: <FiShoppingCart size={24} /> },
        { name: 'Profile', href: '/user', icon: <FiUser size={24} /> },
        { name: 'Contact', href: '/contact-us', icon: <FiMessageSquare size={24} /> },
    ]

    return (
        <>
            {/* Top Navbar */}
            <nav
                className={
                    `w-full fixed z-50 transition-all duration-300 bg-[#F5EFE6] py-2 ${scrolled ? 'shadow-md' : ''
                    }`
                }
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 xl:px-0">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="p-1 rounded-lg">
                                <Image
                                    alt="logo"
                                    src="/logo.png"
                                    height={300}
                                    width={300}
                                    className="h-8 w-auto"
                                />
                            </div>
                        </Link>
                        <div className="hidden lg:flex">
                            <BigNav />
                        </div>
                        <div className="lg:hidden flex items-center space-x-3">
                            <CartDrawer />
                            <LoginButton className="px-3 py-1.5 rounded-lg hover:bg-gray-100" />
                            <button
                                className="text-gray-700 hover:text-gray-900"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                            >
                                <FiMenu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

            {/* Floating Bottom Nav */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-4xl">
                <div className="relative flex justify-center items-center h-20 bg-white rounded-t-4xl px-5">
                    {items.map((item, idx) => {
                        const isActive =
                            item.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex-1 flex justify-center items-center"
                            >
                                {/* Shared layoutId circle for smooth movement */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-circle"
                                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                        className="absolute left-1/2 bottom-15 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 text-white bg-gradient-to-br from-emerald-500 to-green-700 rounded-full flex items-center justify-center shadow-lg z-20"
                                    >
                                        {item.icon}
                                    </motion.div>
                                )}

                                {/* Icon and Label */}
                                <div
                                    className={`flex flex-col items-center justify-center space-y-1 z-10 ${isActive ? 'text-transparent' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <div className="p-1 rounded-full">{item.icon}</div>
                                    <span
                                        className={`text-xs ${isActive ? 'font-bold text-emerald-700' : ''
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
