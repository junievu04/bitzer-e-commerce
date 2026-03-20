// next.config.ts — thêm vào images.remotePatterns
// để Next.js cho phép load ảnh từ Cloudinary

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
