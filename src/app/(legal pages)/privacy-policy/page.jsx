// app/privacy-policy/page.jsx
export const revalidate = 60;
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { getPrivacyPolicy } from "@/lib/main/getStaticData";
import ReactMarkdown from "react-markdown";
import styles from "./components/post.module.css";
import rehypeRaw from "rehype-raw";

export const metadata = {
    title: "Privacy Policy | Trivenika",
    description:
        "Read Trivenika's Privacy Policy to understand how we collect, use, and safeguard your personal information while you shop for our wood-pressed oils and natural products.",
    keywords: [
        "Trivenika privacy policy",
        "Trivenika data protection",
        "Trivenika user privacy",
        "Trivenika personal data",
        "Trivenika terms and conditions",
    ],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.trivenika.com/privacy-policy",
    },
    openGraph: {
        title: "Privacy Policy | Trivenika",
        description:
            "Learn how Trivenika handles your personal information and ensures data protection with our transparent Privacy Policy.",
        url: "https://www.trivenika.com/privacy-policy",
        siteName: "Trivenika",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Privacy Policy | Trivenika",
        description:
            "Understand how Trivenika collects, uses, and protects your personal information with our privacy policy.",
    },
};

export default async function Page() {
    const privacyPolicy = await getPrivacyPolicy();

    return (
        <WebsiteLayout>
            {privacyPolicy && (
                <div>
                    {/* Full-width header section */}
                    <div className="w-full bg-[#0D3525] py-12">
                        <div className="max-w-7xl mx-auto px-5 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Privacy Policy
                            </h1>
                            <div className="mt-4 text-blue-100">
                                Last updated:{" "}
                                {new Date(privacyPolicy.lastUpdated).toLocaleDateString(
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

                    {/* Content section */}
                    <div className="max-w-7xl mx-auto px-5 py-6">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className={`${styles.postStyle} p-6 md:px-10`}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {privacyPolicy.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </WebsiteLayout>
    );
}
