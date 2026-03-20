import { uploadBuffer } from "@/lib/cloudinary";
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

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const form = await request.formData();

    const name = String(form.get("name") ?? "").trim();
    const categoryIdRaw = form.get("categoryId");
    const categorySlugRaw = form.get("categorySlug");
    const priceRaw = form.get("price");
    const stockRaw = form.get("stock");
    const description =
      String(form.get("description") ?? "").trim() || undefined;

    if (!name || !priceRaw) {
      return NextResponse.json(
        { error: "Missing required fields: name, price" },
        { status: 400 },
      );
    }

    const price = Number(priceRaw);
    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const stock = stockRaw !== null ? Number(stockRaw) : 0;
    if (Number.isNaN(stock) || stock < 0) {
      return NextResponse.json({ error: "Invalid stock" }, { status: 400 });
    }

    const hasCategoryId =
      typeof categoryIdRaw === "string" && categoryIdRaw.trim().length > 0;
    const hasCategorySlug =
      typeof categorySlugRaw === "string" && categorySlugRaw.trim().length > 0;

    if (!hasCategoryId && !hasCategorySlug) {
      return NextResponse.json(
        { error: "categoryId or categorySlug is required" },
        { status: 400 },
      );
    }

    let categoryId: Types.ObjectId | null = null;

    if (hasCategoryId && typeof categoryIdRaw === "string") {
      if (!Types.ObjectId.isValid(categoryIdRaw)) {
        return NextResponse.json(
          { error: "Invalid categoryId" },
          { status: 400 },
        );
      }
      categoryId = new Types.ObjectId(categoryIdRaw);
    } else if (hasCategorySlug) {
      const categoryDoc = await Category.findOne({
        slug: String(categorySlugRaw).trim().toLowerCase(),
      })
        .select({ _id: 1 })
        .lean();

      if (!categoryDoc?._id) {
        return NextResponse.json(
          { error: "Category with given slug not found" },
          { status: 400 },
        );
      }
      categoryId = categoryDoc._id;
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: "Could not resolve product category" },
        { status: 400 },
      );
    }

    const slug = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const imageFiles = form
      .getAll("images")
      .filter((f) => f instanceof File) as File[];
    const imagePublicIds: string[] = [];

    for (let i = 0; i < imageFiles.length; i += 1) {
      const file = imageFiles[i];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const publicId = imageFiles.length === 1 ? slug : `${slug}-${i + 1}`;
      const uploaded = await uploadBuffer(buffer, {
        folder: "bitzer/products",
        publicId,
      });
      imagePublicIds.push(uploaded.publicId);
    }

    const created = await Product.create({
      name,
      slug,
      price,
      stock,
      images: imagePublicIds,
      description,
      specifications: [],
      category: categoryId,
    });

    return NextResponse.json(
      { product: mapProductToCard(created.toObject()) },
      { status: 201 },
    );
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "Duplicate product (slug already exists)" },
        { status: 409 },
      );
    }
    console.error("POST /api/products error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
