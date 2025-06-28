import { connectDB } from "@/lib/mongodb";
import Collection from "@/models/collectionModel";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";

// GET all collections
export async function GET() {
  try {
    await connectDB();
    const collections = await Collection.find()
      .populate("products") // Optional: populate product data
      .sort({ updatedAt: -1 });
    return NextResponse.json({ data: collections });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST a new collection
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    // Check for existing name or slug
    if (body.name || body.slug) {
      const existing = await Collection.findOne({
        $or: [{ name: body.name }, { slug: body.slug }],
      });

      if (existing) {
        throw new Error(
          "Collection with this name or slug already exists. Please use a unique value."
        );
      }
    }

    const newCollection = await Collection.create(body);
    return NextResponse.json(
      { success: true, collection: newCollection },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
