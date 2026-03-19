// app/api/services/route.ts

import { connectDB } from "@/lib/mongodb";
import { IService, Service } from "@/models/Service";
import type {
  ServiceDetail,
  Service as ServiceDTO,
  ServicesDTO,
} from "@/types/api";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

type ServiceDoc = IService & { _id: Types.ObjectId };

function parseLimit(searchParams: URLSearchParams): number {
  const raw = searchParams.get("limit");
  if (!raw) return DEFAULT_LIMIT;
  const n = Number(raw);
  if (Number.isNaN(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(n, MAX_LIMIT);
}

function mapToListDTO(doc: ServiceDoc): ServiceDTO {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    thumbnail: doc.thumbnail,
    brief: doc.brief,
  };
}

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

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams);
    const cursor = searchParams.get("cursor");

    const query: Record<string, unknown> = { isActive: true };

    if (cursor) {
      if (!mongoose.isValidObjectId(cursor)) {
        return NextResponse.json({ error: "Invalid cursor" }, { status: 400 });
      }
      query._id = { $gt: new Types.ObjectId(cursor) };
    }

    const docs = await Service.find(query)
      .select("name slug thumbnail brief")
      .sort({ _id: 1 })
      .limit(limit + 1)
      .lean<ServiceDoc[]>();

    const hasNext = docs.length > limit;
    const pageItems = hasNext ? docs.slice(0, -1) : docs;

    const result: ServicesDTO = {
      data: pageItems.map(mapToListDTO),
      next: hasNext ? String(pageItems.at(-1)?._id) : null,
      isActive: true,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("GET /api/services error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = (await request.json()) as Partial<IService>;

    if (!body.name) {
      return NextResponse.json(
        { error: "Missing required field: name" },
        { status: 400 },
      );
    }

    const slug =
      body.slug ??
      body.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    const created = await Service.create({
      name: body.name,
      slug,
      thumbnail: body.thumbnail ?? "",
      brief: body.brief ?? "",
      images: body.images ?? [],
      description: Array.isArray(body.description) ? body.description : [],
      features: Array.isArray(body.features) ? body.features : [],
      isActive: body.isActive ?? true,
    });

    return NextResponse.json(mapToDetailDTO(created.toObject() as ServiceDoc), {
      status: 201,
    });
  } catch (err: unknown) {
    if ((err as { code?: number })?.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 },
      );
    }
    console.error("POST /api/services error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
