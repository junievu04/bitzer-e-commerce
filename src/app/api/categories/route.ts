import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import type { CategoryDTO } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
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

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = (await request.json()) as {
      name: string;
      slug?: string;
      description?: string;
      isActive?: boolean;
    };

    if (!body?.name?.trim()) {
      return NextResponse.json(
        { error: "Missing required field: name" },
        { status: 400 },
      );
    }

    const slug =
      body.slug ??
      body.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    const created = await Category.create({
      name: body.name.trim(),
      slug,
      description: body.description?.trim(),
      isActive: body.isActive ?? true,
    });

    const category: CategoryDTO = {
      id: String(created._id),
      slug: created.slug,
      name: created.name,
      description: created.description,
      isActive: created.isActive,
    };

    return NextResponse.json({ category }, { status: 201 });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "Duplicate category (slug already exists)" },
        { status: 409 },
      );
    }
    console.error("POST /api/categories error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
