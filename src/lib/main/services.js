import { connectDB } from "@/lib/mongodb";
import Service from "@/models/serviceModel";
import Category from "@/models/categoryModel";
import Tag from "@/models/tagModel";
import Collection from "@/models/collectionModel";

export async function getServiceBySlug(slug) {
  try {
    await connectDB(); // ensures mongoose is connected

    const service = await Service.findOne({ slug })
      .populate("categories")
      .populate("tags");

    return service ? JSON.parse(JSON.stringify(service)) : null;
  } catch (error) {
    console.error(`Error fetching service ${slug}:`, error);
    return null;
  }
}
export async function getCollectionBySlug(slug) {
  try {
    await connectDB();

    const collection = await Collection.findOne({ slug }).populate(
      "products.productId"
    );

    return collection ? JSON.parse(JSON.stringify(collection)) : null;
  } catch (error) {
    console.error(`Error fetching collection ${slug}:`, error);
    return null;
  }
}

export async function getCollections() {
  try {
    await connectDB();
    const collections = await Collection.find({});

    return collections ? JSON.parse(JSON.stringify(collections)) : null;
  } catch (error) {
    console.error(`Error fetching collections`, error);
    return null;
  }
}

export async function getAllServicesSlugs() {
  try {
    await connectDB();

    const services = await Service.find({}, "slug"); // only fetch `slug` field
    return services.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error("Error fetching service slugs:", error);
    return [];
  }
}

export async function getLatestServices() {
  try {
    await connectDB();
    const latestServices = await Service.find()
      .sort({ updatedAt: -1 })
      .limit(4);

    return JSON.parse(JSON.stringify(latestServices));
  } catch (error) {
    console.error("Error in getting lastest Products: ", error);
    return null;
  }
}
