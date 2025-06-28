import { connectDB } from "@/lib/mongodb";
import Collection from "@/models/collectionModel";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { collectionId, products } = body;

    if (!collectionId || !Array.isArray(products)) {
      return NextResponse.json(
        { error: "collectionId and products (array) are required" },
        { status: 400 }
      );
    }

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    // Overwrite products list
    collection.products = products;
    await collection.save();

    return NextResponse.json({
      success: true,
      message: "Collection products updated successfully.",
      updatedCollection: collection,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Server error", details: e.message },
      { status: 500 }
    );
  }
}
