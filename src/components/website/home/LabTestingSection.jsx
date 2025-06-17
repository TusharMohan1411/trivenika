// app/components/LabTestingSection.jsx
import Image from "next/image";

export default function LabTestingSection() {
    return (
        <section className="bg-[#FFFDF7] px-4 md:px-16 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left Text Section */}
                <div>
                    <span className="inline-block bg-green-100 text-green-700 font-semibold text-sm px-4 py-1 rounded-full mb-4">
                        Purify You Can Trust
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Lab Testing & Quality Assurance
                    </h2>
                    <p className="text-gray-700 mb-4">
                        We believe in complete transparency and quality. Every batch of our
                        wood-pressed oils is tested in certified laboratories to ensure it
                        is:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                        <li>100% pure and unrefined</li>
                        <li>Free from harmful chemicals & preservatives</li>
                        <li>Safe, nutritious, and rich in natural antioxidants</li>
                    </ul>
                    <p className="text-gray-700 mb-6">
                        From sourcing premium seeds to cold extraction in wooden ghanis, we
                        maintain strict hygiene and testing standards — so you get only the
                        best, just as nature intended.
                    </p>
                    <div className="space-y-3">
                        {[
                            "FSSAI Certified",
                            "No Added Preservatives",
                            "Free from Adulteration",
                        ].map((text, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm"
                            >
                                <span className="text-green-600 text-xl">🧪</span>
                                <span className="text-gray-800">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="w-full h-72 mb-4 flex items-center justify-center">
                    <Image
                        src="/lab-report.png"
                        alt="Lab Report"
                        height={500}
                        width={500}
                        className="object-contain rounded-lg"
                    />
                </div>
            </div>
        </section >
    );
}
