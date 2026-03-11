// scripts/seed-db.ts
import { Category } from "@/models/Category";
import { Layout } from "@/models/Layout";
import { Product } from "@/models/Product";
import { Service } from "@/models/Service";
import "dotenv/config";

async function main() {
  const { connectDB } = await import("@/lib/mongodb");
  await connectDB();

  // 1. Category mẫu
  const category = await Category.create({
    name: { vi: "Máy nén Bitzer", en: "Bitzer Compressors" },
    slug: "may-nen-bitzer",
    description: {
      vi: "Danh mục máy nén Bitzer",
      en: "Bitzer compressor category",
    },
    isActive: true,
  });

  // 2. Product mẫu
  await Product.create({
    name: { vi: "Máy nén mẫu", en: "Sample compressor" },
    code: "DEMO-001",
    slug: "may-nen-mau",
    price: 1000000,
    stock: 5,
    images: [],
    description: { vi: "Mô tả demo", en: "Demo description" },
    specs: { cong_suat: "5HP" },
    category: category._id,
    tags: ["demo"],
    isActive: true,
  });

  // 3. Service mẫu
  await Service.create({
    name: { vi: "Bảo trì máy nén", en: "Compressor maintenance" },
    slug: "bao-tri-may-nen",
    summary: {
      vi: "Dịch vụ bảo trì cơ bản",
      en: "Basic maintenance service",
    },
    description: {
      vi: "Chi tiết dịch vụ bảo trì...",
      en: "Service details...",
    },
    images: [],
    isActive: true,
  });

  // 4. Layout mẫu (home)
  await Layout.create({
    key: "home",
    locale: "vi",
    data: {
      type: "home",
      components: [
        {
          type: "hero-banner-carousel",
          detail: {
            title: "Trang chủ Bitzer",
            description: "Giới thiệu sản phẩm & dịch vụ",
            image: "",
            ctaLink: "/products",
            components: [],
          },
        },
      ],
    },
  });

  console.log("✅ Seeded Category, Product, Service, Layout");
}

main()
  .catch((err) => {
    console.error("❌ Seed error:", err);
  })
  .finally(() => {
    process.exit(0);
  });
