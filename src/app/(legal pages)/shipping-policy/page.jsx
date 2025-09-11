// app/shipping-policy/page.jsx
export const revalidate = 30;
import WebsiteLayout from "@/components/website/WebsiteLayout";
import ReactMarkdown from "react-markdown";
import styles from "./components/post.module.css";
import rehypeRaw from "rehype-raw";
import { getShippingPolicy } from "@/lib/main/getStaticData";

export const metadata = {
    title: "Shipping Policy | Trivenika",
    description:
        "Learn about Trivenika’s Shipping Policy including delivery timelines, shipping charges, and order processing details for wood-pressed oils and natural products.",
    keywords: [
        "Trivenika shipping policy",
        "Trivenika delivery policy",
        "Trivenika oils shipping",
        "Trivenika delivery timeline",
        "shipping charges Trivenika",
    ],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.trivenika.com/shipping-policy",
    },
    openGraph: {
        title: "Shipping Policy | Trivenika",
        description:
            "Check Trivenika’s Shipping Policy to know about order processing, delivery timelines, and charges.",
        url: "https://www.trivenika.com/shipping-policy",
        siteName: "Trivenika",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Shipping Policy | Trivenika",
        description:
            "Understand how Trivenika manages shipping, delivery timelines, and charges for wood-pressed oils and products.",
    },
};

export default async function Page() {
    const shippingPolicy = await getShippingPolicy();

    return (
        <WebsiteLayout>
            {shippingPolicy && (
                <div>
                    <div className="w-full bg-[#0D3525] py-12">
                        <div className="max-w-7xl mx-auto px-5 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Shipping Policy
                            </h1>
                            <div className="mt-4 text-blue-100">
                                Last updated:{" "}
                                {new Date(shippingPolicy.lastUpdated).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-5 py-6">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className={`${styles.postStyle} p-6 md:px-10`}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {shippingPolicy.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </WebsiteLayout>
    );
}
