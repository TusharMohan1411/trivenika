import React from "react";

export const metadata = {
    title: "Our Products | Trivenika Organic",
    description:
        "Discover Trivenika Organic’s range of premium wood-pressed oils – Black Mustard Oil, Yellow Mustard Oil, Coconut Oil, Groundnut Oil, Sesame Oil, Almond Oil, and Flaxseed Oil. 100% natural, chemical-free, and made with the traditional wood press method.",
    openGraph: {
        title: "Our Products | Trivenika Organic",
        description:
            "Explore Trivenika’s pure and natural wood-pressed oils. Healthy, chemical-free, and made using the traditional method for maximum nutrition.",
        url: "https://www.trivenika.in/products",
        siteName: "Trivenika Organic",
        images: [
            {
                url: "https://www.trivenika.in/logo.png",
                width: 1200,
                height: 630,
                alt: "Trivenika Organic Wood-Pressed Oils",
            },
        ],
        type: "website",
    },
    alternates: {
        canonical: "https://www.trivenika.in/products",
    },
};

function Layout({ children }) {
    return <div>{children}</div>;
}

export default Layout;
