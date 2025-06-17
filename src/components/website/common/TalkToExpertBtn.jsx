import Link from 'next/link'
import React from 'react'

export const TalkToExpertBtn = () => {
    return (
        <Link href={'/talk-to-lawyer'}>
            <button className="bg-primary px-6 py-2 rounded text-white hover:opacity-95">
                Talk to Experts
            </button>
        </Link>
    )
}
