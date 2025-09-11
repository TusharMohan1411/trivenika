// app/track-order/layout.jsx
import React from "react";

export const metadata = {
    title: "Track Your Order | Trivenika",
    description:
        "Easily track your Trivenika order status online. Enter your order ID or registered email to get real-time updates on shipping and delivery.",
    keywords: [
        "Trivenika order tracking",
        "track my order",
        "delivery status",
        "shipping status",
        "Trivenika oils",
        "online order tracking",
    ],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.trivenika.com/track-order",
    },
    openGraph: {
        title: "Track Your Order | Trivenika",
        description:
            "Check your Trivenika order status anytime. Enter your order details to see shipping and delivery updates.",
        url: "https://www.trivenika.com/track-order",
        siteName: "Trivenika",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Track Your Order | Trivenika",
        description:
            "Track your Trivenika order in real-time and stay updated about shipping and delivery.",
    },
    other: {
        "application/ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ParcelDelivery",
            provider: {
                "@type": "Organization",
                name: "Trivenika",
                url: "https://www.trivenika.com",
            },
            trackingUrl: "https://www.trivenika.com/track-order",
        }),
    },
};

function Layout({ children }) {
    return <div>{children}</div>;
}

export default Layout;
