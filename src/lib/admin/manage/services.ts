"use server";

import { requireAdmin } from "@/lib/admin/admin-auth";
import { deleteKeysFromLokalise } from "@/lib/lokalise/delete-keys-lokalise";
import { pushKeysToLokalise } from "@/lib/lokalise/push-key-lokalise";
import { connectDB } from "@/lib/mongodb";
import { IService, Service } from "@/models/Service";
import type { ServiceDetail } from "@/modules/services";
import { ServiceFormInput } from "@/types/server-actions";
import { buildSlug, parseLines } from "@/utils/helpers/shared-helpers";
import { revalidatePath } from "next/cache";

function mapDoc(doc: IService): ServiceDetail {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    brief: doc.brief,
    thumbnail: doc.thumbnail,
    images: doc.images ?? [],
    description: doc.description ?? [],
    features: doc.features ?? [],
  };
}

// Read

export async function getServices(): Promise<ServiceDetail[]> {
  await connectDB();
  const docs = await Service.find({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();
  return docs.map(mapDoc);
}

// Create

export async function createService(
  data: ServiceFormInput,
): Promise<{ success: boolean; data?: ServiceDetail; error?: string }> {
  await requireAdmin();
  if (!data.name?.trim())
    return { success: false, error: "Tên dịch vụ không được trống" };
  try {
    await connectDB();
    const created = await Service.create({
      name: data.name.trim(),
      slug: buildSlug(data.name),
      brief: data.brief?.trim() ?? "",
      thumbnail: data.thumbnail?.trim() ?? "",
      images: data.images ? parseLines(data.images) : [],
      description: data.description ? parseLines(data.description) : [],
      features: data.features ? parseLines(data.features) : [],
      isActive: true,
    });
    await pushKeysToLokalise([
      { value: data.name },
      { value: data.brief },
      { value: created.description },
      { value: created.features },
    ]);
    revalidatePath("/admin/services");
    return { success: true, data: mapDoc(created.toObject()) };
  } catch (e: unknown) {
    if ((e as { code?: number })?.code === 11000)
      return { success: false, error: "Slug đã tồn tại, vui lòng thử lại" };
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}

// Update

export async function updateService(
  id: string,
  data: ServiceFormInput,
): Promise<{ success: boolean; data?: ServiceDetail; error?: string }> {
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
          slug: buildSlug(data.name),
          brief: data.brief?.trim() ?? "",
          thumbnail: data.thumbnail?.trim() ?? "",
          images: data.images ? parseLines(data.images) : [],
          description: data.description ? parseLines(data.description) : [],
          features: data.features ? parseLines(data.features) : [],
        },
      },
      { new: true },
    ).lean();
    await pushKeysToLokalise([
      { value: data.name },
      { value: data.brief },
      { value: updated.description },
      { value: updated.features },
    ]);
    if (!updated) return { success: false, error: "Không tìm thấy dịch vụ" };
    revalidatePath("/admin/services");
    return { success: true, data: mapDoc(updated) };
  } catch (e: unknown) {
    if ((e as { code?: number })?.code === 11000)
      return { success: false, error: "Slug đã tồn tại, vui lòng thử lại" };
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
    await deleteKeysFromLokalise([
      deleted.name,
      deleted.brief,
      deleted.description,
      deleted.features,
    ]);
    revalidatePath("/admin/services");
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Lỗi không xác định",
    };
  }
}
