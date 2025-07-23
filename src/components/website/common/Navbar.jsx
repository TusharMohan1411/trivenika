// components/NavBar.jsx
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
        { name: 'Home', href: '/', icon: <FiHome size={20} /> },
        { name: 'Products', href: '/products', icon: <FiGrid size={20} /> },
        { name: 'Cart', href: '/cart', icon: <FiShoppingCart size={20} /> },
        { name: 'Profile', href: '/user', icon: <FiUser size={20} /> },
        { name: 'Contact', href: '/contact-us', icon: <FiMessageSquare size={20} /> },
    ]

    return (
        <>
            {/* Top Navbar - unchanged */}
            <nav className={`w-full fixed z-50 transition-all duration-300 bg-[#F5EFE6] py-2 ${scrolled ? 'shadow-md' : ''
                }`}>
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

            {/* Redesigned Floating Bottom Nav */}
            <div className="lg:hidden rounded-t-4xl fixed z-50 bottom-0 left-0 w-full  border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                <div className="relative flex justify-center items-center h-20 gap-3 rounded-t-4xl bg-white">
                    {items.map(item => {
                        const isActive =
                            item.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative w-14 flex flex-col items-center justify-center"
                            >
                                {/* Floating Active Indicator */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ scale: 0, y: 30 }}
                                            animate={{ scale: 1, y: 0 }}
                                            exit={{ scale: 0, y: 30 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 20,
                                            }}
                                            className="absolute -top-1.5 w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-700 rounded-full  flex items-center justify-center shadow-lg z-20"
                                        >
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Icon and Text */}
                                <div className="relative z-[100] flex flex-col items-center justify-center">
                                    <div className={`p-1 rounded-full transition-colors ${isActive ? 'text-white mb-2' : 'text-gray-600 hover:text-gray-900'
                                        }`}>
                                        {item.icon}
                                    </div>
                                    <motion.span
                                        className={`text-xs mt-0.5 ${isActive
                                            ? 'font-bold text-emerald-700'
                                            : 'text-gray-600'
                                            }`}
                                        initial={{ opacity: isActive ? 0 : 1 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: isActive ? 0.2 : 0 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                </div>
                            </Link>
                        )
                    })}

                    {/* Floating Background Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 opacity-80 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                    />
                </div>
            </div>
        </>
    )
}