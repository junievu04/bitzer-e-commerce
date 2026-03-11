import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import type { ServiceDTO } from "@/types/api";
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

    const doc = await Service.findOne({
      slug: normalizedSlug,
      isActive: true,
    }).lean();

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const service: ServiceDTO = {
      id: String(doc._id),
      name: doc.name,
      slug: doc.slug,
      summary: doc.summary,
      description: doc.description,
      images: doc.images,
      isActive: doc.isActive,
    };

    return NextResponse.json(
      {
        service,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/services/[slug] error:", err);
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
      name: { vi: string; en: string };
      summary: { vi: string; en: string };
      description: { vi: string; en: string };
      images: string[];
      isActive: boolean;
    }>;

    const update: Record<string, unknown> = {};

    if (body.name) update.name = body.name;
    if (body.summary) update.summary = body.summary;
    if (body.description) update.description = body.description;
    if (Array.isArray(body.images)) update.images = body.images;
    if (typeof body.isActive === "boolean") update.isActive = body.isActive;

    const updated = await Service.findOneAndUpdate(
      { slug: normalizedSlug },
      { $set: update },
      { new: true },
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const service: ServiceDTO = {
      id: String(updated._id),
      name: updated.name,
      slug: updated.slug,
      summary: updated.summary,
      description: updated.description,
      images: updated.images,
      isActive: updated.isActive,
    };

    return NextResponse.json(
      {
        service,
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && (err as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "Duplicate service (slug already exists)" },
        { status: 409 },
      );
    }
    console.error("PUT /api/services/[slug] error:", err);
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

    const deleted = await Service.findOneAndDelete({
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
    console.error("DELETE /api/services/[slug] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}


