// app/terms&conditions/page.jsx
export const revalidate = 60;

import WebsiteLayout from "@/components/website/WebsiteLayout";
import { getTermsConditions } from "@/lib/main/getStaticData";
import ReactMarkdown from "react-markdown";
import styles from "./components/post.module.css";
import rehypeRaw from "rehype-raw";

export const metadata = {
    title: "Terms and Conditions | Trivenika",
    description:
        "Read Trivenika’s Terms and Conditions to understand the rules, policies, and usage guidelines for wood-pressed oils and natural products.",
    keywords: [
        "Trivenika terms and conditions",
        "Trivenika policies",
        "Trivenika usage rules",
        "terms for Trivenika products",
    ],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.trivenika.com/terms&conditions",
    },
    openGraph: {
        title: "Terms and Conditions | Trivenika",
        description:
            "Learn about Trivenika’s rules, policies, and guidelines for using wood-pressed oils and natural products.",
        url: "https://www.trivenika.com/terms&conditions",
        siteName: "Trivenika",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Terms and Conditions | Trivenika",
        description:
            "Trivenika’s terms and policies for products and website usage. Clear and transparent guidelines.",
    },
};

export default async function Page() {
    const termsConditions = await getTermsConditions();

    return (
        <WebsiteLayout>
            {termsConditions && (
                <div>
                    <div className="w-full bg-[#0D3525] py-12">
                        <div className="max-w-7xl mx-auto px-5 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Terms and Conditions
                            </h1>
                            <div className="mt-4 text-blue-100">
                                Last updated:{" "}
                                {new Date(termsConditions.lastUpdated).toLocaleDateString(
                                    "en-US",
                                    { year: "numeric", month: "long", day: "numeric" }
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-5 py-6">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className={`${styles.postStyle} p-6 md:px-10`}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {termsConditions.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </WebsiteLayout>
    );
}
