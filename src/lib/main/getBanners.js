// lib/api/getBanners.js
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/bannerModel";
import Collection from "@/models/collectionModel";

export const getBanners = async () => {
  try {
    await connectDB();
    const banners = await Banner.find().sort({ updatedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(banners)) || [];
  } catch (error) {
    console.error("Banner fetch error (DB):", error);
    return [];
  }
};

// import { connectDB } from "@/lib/mongodb";

export async function getHomePageCollections() {
  try {
    await connectDB();
    const collections = await Collection.find({ featureOnHomePage: true })
      .sort({ updatedAt: -1 })
      .limit(4)
      .populate("products.productId")
      .lean();

    return JSON.parse(JSON.stringify(collections)) || [];
  } catch (error) {
    console.error("Homepage collections fetch error (DB):", error);
    return [];
  }
}
