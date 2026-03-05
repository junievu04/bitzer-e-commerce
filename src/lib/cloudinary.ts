import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// ─── Configuration ────────────────────────────────────────────────────────────

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error(
    "Missing Cloudinary env vars.\n" +
      "Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET",
  );
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true, // always use https
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type CloudinaryUploadResult = {
  publicId: string; // e.g.  "bitzer/products/abc123"
  url: string; // optimized delivery URL
  secureUrl: string; // https URL
  width: number;
  height: number;
  format: string; // "jpg" | "png" | "webp" …
  bytes: number;
};

export type UploadOptions = {
  folder?: string; // default: "bitzer/products"
  publicId?: string; // custom file name (without extension)
  overwrite?: boolean;
  maxWidth?: number; // auto-resize
  maxHeight?: number;
  quality?: number | "auto"; // 1–100 or "auto"
};

// ─── Core helpers ─────────────────────────────────────────────────────────────

/**
 * Upload a file from a Buffer (e.g. parsed from FormData in API route).
 */
export async function uploadBuffer(
  buffer: Buffer,
  options: UploadOptions = {},
): Promise<CloudinaryUploadResult> {
  const {
    folder = "bitzer/products",
    publicId,
    overwrite = true,
    maxWidth = 1200,
    maxHeight = 1200,
    quality = "auto",
  } = options;

  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      folder,
      overwrite,
      resource_type: "image",
      transformation: [
        {
          width: maxWidth,
          height: maxHeight,
          crop: "limit", // shrink only, never enlarge
          quality,
          fetch_format: "auto", // serve webp/avif when browser supports it
        },
      ],
    };

    if (publicId) uploadOptions.public_id = publicId;

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error || !result)
          return reject(error ?? new Error("Upload failed"));
        resolve(mapResult(result));
      },
    );

    stream.end(buffer);
  });
}

/**
 * Upload from a remote URL (e.g. seed data / migration).
 */
export async function uploadFromUrl(
  url: string,
  options: UploadOptions = {},
): Promise<CloudinaryUploadResult> {
  const {
    folder = "bitzer/products",
    publicId,
    overwrite = true,
    quality = "auto",
  } = options;

  const uploadOptions: Record<string, unknown> = {
    folder,
    overwrite,
    resource_type: "image",
    transformation: [{ quality, fetch_format: "auto" }],
  };

  if (publicId) uploadOptions.public_id = publicId;

  const result = await cloudinary.uploader.upload(url, uploadOptions);
  return mapResult(result);
}

/**
 * Delete one image by its public_id.
 */
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

/**
 * Delete multiple images (e.g. when deleting a product).
 */
export async function deleteImages(publicIds: string[]): Promise<void> {
  if (!publicIds.length) return;
  await cloudinary.api.delete_resources(publicIds);
}

// ─── URL transformations (client-safe) ────────────────────────────────────────

/**
 * Build an optimised Cloudinary URL from a stored public_id.
 *
 * Usage:
 *   <img src={getImageUrl(product.images[0], { width: 400 })} />
 */
export function getImageUrl(
  publicId: string,
  opts: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number | "auto";
    format?: "webp" | "avif" | "jpg" | "png" | "auto";
  } = {},
): string {
  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = opts;

  return cloudinary.url(publicId, {
    secure: true,
    width,
    height,
    crop,
    quality,
    fetch_format: format,
  });
}

/**
 * Thumbnail helper — 300×300 square crop.
 */
export const getThumbnail = (publicId: string) =>
  getImageUrl(publicId, { width: 300, height: 300, crop: "fill" });

// ─── Internal mapper ─────────────────────────────────────────────────────────

function mapResult(r: UploadApiResponse): CloudinaryUploadResult {
  return {
    publicId: r.public_id,
    url: r.url,
    secureUrl: r.secure_url,
    width: r.width,
    height: r.height,
    format: r.format,
    bytes: r.bytes,
  };
}

export { cloudinary };
