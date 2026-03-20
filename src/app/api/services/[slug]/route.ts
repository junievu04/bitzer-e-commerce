// app/api/services/[slug]/route.ts

import { requireAdminToken } from "@/lib/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { IService, Service } from "@/models/Service";
import type { ServiceDetail } from "@/types/api";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type ServiceDoc = IService & { _id: Types.ObjectId };
type Params = { slug: string };

function mapToDetailDTO(doc: ServiceDoc): ServiceDetail {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    thumbnail: doc.thumbnail,
    brief: doc.brief,
    images: doc.images,
    description: doc.description,
    features: doc.features,
  };
}

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

    const doc = await Service.findOne({
      slug: normalizedSlug,
      isActive: true,
    }).lean<ServiceDoc>();

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(mapToDetailDTO(doc), { status: 200 });
  } catch (err) {
    console.error("GET /api/services/[slug] error:", err);
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

    const body = (await request.json()) as Partial<IService>;
    const update: Record<string, unknown> = {};

    if (body.name !== undefined) update.name = body.name;
    if (body.thumbnail !== undefined) update.thumbnail = body.thumbnail;
    if (body.brief !== undefined) update.brief = body.brief;
    if (Array.isArray(body.images)) update.images = body.images;
    if (Array.isArray(body.description)) update.description = body.description;
    if (Array.isArray(body.features)) update.features = body.features;
    if (typeof body.isActive === "boolean") update.isActive = body.isActive;

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    const updated = await Service.findOneAndUpdate(
      { slug: normalizedSlug },
      { $set: update },
      { new: true },
    ).lean<ServiceDoc>();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(mapToDetailDTO(updated), { status: 200 });
  } catch (err) {
    console.error("PUT /api/services/[slug] error:", err);
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

    const deleted = await Service.findOneAndDelete({
      slug: normalizedSlug,
    }).lean();

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/services/[slug] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
