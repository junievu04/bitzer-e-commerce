import { connectDB } from "@/lib/mongodb";
import { IService, Service } from "@/models/Service";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import type { ServiceDTO } from "@/types/api";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

function parseLimit(searchParams: URLSearchParams): number {
  const raw = searchParams.get("limit");
  if (!raw) return DEFAULT_LIMIT;
  const n = Number(raw);
  if (Number.isNaN(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(n, MAX_LIMIT);
}

type ServiceDoc = IService & { _id: Types.ObjectId };

function mapServiceToDTO(doc: ServiceDoc): ServiceDTO {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    summary: doc.summary,
    description: doc.description,
    images: doc.images,
    isActive: doc.isActive,
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams);
    const cursor = searchParams.get("cursor");
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

    const docs = await Service.find(query)
      .sort({ _id: 1 })
      .limit(limit + 1)
      .lean<ServiceDoc[]>();

    const hasNext = docs.length > limit;
    const pageItems = hasNext ? docs.slice(0, -1) : docs;
    const next =
      hasNext && pageItems.length > 0
        ? String(pageItems[pageItems.length - 1]._id)
        : null;

    const services = pageItems.map(mapServiceToDTO);

    return NextResponse.json(
      {
        services,
        next,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/services error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = (await request.json()) as {
      name: { vi: string; en: string };
      slug?: string;
      summary?: { vi?: string; en?: string };
      description?: { vi?: string; en?: string };
      images?: string[];
      isActive?: boolean;
    };

    if (!body?.name?.vi || !body?.name?.en) {
      return NextResponse.json(
        { error: "Missing required fields (name.vi, name.en)" },
        { status: 400 },
      );
    }

    const slug =
      body.slug ??
      body.name.vi
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    const created = await Service.create({
      name: body.name,
      slug,
      summary: {
        vi: body.summary?.vi ?? "",
        en: body.summary?.en ?? "",
      },
      description: {
        vi: body.description?.vi ?? "",
        en: body.description?.en ?? "",
      },
      images: body.images ?? [],
      isActive: body.isActive ?? true,
    });

    const service = mapServiceToDTO(created.toObject() as ServiceDoc);

    return NextResponse.json(
      {
        service,
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && (err as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "Duplicate service (slug already exists)" },
        { status: 409 },
      );
    }
    console.error("POST /api/services error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

