// app/layout.jsx
import EnquiryWidget from "@/components/EnquiryWidget";
import "./globals.css";
import { Poppins, Montserrat, Inter } from "next/font/google";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://www.trivenika.in"),
  title: {
    default: "Trivenika Organic | Premium Wood-Pressed Oils",
    template: "%s | Trivenika Organic",
  },
  description:
    "Trivenika Organic offers premium wood-pressed oils including Black Mustard Oil, Yellow Mustard Oil, Coconut Oil, Groundnut Oil, Sesame Oil, Almond Oil, and Flaxseed Oil. Cold-pressed with traditional methods for purity and natural nutrition.",
  keywords: [
    "Trivenika Organic",
    "Triveni Organic",
    "Trivenika",
    "Triveni",
    "Wood-Pressed Oils",
    "Cold Pressed Oils India",
    "Black Mustard Oil",
    "Yellow Mustard Oil",
    "Coconut Oil",
    "Groundnut Oil",
    "Sesame Oil",
    "Almond Oil",
    "Flaxseed Oil",
    "Organic Oils",
    "Healthy Cooking Oils",
  ],
  openGraph: {
    type: "website",
    url: "https://www.trivenika.in/",
    title: "Trivenika Organic | Natural Wood-Pressed Oils",
    description:
      "Discover the purity of nature with Trivenika Organic. Explore our range of premium wood-pressed oils: Black Mustard, Yellow Mustard, Coconut, Groundnut, Sesame, Almond, and Flaxseed.",
    siteName: "Trivenika Organic",
    images: [
      {
        url: "https://www.trivenika.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Trivenika Organic Wood-Pressed Oils",
      },
    ],
  },
  alternates: {
    canonical: "https://www.trivenika.in/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@trivenika",
    title: "Trivenika Organic | Premium Wood-Pressed Oils",
    description:
      "Pure & natural wood-pressed oils crafted with traditional cold-pressing. Promote health with Trivenika Organic.",
    images: ["https://www.trivenika.in/logo.png"],
  },
};

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Trivenika Organic",
    url: "https://www.trivenika.in/",
    logo: "https://www.trivenika.in/logo.png",
    sameAs: [
      "https://www.instagram.com/trivenika_organic4u",
      "https://www.google.com/maps/place/Trivenika+Organic+Wood+Cold+Pressed+Oil/",
    ],
    description:
      "Trivenika Organic produces premium wood-pressed oils using traditional cold-pressing methods. Promoting purity, health, and nature.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8569996206",
      contactType: "customer service",
    },
    makesOffer: [
      {
        "@type": "Product",
        name: "Wood-Pressed Black Mustard Oil",
        url: "https://www.trivenika.in/products/wood-pressed-black-mustard-oil",
      },
      {
        "@type": "Product",
        name: "Wood-Pressed Yellow Mustard Oil",
        url: "https://www.trivenika.in/products/wood-pressed-yellow-mustard-oil",
      },
      {
        "@type": "Product",
        name: "Wood-Pressed Coconut Oil",
        url: "https://www.trivenika.in/products/wood-pressed-coconut-oil",
      },
      {
        "@type": "Product",
        name: "Wood-Pressed Groundnut Oil",
        url: "https://www.trivenika.in/products/wood-pressed-groundnut-oil",
      },
      {
        "@type": "Product",
        name: "Wood-Pressed Sesame Oil",
        url: "https://www.trivenika.in/products/wood-pressed-sesame-oil",
      },
      {
        "@type": "Product",
        name: "Wood-Pressed Almond Oil",
        url: "https://www.trivenika.in/products/wood-pressed-almond-oil",
      },
      {
        "@type": "Product",
        name: "Wood-Pressed Flaxseed Oil",
        url: "https://www.trivenika.in/products/wood-pressed-flaxseed-oil",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${inter.variable} antialiased`}
      >
        <main>{children}</main>
        <div className="max-[1024px]:hidden">
          <EnquiryWidget />
          <WhatsAppWidget />
        </div>
        {/* Add Structured Data */}
        <JsonLd />
      </body>
    </html>
  );
}
