// app/privacy-policy/page.jsx
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { getHomePageData } from "@/lib/main/getHomePageData";
import { getPrivacyPolicy } from "@/lib/main/getStaticData";
import ReactMarkdown from 'react-markdown';
import styles from './components/post.module.css';
import rehypeRaw from 'rehype-raw';

export default async function page() {
    const { services, categories } = await getHomePageData();
    const privacyPolicy = await getPrivacyPolicy();

    return (
        <WebsiteLayout services={services} categories={categories}>
            {/* Full-width header section */}
            {privacyPolicy &&
                <div>
                    <div className="w-full bg-[#002244] py-12">
                        <div className="max-w-7xl mx-auto px-5 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
                            <div className="mt-4 text-blue-100">
                                Last updated: {new Date(privacyPolicy.lastUpdated).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
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
            }
        </WebsiteLayout>
    )
}