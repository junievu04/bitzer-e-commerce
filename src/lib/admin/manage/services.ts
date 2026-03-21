"use server";

import { requireAdmin } from "@/lib/admin/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { ServiceDetail } from "@/types/api";
import { ServiceFormInput } from "@/types/server-actions";
import { buildSlug, parseLines } from "@/utils/helpers/shared-helpers";
import { revalidatePath } from "next/cache";

// Read

export async function getServices(): Promise<ServiceDetail[]> {
  await connectDB();
  const docs = await Service.find({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();

  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    brief: doc.brief,
    thumbnail: doc.thumbnail,
    images: doc.images ?? [],
    description: doc.description ?? [],
    features: doc.features ?? [],
  }));
}

// Create

export async function createService(data: ServiceFormInput) {
  await requireAdmin();
  if (!data.name?.trim())
    return { success: false, error: "Tên dịch vụ không được trống" };
  try {
    await connectDB();
    await Service.create({
      name: data.name.trim(),
      slug: data.slug?.trim() ? buildSlug(data.slug) : buildSlug(data.name),
      brief: data.brief?.trim() ?? "",
      thumbnail: "",
      images: [],
      description: data.description ? parseLines(data.description) : [],
      features: data.features ? parseLines(data.features) : [],
      isActive: true,
    });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (e: unknown) {
    if ((e as { code?: number })?.code === 11000)
      return {
        success: false,
        error: "Slug đã tồn tại, vui lòng đặt slug khác",
      };
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}

// Update

export async function updateService(id: string, data: ServiceFormInput) {
  await requireAdmin();
  if (!data.name?.trim())
    return { success: false, error: "Tên dịch vụ không được trống" };
  try {
    await connectDB();
    const updated = await Service.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name.trim(),
          slug: data.slug?.trim() ? buildSlug(data.slug) : buildSlug(data.name),
          brief: data.brief?.trim() ?? "",
          description: data.description ? parseLines(data.description) : [],
          features: data.features ? parseLines(data.features) : [],
        },
      },
      { new: true },
    ).lean();
    if (!updated) return { success: false, error: "Không tìm thấy dịch vụ" };
    revalidatePath("/admin/services");
    return { success: true };
  } catch (e: unknown) {
    if ((e as { code?: number })?.code === 11000)
      return { success: false, error: "Slug đã tồn tại" };
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}

// Delete

export async function deleteService(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  try {
    await connectDB();

    const deleted = await Service.findByIdAndDelete(id).lean();
    if (!deleted) return { success: false, error: "Không tìm thấy dịch vụ" };

    revalidatePath("/admin/services");
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}
