import axios from "axios";

// lib/api/getBanners.js
export const getBanners = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/banners`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
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

export async function getHomePageCollections() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/collections/getHomePageCollections`,
      {
        next: { revalidate: 60 }, // ← revalidates every 60 seconds
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch homepage collections");
    }

    return res.data;
  } catch (error) {
    console.error("Failed to fetch homepage collections:", error);
    throw error;
  }
}
