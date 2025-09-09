// app/refund-policy/page.jsx
export const revalidate = 30;
import WebsiteLayout from "@/components/website/WebsiteLayout";
import ReactMarkdown from 'react-markdown';
import styles from './components/post.module.css';
import rehypeRaw from 'rehype-raw';
import { getShippingPolicy } from "@/lib/main/getStaticData";

export default async function page() {
    const shippingPolicy = await getShippingPolicy();

    return (
        <WebsiteLayout>
            {shippingPolicy &&
                <div>
                    {/* Full-width header section */}
                    <div className="w-full bg-[#0D3525] py-12">
                        <div className="max-w-7xl mx-auto px-5 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Shipping Policy</h1>
                            <div className="mt-4 text-blue-100">
                                Last updated: {new Date(shippingPolicy.lastUpdated).toLocaleDateString('en-US', {
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
                                    {shippingPolicy.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </WebsiteLayout>
    )
}

