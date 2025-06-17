import { connectDB } from "@/lib/mongodb";
import Service from "@/models/serviceModel";
import Category from "@/models/categoryModel";
import SubService from "@/models/subServiceModel";
import Tag from "@/models/tagModel";

export async function getServiceBySlug(slug) {
    try {
        await connectDB(); // ensures mongoose is connected

        const service = await Service.findOne({ slug })
            .populate("categories")
            .populate("tags")
            .populate("subServices");

        return service ? JSON.parse(JSON.stringify(service)) : null;
    } catch (error) {
        console.error(`Error fetching service ${slug}:`, error);
        return null;
    }
}

export async function getAllServicesSlugs() {
    try {
        await connectDB();

        const services = await Service.find({}, 'slug'); // only fetch `slug` field
        return services.map(service => ({
            slug: service.slug,
        }));
    } catch (error) {
        console.error("Error fetching service slugs:", error);
        return [];
    }
}
