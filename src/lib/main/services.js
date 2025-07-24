import { connectDB } from "@/lib/mongodb";
import Service from "@/models/serviceModel";
import Category from "@/models/categoryModel";
import Tag from "@/models/tagModel";
import Collection from "@/models/collectionModel";

// get service by slug
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

// to get collection with the help of slug
export async function getCollectionBySlug(slug) {
  try {
    await connectDB();

    const fullCollection = await Collection.findOne({ slug }).populate(
      "products.productId"
    );

    const filteredProducts = fullCollection.products?.filter(
      (p) => p?.productId?.status === true
    );

    const collection = {
      ...fullCollection.toObject(),
      products: filteredProducts,
    };

    return JSON.parse(JSON.stringify(collection)) || [];
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

// get latest products
export async function getLatestServices() {
  try {
    await connectDB();
    const latestServices = await Service.find({ status: true })
      .sort({ updatedAt: -1 })
      .limit(4);

    return JSON.parse(JSON.stringify(latestServices));
  } catch (error) {
    console.error("Error in getting lastest Products: ", error);
    return null;
  }
}

// get related products

export async function getRelatedServices(service) {
  try {
    if (!service?.tags?.length) return [];

    const tagIds = service?.tags?.map((t) => t._id);

    const related = await Service.find({
      _id: { $ne: service._id },
      tags: { $in: tagIds },
    }).limit(8);

    return JSON.parse(JSON.stringify(related)) || [];
  } catch (error) {
    console.error("Error fetching related products:", err);
    return [];
  }
}
