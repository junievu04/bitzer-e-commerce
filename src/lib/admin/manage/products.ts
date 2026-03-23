"use server";

import { requireAdmin } from "@/lib/admin/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { IProduct, Product } from "@/models/Product";
import type { ProductDetail, ProductSpecification } from "@/modules/products";
import type {
  PopulatedCategory,
  ProductFormInput,
  ProductUpdateInput,
} from "@/types/server-actions";
import {
  buildSlug,
  normalizeText,
  parseLines,
} from "@/utils/helpers/shared-helpers";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapDoc(doc: IProduct): ProductDetail {
  const cat = doc.category as unknown as PopulatedCategory;
  const specifications = (doc.specifications ?? []) as ProductSpecification[];
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    price: doc.price,
    stock: doc.stock,
    images: doc.images ?? [],
    brief: doc.brief,
    description: doc.description,
    specifications: specifications.map((s) => ({
      label: s.label,
      value: s.value,
    })),
    category: {
      id: String(cat?._id ?? ""),
      name: cat?.name ?? "",
      slug: cat?.slug ?? "",
      description: cat?.description,
      isActive: cat?.isActive ?? false,
    },
  };
}

// Pagination type

export interface ProductPage {
  products: ProductDetail[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Read with pagination

export async function getProducts(page = 1, search = ""): Promise<ProductPage> {
  await connectDB();

  const filter: Record<string, unknown> = {};
  if (search.trim()) {
    const normalizedText = normalizeText(search.trim()).replace(/\s+/g, "-");

    filter.$or = [
      { slug: { $regex: new RegExp(normalizedText, "i") } },
      { name: { $regex: new RegExp(search.trim(), "i") } },
    ];
  }

  const [total, docs] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .populate("category", "name slug description isActive")
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
  ]);

  console.log("junie test", total, docs.map(mapDoc));

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    products: docs.map(mapDoc),
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// Create

export async function createProduct(
  data: ProductFormInput,
): Promise<{ success: boolean; data?: ProductDetail; error?: string }> {
  await requireAdmin();

  if (!data.name?.trim())
    return { success: false, error: "Tên sản phẩm không được trống" };
  if (!data.categoryId)
    return { success: false, error: "Vui lòng chọn danh mục" };
  if (typeof data.price !== "number" || data.price < 0)
    return { success: false, error: "Giá không hợp lệ" };

  try {
    await connectDB();

    if (!Types.ObjectId.isValid(data.categoryId)) {
      return { success: false, error: "Danh mục không hợp lệ" };
    }
    const category = await Category.findById(data.categoryId).lean();
    if (!category) return { success: false, error: "Không tìm thấy danh mục" };

    if (!data.name?.trim())
      return { success: false, error: "Tên sản phẩm không được trống" };

    const created = await Product.create({
      name: data.name.trim(),
      slug: buildSlug(data.name),
      price: data.price,
      stock: data.stock ?? 0,
      images: data.images ? parseLines(data.images) : [],
      brief: data.brief?.trim(),
      description: data.description?.trim(),
      specifications: data.specifications,
      category: new Types.ObjectId(data.categoryId),
    });

    // Populate category để mapDoc hoạt động đúng
    const populated = await Product.findById(created._id)
      .populate("category", "name slug description isActive")
      .lean();

    revalidatePath("/admin/products");
    return { success: true, data: mapDoc(populated) };
  } catch (e: unknown) {
    if ((e as { code?: number })?.code === 11000) {
      return {
        success: false,
        error: "Slug đã tồn tại, vui lòng đặt slug khác",
      };
    }
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}

// Update

export async function updateProduct(
  id: string,
  data: ProductUpdateInput,
): Promise<{ success: boolean; data?: ProductDetail; error?: string }> {
  await requireAdmin();
  try {
    await connectDB();

    const update: Record<string, unknown> = {};
    if (typeof data.price === "number") update.price = data.price;
    if (typeof data.stock === "number") update.stock = data.stock;
    if (typeof data.description === "string")
      update.description = data.description;
    if (typeof data.images === "string")
      update.images = data.images ? parseLines(data.images) : [];
    if (data.specifications) update.specifications = data.specifications;

    const updated = await Product.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: update },
      { new: true },
    )
      .populate("category", "name slug description isActive")
      .lean();

    if (!updated) return { success: false, error: "Không tìm thấy sản phẩm" };

    revalidatePath("/admin/products");
    return { success: true, data: mapDoc(updated) };
  } catch (e: unknown) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}

// Delete

export async function deleteProduct(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  try {
    await connectDB();
    const deleted = await Product.findOneAndDelete({
      _id: new Types.ObjectId(id),
    }).lean();
    if (!deleted) return { success: false, error: "Không tìm thấy sản phẩm" };
    revalidatePath("/admin/products");
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}
