'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi'
import LoginButton from '@/components/auth/LoginButton'
import { NAVBAR_LINKS } from '@/lib/constants/sidebarLinks'

export default function BigNav() {
    const pathname = usePathname()

    return (
        <div className="hidden xl:flex items-center space-x-4">
            <div className="flex space-x-3">
                {NAVBAR_LINKS.map((link, idx) => {
                    const isActive =
                        link.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(link.href)

                    return (
                        <Link
                            key={idx}
                            href={link.href}
                            className={`flex flex-col items-center px-4 py-3 text-sm font-medium relative group transition-colors duration-200
                ${isActive
                                    ? 'text-black'
                                    : 'text-gray-700'}
              `}
                        >
                            <span>{link.label}</span>

                            {/* Animated Underline */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent">
                                <div className={`
                  h-full transition-all duration-300 ease-out origin-left
                  ${isActive
                                        ? 'w-full bg-primary'
                                        : 'w-0 group-hover:w-full bg-primary'
                                    }
                `} />
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className="ml-4 flex items-center space-x-3">
                <LoginButton className="px-4 py-2 rounded-lg hover:bg-gray-100" />
            </div>
        </div>
    )
}