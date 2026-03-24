"use server";

import { requireAdmin } from "@/lib/admin/admin-auth";
import { deleteKeysFromLokalise } from "@/lib/lokalise/delete-keys-lokalise";
import { pushKeysToLokalise } from "@/lib/lokalise/push-key-lokalise";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import type { CategoryDTO } from "@/modules/products";
import { buildBaseSlug } from "@/utils/helpers/shared-helpers";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

// Read

export async function getCategories(): Promise<CategoryDTO[]> {
  await connectDB();
  const docs = await Category.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    isActive: doc.isActive,
  }));
}

//Create

export async function createCategory(data: {
  name: string;
  description?: string;
  isActive?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  try {
    await connectDB();
    await Category.create({
      name: data.name.trim(),
      slug: buildBaseSlug(data.name),
      description: data.description?.trim(),
      isActive: true,
    });
    await pushKeysToLokalise([
      { value: data.name },
      { value: data.description },
    ]);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (e: unknown) {
    if ((e as { code?: number })?.code === 11000) {
      return {
        success: false,
        error: "Tên danh mục này đã tồn tại, vui lòng đặt tên khác",
      };
    }
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}

// Delete

export async function deleteCategory(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  try {
    await connectDB();
    if (!Types.ObjectId.isValid(id))
      return { success: false, error: "ID không hợp lệ" };
    const objectId = new Types.ObjectId(id);
    const productCount = await Product.countDocuments({ category: objectId });
    if (productCount > 0) {
      return {
        success: false,
        error: `Không thể xóa: còn ${productCount} sản phẩm thuộc danh mục này.`,
      };
    }
    const deleted = await Category.findByIdAndDelete(objectId);
    if (!deleted) return { success: false, error: "Không tìm thấy danh mục" };
    await deleteKeysFromLokalise([deleted.name, deleted.description]);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}
