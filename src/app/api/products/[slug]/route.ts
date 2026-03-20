import { connectDB } from "@/lib/mongodb";
import { requireAdminToken } from "@/lib/admin-auth";
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

export async function PUT(
  request: NextRequest,
  ctx: { params: Promise<Params> },
) {
  try {
    const unauthorizedResponse = await requireAdminToken(request);
    if (unauthorizedResponse) return unauthorizedResponse;

    await connectDB();
    const { slug } = await ctx.params;

    const normalizedSlug = slug.trim().toLowerCase();
    if (!normalizedSlug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const body = (await request.json()) as Partial<{
      name: string;
      price: number;
      stock: number;
      description: string;
    }>;

    const update: Record<string, unknown> = {};
    if (typeof body.name === "string" && body.name.trim())
      update.name = body.name.trim();
    if (typeof body.price === "number") {
      if (body.price < 0) {
        return NextResponse.json({ error: "Invalid price" }, { status: 400 });
      }
      update.price = body.price;
    }
    if (typeof body.stock === "number") {
      if (body.stock < 0) {
        return NextResponse.json({ error: "Invalid stock" }, { status: 400 });
      }
      update.stock = body.stock;
    }
    if (typeof body.description === "string")
      update.description = body.description.trim() || undefined;

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const updated = await Product.findOneAndUpdate(
      { slug: normalizedSlug },
      { $set: update },
      { new: true },
    )
      .populate("category")
      .lean();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const categoryDoc =
      updated.category &&
      typeof updated.category === "object" &&
      "_id" in updated.category
        ? (updated.category as PopulatedCategory)
        : null;

    const category: CategoryDTO = {
      id: categoryDoc ? String(categoryDoc._id) : "",
      slug: categoryDoc?.slug ?? "",
      name: categoryDoc?.name ?? "",
      description: categoryDoc?.description,
      isActive: categoryDoc?.isActive ?? false,
    };

    const product: ProductDetail = {
      id: String(updated._id),
      name: updated.name,
      slug: updated.slug,
      price: updated.price,
      stock: updated.stock,
      images: updated.images,
      description: updated.description,
      brief: updated.brief,
      specifications: updated.specifications,
      category,
    };

    return NextResponse.json(product, { status: 200 });
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
    console.error("PUT /api/products/[slug] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  ctx: { params: Promise<Params> },
) {
  try {
    const unauthorizedResponse = await requireAdminToken(request);
    if (unauthorizedResponse) return unauthorizedResponse;

    await connectDB();
    const { slug } = await ctx.params;

    const normalizedSlug = slug.trim().toLowerCase();
    if (!normalizedSlug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const deleted = await Product.findOneAndDelete({
      slug: normalizedSlug,
    }).lean();
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/products/[slug] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
