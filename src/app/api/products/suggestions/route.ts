import { connectDB } from "@/lib/mongodb";
import { IProduct, Product } from "@/models/Product";
import type { ProductItem, ProductsDTO } from "@/modules/products";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const MIN_SUGGESTIONS = 3;
const MAX_SUGGESTIONS = 8;

function mapProductToCard(
  doc: IProduct & { _id: Types.ObjectId },
): ProductItem {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    price: typeof doc.price === "number" ? doc.price : undefined,
    stock: typeof doc.stock === "number" ? doc.stock : undefined,
    images: Array.isArray(doc.images) ? doc.images : [],
  };
}

async function getFallbackProducts(
  excludeIds: Types.ObjectId[],
  needed: number,
): Promise<(IProduct & { _id: Types.ObjectId })[]> {
  return Product.find({
    _id: { $nin: excludeIds },
    stock: { $gt: 0 },
  })
    .limit(needed)
    .lean<(IProduct & { _id: Types.ObjectId })[]>();
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim().toLowerCase();

    if (!slug) {
      const fallback = await getFallbackProducts([], MAX_SUGGESTIONS);
      const response: ProductsDTO = {
        products: fallback.map(mapProductToCard),
        next: null,
        searchParams: {},
      };
      return NextResponse.json(response, { status: 200 });
    }

    const current = await Product.findOne({ slug })
      .select({ _id: 1, category: 1 })
      .lean<{ _id: Types.ObjectId; category: Types.ObjectId }>();

    if (!current) {
      const fallback = await getFallbackProducts([], MAX_SUGGESTIONS);
      const response: ProductsDTO = {
        products: fallback.map(mapProductToCard),
        next: null,
        searchParams: {},
      };
      return NextResponse.json(response, { status: 200 });
    }

    const sameCategoryDocs = await Product.find({
      category: current.category,
      _id: { $ne: current._id },
    })
      .limit(MAX_SUGGESTIONS)
      .lean<(IProduct & { _id: Types.ObjectId })[]>();

    let suggestions = sameCategoryDocs;

    if (suggestions.length < MIN_SUGGESTIONS) {
      const excludeIds = [current._id, ...suggestions.map((p) => p._id)];
      const needed = MIN_SUGGESTIONS - suggestions.length;
      const extra = await getFallbackProducts(excludeIds, needed);
      suggestions = [...suggestions, ...extra];
    }

    const response: ProductsDTO = {
      products: suggestions.map(mapProductToCard),
      next: null,
      searchParams: {},
    };
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("GET /api/products/suggestions error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
