import React from "react";

export const metadata = {
    title: "Our Story | Trivenika Organic",
    description:
        "Discover the story behind Trivenika Organic – our journey towards purity, sustainability, and providing the best quality wood-pressed oils. Learn how we are preserving traditional methods for healthier living.",
    alternates: {
        canonical: "https://www.trivenika.in/our-story",
    },
    openGraph: {
        title: "Our Story | Trivenika Organic",
        description:
            "Learn about Trivenika Organic’s mission, vision, and journey of bringing pure, natural, and wood-pressed oils to every home.",
        url: "https://www.trivenika.in/our-story",
        siteName: "Trivenika Organic",
        images: [
            {
                url: "https://www.trivenika.in/logo.png",
                width: 1200,
                height: 630,
                alt: "Trivenika Organic - Our Story",
            },
        ],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Story | Trivenika Organic",
        description:
            "Discover how Trivenika Organic started its journey to provide pure, sustainable, and healthy wood-pressed oils.",
        images: ["https://www.trivenika.in/logo.png"],
    },
};

function Layout({ children }) {
    return <div>{children}</div>;
}

export default Layout;
