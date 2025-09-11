// app/about/layout.tsx
import React from "react";

export const metadata = {
    title: "About Us | Trivenika",
    description: "Learn about Trivenika's mission, vision, and values. Discover our journey and commitment to delivering premium wood-pressed oils and natural products.",
    openGraph: {
        title: "About Us | Trivenika",
        description: "Discover Trivenika’s story, mission, and dedication to quality products.",
        url: "https://www.trivenika.com/about-us",
        siteName: "Trivenika",
        images: [
            {
                url: "https://www.trivenika.com/logo.png",
                width: 1200,
                height: 630,
                alt: "Trivenika About Us",
            },
        ],
        type: "website",
    },
    alternates: {
        canonical: "https://www.trivenika.com/about-us",
    },
};

export default function AboutLayout({ children }) {
    return (
        <div className="bg-white text-gray-900">
            {children}
        </div>
    );
}
