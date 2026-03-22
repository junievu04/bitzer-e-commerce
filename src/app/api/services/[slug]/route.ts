// app/api/services/[slug]/route.ts
import { connectDB } from "@/lib/mongodb";
import { IService, Service } from "@/models/Service";
import type { ServiceDetail } from "@/modules/services";
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
