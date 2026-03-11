import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { IProduct, Product } from "@/models/Product";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import type { CategoryDTO, ProductDTO } from "@/types/api";
import { uploadBuffer } from "@/lib/cloudinary";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

function parseLimit(searchParams: URLSearchParams): number {
  const raw = searchParams.get("limit");
  if (!raw) return DEFAULT_LIMIT;
  const n = Number(raw);
  if (Number.isNaN(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(n, MAX_LIMIT);
}

type ProductWithCategory = Omit<IProduct, "category"> & {
  category?:
    | Types.ObjectId
    | {
        _id: Types.ObjectId;
        name?: { vi?: string; en?: string };
        slug?: string;
        description?: { vi?: string; en?: string };
        isActive?: boolean;
      };
};

function mapProductToDTO(doc: ProductWithCategory): ProductDTO {
  const categoryDoc =
    doc.category && typeof doc.category === "object" && "_id" in doc.category
      ? doc.category
      : null;

  const category: CategoryDTO = {
    id: categoryDoc && "_id" in categoryDoc ? String(categoryDoc._id) : "",
    slug:
      categoryDoc && "slug" in categoryDoc && categoryDoc.slug
        ? String(categoryDoc.slug)
        : "",
    name:
      categoryDoc &&
      "name" in categoryDoc &&
      categoryDoc.name &&
      typeof categoryDoc.name === "object"
        ? {
            vi: categoryDoc.name.vi ?? "",
            en: categoryDoc.name.en ?? "",
          }
        : { vi: "", en: "" },
    description:
      categoryDoc &&
      "description" in categoryDoc &&
      categoryDoc.description &&
      typeof categoryDoc.description === "object"
        ? {
            vi: categoryDoc.description.vi ?? "",
            en: categoryDoc.description.en ?? "",
          }
        : undefined,
    isActive:
      !!(
        categoryDoc &&
        "isActive" in categoryDoc &&
        typeof categoryDoc.isActive === "boolean"
      ),
  };

  return {
    id: String((doc as IProduct)._id),
    name: doc.name,
    code: doc.code,
    slug: doc.slug,
    price: doc.price,
    stock: doc.stock,
    images: doc.images,
    description: doc.description,
    specs: Object.fromEntries(
      doc.specs instanceof Map ? doc.specs.entries() : Object.entries(doc.specs),
    ),
    category,
    tags: doc.tags,
    isActive: doc.isActive,
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams);
    const cursor = searchParams.get("cursor");
    const categorySlug =
      searchParams.get("category")?.trim().toLowerCase() || null;
    const sortByParam = searchParams.get("sortBy");
    const sortBy =
      (sortByParam as
        | "default"
        | "price-asc"
        | "price-desc"
        | "name-asc"
        | "name-desc"
        | null) ?? "default";
    const includeInactive = searchParams.get("includeInactive") === "true";

    const query: Record<string, unknown> = {};

    if (!includeInactive) {
      query.isActive = true;
    }

    if (cursor) {
      if (!mongoose.isValidObjectId(cursor)) {
        return NextResponse.json({ error: "Invalid cursor" }, { status: 400 });
      }
      query._id = { $gt: new mongoose.Types.ObjectId(cursor) };
    }

    // Filter by category slug if provided
    if (categorySlug) {
      const categoryDoc = await Category.findOne({
        slug: categorySlug,
        isActive: true,
      })
        .select({ _id: 1 })
        .lean();

      if (!categoryDoc?._id) {
        return NextResponse.json(
          { items: [], next: null },
          { status: 200 },
        );
      }

      query.category = categoryDoc._id;
    }

    // Sort configuration
    let sort: Record<string, 1 | -1> = { createdAt: -1, _id: -1 };
    switch (sortBy) {
      case "price-asc":
        sort = { price: 1, createdAt: -1, _id: -1 };
        break;
      case "price-desc":
        sort = { price: -1, createdAt: -1, _id: -1 };
        break;
      case "name-asc":
        sort = { "name.vi": 1, "name.en": 1, createdAt: -1, _id: -1 };
        break;
      case "name-desc":
        sort = { "name.vi": -1, "name.en": -1, createdAt: -1, _id: -1 };
        break;
      default:
        sort = { createdAt: -1, _id: -1 };
    }

    const docs = await Product.find(query)
      .sort(sort)
      .limit(limit + 1)
      .populate("category")
      .lean<ProductWithCategory[]>();

    const hasNext = docs.length > limit;
    const pageItems = hasNext ? docs.slice(0, -1) : docs;
    const next =
      hasNext && pageItems.length > 0
        ? String(pageItems[pageItems.length - 1]._id)
        : null;

    const products = pageItems.map(mapProductToDTO);

    return NextResponse.json(
      {
        products,
        next,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const form = await request.formData();

    const nameVi = String(form.get("name.vi") ?? "");
    const nameEn = String(form.get("name.en") ?? "");
    const code = String(form.get("code") ?? "");
    const categoryIdRaw = form.get("categoryId");
    const categorySlugRaw = form.get("categorySlug");
    const priceRaw = form.get("price");
    const stockRaw = form.get("stock");
    const tagsRaw = form.get("tags");
    const descriptionVi = String(form.get("description.vi") ?? "");
    const descriptionEn = String(form.get("description.en") ?? "");

    if (!nameVi || !nameEn || !code || !priceRaw) {
      return NextResponse.json(
        { error: "Missing required fields (name.vi, name.en, code, price)" },
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
        return NextResponse.json({ error: "Invalid categoryId" }, { status: 400 });
      }
      categoryId = new Types.ObjectId(categoryIdRaw);
    } else if (hasCategorySlug) {
      const categoryDoc = await Category.findOne({
        slug: String(categorySlugRaw).trim().toLowerCase(),
        isActive: true,
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

    const baseSlugFromName = nameVi
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const slug = baseSlugFromName;

    const imageFiles = form.getAll("images").filter((f) => f instanceof File) as File[];
    const imagePublicIds: string[] = [];

    for (let i = 0; i < imageFiles.length; i += 1) {
      const file = imageFiles[i];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const publicId =
        imageFiles.length === 1 ? slug : `${slug}-${i + 1}`;

      const uploaded = await uploadBuffer(buffer, {
        folder: "bitzer/products",
        publicId,
      });

      imagePublicIds.push(uploaded.publicId);
    }

    const created = await Product.create({
      name: { vi: nameVi, en: nameEn },
      code: code.toUpperCase().trim(),
      slug,
      price,
      stock,
      images: imagePublicIds,
      description: {
        vi: descriptionVi,
        en: descriptionEn,
      },
      specs: {},
      category: categoryId,
      tags:
        typeof tagsRaw === "string" && tagsRaw.trim().length > 0
          ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      isActive: true,
    });

    return NextResponse.json(
      {
        product: mapProductToDTO(created.toObject() as ProductWithCategory),
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && (err as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "Duplicate product (code or slug already exists)" },
        { status: 409 },
      );
    }
    console.error("POST /api/products error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

