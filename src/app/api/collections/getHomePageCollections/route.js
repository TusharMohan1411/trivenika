// api/collections/getHomePageCollections/route.js

import { connectDB } from "@/lib/mongodb";
import Collection from "@/models/collectionModel";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const res = await Collection.find({
      featureOnHomePage: true,
    })
      .sort({ updatedAt: -1 })
      .limit(4)
      .populate("products.productId")
      .lean();

    return NextResponse.json({ data: res, message: "Data fetched" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
