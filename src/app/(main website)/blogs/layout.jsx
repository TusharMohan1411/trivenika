import React from "react";

export const metadata = {
    title: "Blogs | Trivenika Organic",
    description:
        "Read Trivenika’s latest blogs on health, wellness, and the benefits of wood-pressed oils. Stay informed about natural living, organic food habits, and lifestyle tips.",
    openGraph: {
        title: "Blogs | Trivenika Organic",
        description:
            "Explore insightful blogs by Trivenika on natural products, wood-pressed oils, and organic living.",
        url: "https://www.trivenika.in/blogs",
        siteName: "Trivenika Organic",
        images: [
            {
                url: "https://www.trivenika.in/logo.png",
                width: 1200,
                height: 630,
                alt: "Trivenika Organic Blogs",
            },
        ],
        type: "website",
    },
    alternates: {
        canonical: "https://www.trivenika.in/blogs",
    },
};

function Layout({ children }) {
    return <div>{children}</div>;
}

export default Layout;
