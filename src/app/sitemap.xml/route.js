import { getAllCollectionsSlugs, getAllServicesSlugs } from "@/lib/main/services";

export const GET = async () => {
    const products = await getAllServicesSlugs();
    const collections = await getAllCollectionsSlugs();
    const baseUrl = "https://www.trivenika.in";

    const urls = [
        "", // home
        "about-us",
        "contact-us",
        "privacy-policy",
        "refund-policy",
        "shipping-policy",
        "terms-and-conditions",
        "our-story",
        "track-order",
        "blogs",
        ...products.map((p) => `products/${p.slug}`),
        ...collections.map((c) => `collections/${c.slug}`),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
            .map(
                (url) => `
    <url>
      <loc>${baseUrl}/${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
            )
            .join("")}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
};
