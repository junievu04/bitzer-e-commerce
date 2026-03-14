import { connectDB } from "@/lib/mongodb";
import { Layout } from "@/models/Layout";
import { NextRequest, NextResponse } from "next/server";

type Params = { key: string };

const DEFAULT_LOCALE = "vi";

function buildDefaultLayout(key: string) {
  const normalizedKey = key.trim().toLowerCase();
  return {
    layoutKey: normalizedKey,
    name: "",
    locale: DEFAULT_LOCALE,
    data: {
      type: normalizedKey,
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
    const { key } = await ctx.params;

    const normalizedKey = key.trim().toLowerCase();
    if (!normalizedKey) {
      return NextResponse.json(
        { error: "Invalid layout type" },
        { status: 400 },
      );
    }

    const doc = await Layout.findOne({
      layoutKey: normalizedKey,
      locale: DEFAULT_LOCALE,
    })
      .select({
        _id: 0,
        layoutKey: 1,
        name: 1,
        locale: 1,
        data: 1,
        updatedAt: 1,
      })
      .lean();

    if (!doc) {
      return NextResponse.json(buildDefaultLayout(normalizedKey), {
        status: 200,
      });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (err) {
    console.error("GET /api/layouts/[key] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
