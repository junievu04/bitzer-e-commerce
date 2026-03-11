import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import type { CategoryDTO, ProductDTO } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

type Params = { slug: string };

export async function GET(_request: NextRequest, ctx: { params: Promise<Params> }) {
  try {
    await connectDB();
    const { slug } = await ctx.params;

    const normalizedSlug = slug.trim().toLowerCase();
    if (!normalizedSlug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const doc = await Product.findOne({ slug: normalizedSlug, isActive: true })
      .populate("category")
      .lean();

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const categoryDoc =
      doc.category && typeof doc.category === "object" && "_id" in doc.category
        ? doc.category
        : null;

    const category: CategoryDTO = {
      id: categoryDoc?._id ? String(categoryDoc._id) : "",
      slug: categoryDoc?.slug ?? "",
      name:
        categoryDoc?.name && typeof categoryDoc.name === "object"
          ? {
              vi: categoryDoc.name.vi ?? "",
              en: categoryDoc.name.en ?? "",
            }
          : { vi: "", en: "" },
      description:
        categoryDoc?.description && typeof categoryDoc.description === "object"
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

    const product: ProductDTO = {
      id: String(doc._id),
      name: doc.name,
      code: doc.code,
      slug: doc.slug,
      price: doc.price,
      stock: doc.stock,
      images: doc.images,
      description: doc.description,
      specs:
        doc.specs instanceof Map
          ? Object.fromEntries(doc.specs.entries())
          : (doc.specs as Record<string, string>),
      category,
      tags: doc.tags,
      isActive: doc.isActive,
    };

    return NextResponse.json(
      {
        product,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/products/[slug] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, ctx: { params: Promise<Params> }) {
  try {
    await connectDB();
    const { slug } = await ctx.params;

    const normalizedSlug = slug.trim().toLowerCase();
    if (!normalizedSlug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const body = (await request.json()) as Partial<{
      price: number;
      stock: number;
    }>;

    const update: Record<string, unknown> = {};

    if (typeof body.price === "number") update.price = body.price;
    if (typeof body.stock === "number") update.stock = body.stock;

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
        ? updated.category
        : null;

    const category: CategoryDTO = {
      id: categoryDoc?._id ? String(categoryDoc._id) : "",
      slug: categoryDoc?.slug ?? "",
      name:
        categoryDoc?.name && typeof categoryDoc.name === "object"
          ? {
              vi: categoryDoc.name.vi ?? "",
              en: categoryDoc.name.en ?? "",
            }
          : { vi: "", en: "" },
      description:
        categoryDoc?.description && typeof categoryDoc.description === "object"
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

    const product: ProductDTO = {
      id: String(updated._id),
      name: updated.name,
      code: updated.code,
      slug: updated.slug,
      price: updated.price,
      stock: updated.stock,
      images: updated.images,
      description: updated.description,
      specs:
        updated.specs instanceof Map
          ? Object.fromEntries(updated.specs.entries())
          : (updated.specs as Record<string, string>),
      category,
      tags: updated.tags,
      isActive: updated.isActive,
    };

    return NextResponse.json(
      {
        product,
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && (err as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "Duplicate product (code or slug already exists)" },
        { status: 409 },
      );
    }
    console.error("PUT /api/products/[slug] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
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

    const deleted = await Product.findOneAndDelete({
      slug: normalizedSlug,
    }).lean();

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("DELETE /api/products/[slug] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

