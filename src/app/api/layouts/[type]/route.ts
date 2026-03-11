import { connectDB } from "@/lib/mongodb";
import { Layout } from "@/models/Layout";
import { NextRequest, NextResponse } from "next/server";

type Params = { type: string };

const DEFAULT_LOCALE = "vi";

function buildDefaultLayout(type: string) {
  const normalizedType = type.trim().toLowerCase();
  return {
    key: normalizedType,
    locale: DEFAULT_LOCALE,
    data: {
      type: normalizedType,
      components: [],
    },
    updatedAt: null,
  };
}

export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<Params> },
) {
  try {
    await connectDB();
    const { type } = await ctx.params;

    const normalizedKey = type.trim().toLowerCase();
    if (!normalizedKey) {
      return NextResponse.json({ error: "Invalid layout type" }, { status: 400 });
    }

    const doc = await Layout.findOne({
      key: normalizedKey,
      locale: DEFAULT_LOCALE,
    })
      .select({ _id: 0, key: 1, locale: 1, data: 1, updatedAt: 1 })
      .lean();

    if (!doc) {
      return NextResponse.json(
        {
          layout: buildDefaultLayout(normalizedKey),
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        layout: doc,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/layouts/[type] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

