import { connectDB } from "@/lib/mongodb";
import { mapProductToCard } from "@/lib/web/map-product-card";
import { Category } from "@/models/Category";
import { IProduct, Product } from "@/models/Product";
import type { ProductsDTO, ProductSearchParams } from "@/modules/products";
import { normalizeText } from "@/utils/helpers/shared-helpers";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

function parseLimit(searchParams: URLSearchParams): number {
  const raw = searchParams.get("limit");
  if (!raw) return DEFAULT_LIMIT;
  const n = Number(raw);
  if (Number.isNaN(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(n, MAX_LIMIT);
}

/** Cursor v1 — keys must match the active sort so the seek filter matches .sort() */
type CursorPayloadV1 = {
  v: 1;
  sortBy: NonNullable<ProductSearchParams["sortBy"]>;
  _id: string;
  createdAt: string;
  price: number;
  name: string;
};

function toIso(d: Date | string | undefined): string {
  if (!d) return new Date(0).toISOString();
  return d instanceof Date ? d.toISOString() : new Date(d).toISOString();
}

function docToCursorPayload(
  doc: {
    _id: Types.ObjectId;
    createdAt?: Date | string;
    price: number;
    name: string;
  },
  sortBy: ProductSearchParams["sortBy"],
): CursorPayloadV1 {
  return {
    v: 1,
    sortBy: sortBy ?? "default",
    _id: String(doc._id),
    createdAt: toIso(doc.createdAt),
    price: doc.price,
    name: doc.name,
  };
}

function encodeCursorPayload(p: CursorPayloadV1): string {
  return Buffer.from(JSON.stringify(p), "utf8").toString("base64url");
}

function decodeCursorPayload(raw: string): CursorPayloadV1 | null {
  try {
    const p = JSON.parse(
      Buffer.from(raw, "base64url").toString("utf8"),
    ) as CursorPayloadV1;
    if (p?.v !== 1 || !p._id || !p.createdAt) return null;
    return p;
  } catch {
    return null;
  }
}

/**
 * Seek filter: documents strictly after `p` in the same total order as `.sort(...)`.
 * Tie-breakers: createdAt desc, then _id desc (same as sort definitions below).
 */
function buildSeekFilter(p: CursorPayloadV1): { $or: Record<string, unknown>[] } {
  const id = new Types.ObjectId(p._id);
  const ct = new Date(p.createdAt);

  switch (p.sortBy) {
    case "price-asc":
      return {
        $or: [
          { price: { $gt: p.price } },
          { price: p.price, createdAt: { $lt: ct } },
          { price: p.price, createdAt: ct, _id: { $lt: id } },
        ],
      };
    case "price-desc":
      return {
        $or: [
          { price: { $lt: p.price } },
          { price: p.price, createdAt: { $lt: ct } },
          { price: p.price, createdAt: ct, _id: { $lt: id } },
        ],
      };
    case "name-asc":
      return {
        $or: [
          { name: { $gt: p.name } },
          { name: p.name, createdAt: { $lt: ct } },
          { name: p.name, createdAt: ct, _id: { $lt: id } },
        ],
      };
    case "name-desc":
      return {
        $or: [
          { name: { $lt: p.name } },
          { name: p.name, createdAt: { $lt: ct } },
          { name: p.name, createdAt: ct, _id: { $lt: id } },
        ],
      };
    default:
      return {
        $or: [{ createdAt: { $lt: ct } }, { createdAt: ct, _id: { $lt: id } }],
      };
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams);
    const cursorRaw = searchParams.get("next");
    const categorySlug =
      searchParams.get("categorySlug")?.trim().toLowerCase() || null;
    const sortByParam = searchParams.get("sortBy");
    const sortBy = (sortByParam as ProductSearchParams["sortBy"]) ?? "default";
    const text = searchParams.get("text")?.trim() || "";

    const resolvedSearchParams: ProductSearchParams = {
      text: text || undefined,
      categorySlug: categorySlug || undefined,
      sortBy: sortBy || undefined,
      next: cursorRaw || null,
    };

    const query: Record<string, unknown> = {};
    const andParts: Record<string, unknown>[] = [];

    if (text) {
      const normalizedText = normalizeText(text).replace(/\s+/g, "-");

      andParts.push({
        $or: [
          { slug: { $regex: new RegExp(normalizedText, "i") } },
          { name: { $regex: new RegExp(text.trim(), "i") } },
        ],
      });
    }

    let categoryId: Types.ObjectId | null = null;
    if (categorySlug) {
      const categoryDoc = await Category.findOne({
        slug: categorySlug,
      })
        .select({ _id: 1 })
        .lean();

      if (!categoryDoc?._id) {
        return NextResponse.json(
          { products: [], next: null, searchParams: resolvedSearchParams },
          { status: 200 },
        );
      }
      categoryId = categoryDoc._id as Types.ObjectId;
      query.category = categoryId;
    }

    if (cursorRaw) {
      let payload = decodeCursorPayload(cursorRaw);
      if (!payload && mongoose.isValidObjectId(cursorRaw)) {
        const anchorMatch: Record<string, unknown> = {
          _id: new Types.ObjectId(cursorRaw),
        };
        if (categoryId) anchorMatch.category = categoryId;
        if (text) {
          const normalizedText = normalizeText(text).replace(/\s+/g, "-");
          anchorMatch.$or = [
            { slug: { $regex: new RegExp(normalizedText, "i") } },
            { name: { $regex: new RegExp(text.trim(), "i") } },
          ];
        }
        const anchor = await Product.findOne(anchorMatch)
          .select({ _id: 1, createdAt: 1, price: 1, name: 1 })
          .lean<{
            _id: Types.ObjectId;
            createdAt?: Date;
            price: number;
            name: string;
          } | null>();
        if (anchor) {
          payload = docToCursorPayload(anchor, sortBy);
        }
      }

      if (!payload) {
        return NextResponse.json({ error: "Invalid cursor" }, { status: 400 });
      }

      if (payload.sortBy !== sortBy) {
        return NextResponse.json(
          { error: "Cursor does not match sortBy" },
          { status: 400 },
        );
      }

      andParts.push(buildSeekFilter(payload));
    }

    if (andParts.length > 0) {
      query.$and = andParts;
    }

    let sort: Record<string, 1 | -1> = { createdAt: -1, _id: -1 };
    switch (sortBy) {
      case "price-asc":
        sort = { price: 1, createdAt: -1, _id: -1 };
        break;
      case "price-desc":
        sort = { price: -1, createdAt: -1, _id: -1 };
        break;
      case "name-asc":
        sort = { name: 1, createdAt: -1, _id: -1 };
        break;
      case "name-desc":
        sort = { name: -1, createdAt: -1, _id: -1 };
        break;
      default:
        sort = { createdAt: -1, _id: -1 };
    }

    const docs = await Product.find(query)
      .sort(sort)
      .limit(limit + 1)
      .lean<(IProduct & { _id: Types.ObjectId })[]>();

    const hasNext = docs.length > limit;
    const pageItems = hasNext ? docs.slice(0, -1) : docs;
    const last = pageItems[pageItems.length - 1];
    const next =
      hasNext && last
        ? encodeCursorPayload(docToCursorPayload(last, sortBy))
        : null;

    const response: ProductsDTO = {
      products: pageItems.map(mapProductToCard),
      next,
      searchParams: resolvedSearchParams,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
