import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { IProduct, Product } from "@/models/Product";
import type {
  ProductCard,
  ProductsDTO,
  ProductSearchParams,
} from "@/types/api";
import { normalize } from "@/utils/helpers/normalize";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

function parseLimit(searchParams: URLSearchParams): number {
  const raw = searchParams.get("limit");
  if (!raw) return DEFAULT_LIMIT;
  const n = Number(raw);
  if (Number.isNaN(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(n, MAX_LIMIT);
}

function mapProductToCard(
  doc: IProduct & { _id: Types.ObjectId },
): ProductCard {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    price: typeof doc.price === "number" ? doc.price : undefined,
    stock: typeof doc.stock === "number" ? doc.stock : undefined,
    images: Array.isArray(doc.images) ? doc.images : [],
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams);
    const cursor = searchParams.get("next");
    const categorySlug =
      searchParams.get("categorySlug")?.trim().toLowerCase() || null;
    const sortByParam = searchParams.get("sortBy");
    const sortBy = (sortByParam as ProductSearchParams["sortBy"]) ?? "default";
    const text = searchParams.get("text")?.trim() || "";

    const resolvedSearchParams: ProductSearchParams = {
      text: text || undefined,
      categorySlug: categorySlug || undefined,
      sortBy: sortBy || undefined,
      next: cursor || null,
    };

    const query: Record<string, unknown> = {};

    if (cursor) {
      if (!mongoose.isValidObjectId(cursor)) {
        return NextResponse.json({ error: "Invalid cursor" }, { status: 400 });
      }
      query._id = { $gt: new mongoose.Types.ObjectId(cursor) };
    }

    if (text) {
      const normalizedText = normalize(text).replace(/\s+/g, "-");

      query.slug = { $regex: new RegExp(normalizedText, "i") };
    }

    if (categorySlug) {
      const categoryDoc = await Category.findOne({
        slug: categorySlug,
      })
        .select({ _id: 1 })
        .lean();

      if (!categoryDoc?._id) {
        return NextResponse.json(
          { products: [], next: null, searchParams: resolvedSearchParams },
          { status: 200 },
        );
      }
      query.category = categoryDoc._id;
    }

    let sort: Record<string, 1 | -1> = { createdAt: -1, _id: -1 };
    switch (sortBy) {
      case "price-asc":
        sort = { price: 1, createdAt: -1, _id: -1 };
        break;
      case "price-desc":
        sort = { price: -1, createdAt: -1, _id: -1 };
        break;
      case "name-asc":
        sort = { name: 1, createdAt: -1, _id: -1 };
        break;
      case "name-desc":
        sort = { name: -1, createdAt: -1, _id: -1 };
        break;
      default:
        sort = { createdAt: -1, _id: -1 };
    }

    const docs = await Product.find(query)
      .sort(sort)
      .limit(limit + 1)
      .lean<(IProduct & { _id: Types.ObjectId })[]>();

    const hasNext = docs.length > limit;
    const pageItems = hasNext ? docs.slice(0, -1) : docs;
    const next =
      hasNext && pageItems.length > 0
        ? String(pageItems[pageItems.length - 1]._id)
        : null;

    const response: ProductsDTO = {
      products: pageItems.map(mapProductToCard),
      next,
      searchParams: resolvedSearchParams,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
