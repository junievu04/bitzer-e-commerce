import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import type { CategoryDTO } from "@/types/api";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Params = { id: string };

function parseObjectId(id: string) {
  if (!Types.ObjectId.isValid(id)) return null;
  return new Types.ObjectId(id);
}

export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<Params> },
) {
  try {
    await connectDB();
    const { id } = await ctx.params;

    const objectId = parseObjectId(id);
    if (!objectId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const doc = await Category.findById(objectId).lean();
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const category: CategoryDTO = {
      id: String(doc._id),
      slug: doc.slug,
      name: doc.name,
      description: doc.description,
      isActive: doc.isActive,
    };

    return NextResponse.json({ category }, { status: 200 });
  } catch (err) {
    console.error("GET /api/categories/[id] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
