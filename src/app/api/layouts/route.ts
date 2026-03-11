import { connectDB } from "@/lib/mongodb";
import { Layout } from "@/models/Layout";
import { NextResponse } from "next/server";

const DEFAULT_LOCALE = "vi";

export async function GET() {
  try {
    await connectDB();

    const layouts = await Layout.find({ locale: DEFAULT_LOCALE })
      .select({ _id: 0, key: 1, locale: 1, data: 1, updatedAt: 1 })
      .sort({ key: 1 })
      .lean();

    return NextResponse.json(
      {
        layouts,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/layouts error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
