import SubService from "@/models/subServiceModel";
import { connectDB } from "../mongodb";
import Service from "@/models/serviceModel";

export async function getSubServiceById(id) {
    try {
        await connectDB();

        const subService = await SubService.findById(id)
            .populate('serviceId')

        return subService ? JSON.parse(JSON.stringify(subService)) : null;

    } catch (error) {
        console.error("Error fetching Sub Service", error)
        return null
    }
}