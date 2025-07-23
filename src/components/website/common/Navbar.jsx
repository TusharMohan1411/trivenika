'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import { BiHome, BiCategory, BiUser } from 'react-icons/bi'
import { FiShoppingCart } from 'react-icons/fi'
import BigNav from './BigNav'
import MobileNav from './MobileNav'
import LoginButton from '@/components/auth/LoginButton'
import CartDrawer from '../CartDrawer'

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Top Navbar */}
            <nav className={` w-full fixed z-50 transition-all duration-300 bg-[#F5EFE6] py-2 ${scrolled ? 'shadow-md' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 xl:px-0">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
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

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex">
                            <BigNav />
                        </div>

                        {/* Mobile Icons */}
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

            {/* Mobile Side Menu */}
            <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed z-50 bottom-0 left-0 w-full bg-white border-t shadow-inner">
                <div className="flex justify-around items-center h-14">
                    <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                        <BiHome size={24} />
                        <span className="text-xs">Home</span>
                    </Link>
                    <Link href="/products" className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                        <BiCategory size={24} />
                        <span className="text-xs">Products</span>
                    </Link>
                    <button
                        onClick={() => {/* optional: open cart drawer */ }}
                        className="flex flex-col items-center text-gray-600 hover:text-gray-900"
                    >
                        <FiShoppingCart size={24} />
                        <span className="text-xs">Cart</span>
                    </button>
                    <Link href="/profile" className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                        <BiUser size={24} />
                        <span className="text-xs">Profile</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
