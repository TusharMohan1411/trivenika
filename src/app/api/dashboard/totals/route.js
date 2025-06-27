import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import Service from "@/models/serviceModel";
import User from "@/models/userModel";
import Blog from "@/models/blogModel";

export async function GET() {
  try {
    await connectDB();

    // Fetch counts in parallel
    const [categoriesCount, servicesCount, usersCount, blogsCount] =
      await Promise.all([
        Category.countDocuments(),
        Service.countDocuments(),
        User.countDocuments({ role: "user" }),
        Blog.countDocuments(),
      ]);

    return NextResponse.json({
      categoriesCount,
      servicesCount,
      usersCount,
      blogsCount,
    });
  } catch (error) {
    console.error("Totals API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
