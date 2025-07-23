'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiShoppingCart, FiHome, FiGrid, FiUser, FiMessageSquare } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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
        { name: 'Cart', href: '/checkout', icon: <FiShoppingCart size={24} /> },
        { name: 'Profile', href: '/user', icon: <FiUser size={24} /> },
        { name: 'Contact', href: '/contact-us', icon: <FiMessageSquare size={24} /> },
    ]

    // animation variants for icons
    const iconVariants = {
        active: { y: -22, color: '#ffffff', transition: { duration: 0.5 } },
        inactive: { y: 0, color: '#4B5563', transition: { duration: 0.5 } },
    }

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
                                    height={500}
                                    width={500}
                                    className="h-12 w-auto"
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
                    {items.map(item => {
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
                                {/* Shared circle layout animation */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            key="circle"
                                            layoutId="active-circle"
                                            transition={{ type: 'spring', stiffness: 80, damping: 15, duration: 0.8 }}
                                            className="absolute left-1/2 bottom-15 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-700 rounded-full shadow-lg z-20"
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Icon and Label */}
                                <div className="flex flex-col items-center justify-center space-y-1 z-20">
                                    <motion.div
                                        layoutId={`icon-${item.name}`}
                                        variants={iconVariants}
                                        animate={isActive ? 'active' : 'inactive'}
                                        className="p-1 rounded-full"
                                    >
                                        {item.icon}
                                    </motion.div>
                                    <motion.span
                                        layoutId={`label-${item.name}`}
                                        initial={false}
                                        animate={{ color: isActive ? '#047857' : '#4B5563', transition: { duration: 0.5 } }}
                                        className="text-xs font-medium"
                                    >
                                        {item.name}
                                    </motion.span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
