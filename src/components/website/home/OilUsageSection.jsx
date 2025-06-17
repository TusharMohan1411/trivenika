// app/components/OilUsageSection.jsx
import Image from "next/image";

export default function OilUsageSection() {
    return (
        <section className="px-4 md:px-16 py-12 bg-[#FFFDF7]">
            <div className="max-w-6xl mx-auto bg-green-700 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-10">
                {/* Image */}
                <div className="w-48 h-48 relative flex-shrink-0">
                    <Image
                        src="/oil-uses.png" // 🔁 Replace with your actual image
                        alt="Oil Uses"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Text */}
                <div className="text-white">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">
                        Where Can You Use Our Oils?
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                        <li>Cooking & Frying – Perfect for daily cooking, deep frying, and tadkas</li>
                        <li>On Rotis or Rice – Add a spoonful for better taste and digestion</li>
                        <li>Hair Oil – Nourishes scalp, promotes strong and shiny hair</li>
                        <li>Baby Massage – Gentle and safe for baby’s skin and bone strength</li>
                        <li>Skin Moisturizer – Natural hydration for dry skin and lips</li>
                        <li>Pooja & Rituals – Pure and traditional choice for religious use</li>
                        <li>Oil Pulling – Ayurvedic detox method for oral health</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
