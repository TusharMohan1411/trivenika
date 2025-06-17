// app/components/HeroSection.jsx
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="bg-[#FDF1E1] py-12 px-6">
            <div className=" max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Left - Image + Testimonial */}
                    <div className="w-[60%] mt-4">
                        <Image
                            src="/hero.png"
                            alt="Wood pressed oil"
                            height={800}
                            width={800}
                            className="object-contain rounded-lg"
                        />
                    </div>

                    {/* Right - Heading + Benefits */}
                    <div className="flex-1 space-y-4">
                        <h2 className="text-green-800 font-bold text-2xl md:text-3xl">
                            🌿 Pure, Natural <br />
                            <span className="text-green-900">Wood-Pressed</span>
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Wood-pressed oils made just like dadi-nani used to — pure, slow, and full of nutrition. Experience the taste of purity and the power of nature in every drop.
                        </p>
                        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                            <li><strong>100% Natural & Unrefined</strong></li>
                            <li>No Chemicals or Preservatives</li>
                            <li>Lab-Tested (for Quality)</li>
                        </ul>
                        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md transition mt-3">
                            Explore Products
                        </button>
                    </div>
                </div>

                {/* Bottom Icons */}
                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-center text-sm">
                        <p className="font-semibold text-green-800">🚚 Free Shipping</p>
                        <p className="text-gray-500">Free shipping on all your order</p>
                    </div>
                    <div className="text-center text-sm">
                        <p className="font-semibold text-green-800">📞 Customer Support 24/7</p>
                        <p className="text-gray-500">Instant access to support</p>
                    </div>
                    <div className="text-center text-sm">
                        <p className="font-semibold text-green-800">🔒 100% Secure Payment</p>
                        <p className="text-gray-500">We ensure secure money transfers</p>
                    </div>
                    <div className="text-center text-sm">
                        <p className="font-semibold text-green-800">💯 Genuine Quality</p>
                        <p className="text-gray-500">High quality, natural products</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
