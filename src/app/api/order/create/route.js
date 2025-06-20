// app/api/order/create/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";

export const runtime = "nodejs";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const {
      type,
      user,
      shippingDetails,
      cart,
      totalAmount,
      paymentMethod,
      paymentStatus = "pending",
      razorpayOrder,
      transactionId,
    } = body;

    if (!shippingDetails || !cart || !cart.length || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrder = new Order({
      type,
      user: user,
      shippingDetails,
      cart,
      totalAmount,
      paymentMethod,
      paymentStatus,
      transactionId,
      razorpayOrder,
      status: [{ currentStatus: "New", message: "Order received" }],
    });

    await newOrder.save();

    return NextResponse.json(
      { success: true, orderId: newOrder._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
