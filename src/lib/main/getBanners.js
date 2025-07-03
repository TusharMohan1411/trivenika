// lib/api/getBanners.js
export const getBanners = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/banners`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch banners");
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Banner fetch error:", error);
    return [];
  }
};
