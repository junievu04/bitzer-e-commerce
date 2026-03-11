"use server";

import { deleteImage, uploadBuffer } from "@/lib/cloudinary";

// ─── Upload product image ─────────────────────────────────────────────────────

export async function uploadProductImageAction(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file || file.size === 0) return { error: "Không có file được chọn" };

  if (file.size > 5 * 1024 * 1024) return { error: "File quá lớn, tối đa 5MB" };

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return { error: "Chỉ chấp nhận JPG, PNG, WebP" };

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadBuffer(buffer, { folder: "bitzer/products" });
    return { success: true, data: result };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return { error: "Upload thất bại, thử lại sau" };
  }
}

// ─── Delete image ─────────────────────────────────────────────────────────────

export async function deleteProductImageAction(publicId: string) {
  try {
    await deleteImage(publicId);
    return { success: true };
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return { error: "Xóa ảnh thất bại" };
  }
}
