"use server";

import { requireAdmin } from "@/lib/admin/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import type { ProductDetail } from "@/modules/products";
import type {
  PopulatedCategory,
  PopulatedProductSpecification,
} from "@/types/server-actions";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

// Read

export async function getProducts(): Promise<ProductDetail[]> {
  await connectDB();
  const docs = await Product.find()
    .populate("category", "name slug description isActive")
    .sort({ createdAt: -1 })
    .lean();

  return docs.map((doc) => {
    const cat = doc.category as PopulatedCategory;
    const specifications =
      doc.specifications as PopulatedProductSpecification[];
    return {
      id: String(doc._id),
      name: doc.name,
      slug: doc.slug,
      price: doc.price,
      stock: doc.stock,
      images: doc.images ?? [],
      brief: doc.brief,
      description: doc.description,
      specifications: specifications.map(
        (spec: PopulatedProductSpecification) => ({
          label: spec.label,
          value: spec.value,
        }),
      ),
      category: {
        id: String(cat?._id ?? ""),
        name: cat?.name ?? "",
        slug: cat?.slug ?? "",
        description: cat?.description,
        isActive: cat?.isActive ?? false,
      },
    };
  });
}

// Create

export async function createProduct(data: {
  name: string;
  slug?: string;
  price: number;
  stock: number;
  categoryId: string;
  brief?: string;
  description?: string;
}): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(data.categoryId)) {
      return { success: false, error: "Danh mục không hợp lệ" };
    }
    const category = await Category.findById(data.categoryId).lean();
    if (!category) return { success: false, error: "Không tìm thấy danh mục" };

    const slug = (data.slug?.trim() || data.name)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    await Product.create({
      name: data.name.trim(),
      slug,
      price: data.price,
      stock: data.stock,
      images: [],
      brief: data.brief?.trim(),
      description: data.description?.trim(),
      specifications: [],
      category: new Types.ObjectId(data.categoryId),
    });

    revalidatePath("/admin/products");
    return { success: true };
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
  slug: string,
  data: { price?: number; stock?: number; description?: string },
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  try {
    await connectDB();

    const update: Record<string, unknown> = {};
    if (typeof data.price === "number") update.price = data.price;
    if (typeof data.stock === "number") update.stock = data.stock;
    if (typeof data.description === "string")
      update.description = data.description;

    const updated = await Product.findOneAndUpdate(
      { slug: slug.trim().toLowerCase() },
      { $set: update },
      { new: true },
    ).lean();

    if (!updated) return { success: false, error: "Không tìm thấy sản phẩm" };

    revalidatePath("/admin/products");
    return { success: true };
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
