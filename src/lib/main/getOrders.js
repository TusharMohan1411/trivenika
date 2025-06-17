import { connectDB } from "../mongodb";
import Order from "@/models/orderModel";
import SubService from "@/models/subServiceModel";
import User from "@/models/userModel";

export async function getOrderById(id) {
    try {
        await connectDB();
        const order = await Order.findById(id)
            .populate('subService')
            .populate('user')

        return order ? JSON.parse(JSON.stringify(order)) : null;

    } catch (error) {
        console.error("Error fetching Sub Service", error)
        return null
    }
}