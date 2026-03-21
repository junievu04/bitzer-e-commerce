import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import type { CategoryDTO, ProductDetail } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

type Params = { slug: string };

type PopulatedCategory = {
  _id: { toString(): string };
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
};

export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<Params> },
) {
  try {
    await connectDB();
    const { slug } = await ctx.params;

    const normalizedSlug = slug.trim().toLowerCase();
    if (!normalizedSlug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const doc = await Product.findOne({ slug: normalizedSlug })
      .populate("category")
      .lean();

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const categoryDoc =
      doc.category && typeof doc.category === "object" && "_id" in doc.category
        ? (doc.category as PopulatedCategory)
        : null;

    const category: CategoryDTO = {
      id: categoryDoc ? String(categoryDoc._id) : "",
      slug: categoryDoc?.slug ?? "",
      name: categoryDoc?.name ?? "",
      description: categoryDoc?.description,
      isActive: categoryDoc?.isActive ?? false,
    };

    const product: ProductDetail = {
      id: String(doc._id),
      name: doc.name,
      slug: doc.slug,
      price: doc.price,
      stock: doc.stock,
      images: doc.images,
      brief: doc.brief,
      description: doc.description,
      specifications: doc.specifications,
      category,
    };

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("GET /api/products/[slug] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
