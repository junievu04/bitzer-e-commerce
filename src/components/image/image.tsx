"use client";

import { css } from "@/vendors/styled-system/css";
import { Box, BoxProps } from "@/vendors/styled-system/jsx";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { SyntheticEvent, useState } from "react";

// ─── Cloudinary loader ────────────────────────────────────────────────────────

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;

function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // If already a full URL that's not Cloudinary, return as-is
  if (src.startsWith("http") && !src.includes("cloudinary.com")) return src;
  // If it's already a full Cloudinary URL, return as-is
  if (src.startsWith("https://res.cloudinary.com")) return src;

  // Build Cloudinary delivery URL from public_id
  const params = [
    `w_${width}`,
    `q_${quality ?? 75}`,
    "f_auto", // auto format (webp on modern browsers)
    "c_fill", // crop to fill
  ].join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params}/${src}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ImageProps
  extends Omit<NextImageProps, "width" | "height" | "fill" | "loader"> {
  /** Cloudinary public_id hoặc full URL */
  src: string;
  /** Fallback khi ảnh lỗi */
  fallback?: string;
  /** Width của container */
  width?: number | string;
  /** Height của container */
  height?: number | string;
  /** Border radius */
  borderRadius?: string;
  /** objectFit */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** Aspect ratio (e.g. "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Extra Box props cho wrapper */
  wrapperProps?: BoxProps;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Image = ({
  src,
  alt = "",
  fallback = "/images/placeholder.png",
  width,
  height,
  borderRadius = "md",
  objectFit = "cover",
  aspectRatio,
  wrapperProps,
  ...rest
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    setImgSrc(fallback);
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      flexShrink={0}
      borderRadius={borderRadius}
      width={width as string}
      height={height as string}
      className={aspectRatio ? css({ aspectRatio: aspectRatio }) : undefined}
      {...wrapperProps}
    >
      <NextImage
        {...rest}
        src={imgSrc}
        alt={alt}
        fill
        loader={cloudinaryLoader}
        className={css({ objectFit, objectPosition: "center" })}
        onError={handleError}
      />
    </Box>
  );
};

export default Image;
