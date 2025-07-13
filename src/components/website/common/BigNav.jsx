'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi'
import LoginButton from '@/components/auth/LoginButton'
import { NAVBAR_LINKS } from '@/lib/constants/sidebarLinks'
import CartIcon from '../CartIcon'
import CartDrawer from '../CartDrawer'

export default function BigNav() {
    const pathname = usePathname()
    const [isHoveringOffers, setIsHoveringOffers] = useState(false)

    return (
        <div className="hidden lg:flex items-center space-x-4">
            <div className="flex space-x-1 items-center justify-center">
                {NAVBAR_LINKS.map((link, idx) => {
                    const isActive =
                        link.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(link.href)

                    // Special styling for Offers link
                    const isOffers = link.label === "Offers";

                    return (
                        <Link
                            key={idx}
                            href={link.href}
                            className={`flex flex-col items-center px-4 py-3 text-sm font-medium relative group transition-all duration-300 ease-in-out
                                ${isActive && !isOffers
                                    ? 'text-black'
                                    : 'text-gray-700'}
                                ${isOffers
                                    ? 'bg-gradient-to-r from-green-800 to-emerald-500 text-white rounded-2xl mx-2 px-5 py-1 h-9 flex items-center justify-center transform hover:scale-105'
                                    : ''}
                            `}
                            onMouseEnter={() => isOffers && setIsHoveringOffers(true)}
                            onMouseLeave={() => isOffers && setIsHoveringOffers(false)}
                        >
                            <div className="flex items-center gap-1">
                                <span className="relative">
                                    {link.label}

                                    {/* Special badge for Offers */}
                                    {isOffers && (
                                        <>
                                            <span className="absolute -top-2 -right-5 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-5 bg-yellow-400"></span>
                                            </span>
                                            {/* <span className="ml-1">🔥</span> */}
                                        </>
                                    )}
                                </span>

                                {/* Animated arrow for Offers */}
                                {/* {isOffers && (
                                    <FiArrowRight
                                        className={`transition-transform duration-300 ${isHoveringOffers ? 'translate-x-1' : ''}`}
                                        size={16}
                                    />
                                )} */}
                            </div>

                            {/* Animated Underline (hidden for Offers) */}
                            {!isOffers && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent">
                                    <div className={`
                                        h-full transition-all duration-300 ease-out origin-left
                                        ${isActive
                                            ? 'w-full bg-primary'
                                            : 'w-0 group-hover:w-full bg-primary'
                                        }
                                    `} />
                                </div>
                            )}
                        </Link>
                    )
                })}
            </div>
            <div className="ml-4 flex items-center space-x-3">
                <LoginButton className="px-4 py-2 rounded-lg hover:bg-gray-100" />
                <CartDrawer />
            </div>
        </div>
    )
}