import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import type { CategoryDTO } from "@/types/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 })
      .lean();

    const data: CategoryDTO[] = categories.map((cat) => ({
      id: String(cat._id),
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      isActive: cat.isActive,
    }));

    return NextResponse.json({ categories: data }, { status: 200 });
  } catch (err) {
    console.error("GET /api/categories error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
