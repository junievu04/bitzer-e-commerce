// app/api/services/route.ts

import { connectDB } from "@/lib/mongodb";
import { IService, Service } from "@/models/Service";
import type { Service as ServiceDTO, ServicesDTO } from "@/types/api";
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
