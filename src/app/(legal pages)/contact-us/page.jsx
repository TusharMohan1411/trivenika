// app/contact-us/page.jsx
import React from "react";
import Contact from "@/components/website/home/Contact";
import { getHomePageData } from "@/lib/main/getHomePageData";
import WebsiteLayout from "@/components/website/WebsiteLayout";

export const metadata = {
    title: "Contact Us | Trivenika",
    description:
        "Get in touch with Trivenika for queries, support, or feedback. Call, email, or fill out our contact form and we’ll respond promptly.",
    keywords: [
        "Trivenika contact",
        "customer support",
        "contact Trivenika",
        "Trivenika phone number",
        "Trivenika email",
        "Trivenika oils support",
    ],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.trivenika.com/contact-us",
    },
    openGraph: {
        title: "Contact Us | Trivenika",
        description:
            "Have questions? Reach out to Trivenika through phone, email, or our online contact form.",
        url: "https://www.trivenika.com/contact-us",
        siteName: "Trivenika",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Contact Us | Trivenika",
        description:
            "Get in touch with Trivenika. We’re here to help with your queries, orders, or feedback.",
    },
    other: {
        // Local Business Schema
        "application/ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Trivenika",
            url: "https://www.trivenika.com",
            logo: "https://www.trivenika.com/logo.png",
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8569996206",
                contactType: "Customer Support",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
            },
        }),
    },
};

export default async function Page() {
    const { services, categories } = await getHomePageData();

    return (
        <WebsiteLayout services={services} categories={categories}>
            <Contact />
        </WebsiteLayout>
    );
}
