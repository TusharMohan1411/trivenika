// app/refund-policy/page.jsx
export const revalidate = 60;
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { getRefundPolicy } from "@/lib/main/getStaticData";
import ReactMarkdown from "react-markdown";
import styles from "./components/post.module.css";
import rehypeRaw from "rehype-raw";

export const metadata = {
    title: "Refund Policy | Trivenika",
    description:
        "Read Trivenika's Refund Policy to learn about eligibility, timelines, and process for returning or refunding wood-pressed oils and natural products.",
    keywords: [
        "Trivenika refund policy",
        "Trivenika return policy",
        "refunds Trivenika",
        "Trivenika oils refund",
        "Trivenika exchange policy",
    ],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.trivenika.com/refund-policy",
    },
    openGraph: {
        title: "Refund Policy | Trivenika",
        description:
            "Know how Trivenika processes refunds and returns for wood-pressed oils and natural products. Clear and transparent refund policy.",
        url: "https://www.trivenika.com/refund-policy",
        siteName: "Trivenika",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Refund Policy | Trivenika",
        description:
            "Understand Trivenika’s refund and return process for wood-pressed oils and natural products.",
    },
};

export default async function Page() {
    const refundPolicy = await getRefundPolicy();

    return (
        <WebsiteLayout>
            {refundPolicy && (
                <div>
                    {/* Full-width header section */}
                    <div className="w-full bg-[#0D3525] py-12">
                        <div className="max-w-7xl mx-auto px-5 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Refund Policy
                            </h1>
                            <div className="mt-4 text-blue-100">
                                Last updated:{" "}
                                {new Date(refundPolicy.lastUpdated).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="max-w-7xl mx-auto px-5 py-6">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className={`${styles.postStyle} p-6 md:px-10`}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {refundPolicy.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </WebsiteLayout>
    );
}
