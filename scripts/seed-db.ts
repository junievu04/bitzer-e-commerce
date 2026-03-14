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
    layoutKey: "home-1",
    name: "Trang chủ",
    locale: "vi",
    data: {
      type: "home",
      components: [
        {
          tag: "hero-banner-carousel",
          detail: {
            title: "",
            subTitle: "",
            description: "",
            image: "",
            ctaLink: "",
            components: [
              {
                slides: [
                  {
                    id: "hero-banner-1",
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-1.jpg",
                    ctaLink: "/products",
                  },
                  {
                    id: "hero-banner-2",
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-2.jpg",
                    ctaLink: "/services",
                  },
                  {
                    id: "hero-banner-3",
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-3.jpg",
                    ctaLink: "/contact",
                  },
                ],
              },
            ],
          },
        },
        {
          tag: "intro-cards",
          detail: {
            title: "",
            subTitle: "",
            description: "",
            image: "",
            ctaLink: "",
            components: [
              {
                id: "intro-card-1",
                icon: "Gear",
                title: "Sửa chữa máy nén",
                description:
                  "Các dịch vụ sửa chữa máy nén mà không có sự tốn kém hay thay thế phụ kiện hàng năm. Tiết kiệm chi phí bằng cách thuê thợ sửa chữa tại chỗ, đội ngũ có kinh nghiệm lâu năm.",
                link: "/services",
                accent: false,
              },
              {
                icon: "ShieldTick",
                title: "Phụ tùng chính hãng",
                description:
                  "Tìm kiếm đại lý cung cấp toàn bộ các loại phụ tùng gốc, đảm bảo mang lại dịch vụ và thiết bị an toàn nhất cho khách hàng trên toàn quốc.",
                link: "/products?category=phu-tung-bitzer",
                accent: true,
              },
              {
                icon: "MagnifyingGlass",
                title: "Kiểm tra máy nén",
                description:
                  "Các dịch vụ kiểm tra máy nén mà không cần sự tốn kém, điểm qua cẩn thận trước và sau khi sản xuất, mang lại giá trị cao nhất cho khách hàng.",
                link: "/services",
                accent: false,
              },
            ],
          },
        },
        {
          tag: "about-section",
          detail: {
            title: "Dịch vụ Máy Nén Bitzer",
            subTitle: "Về chúng tôi - ĐẠI TÍN",
            description:
              "Mạng lưới ĐẠI TÍN chủ yếu để đây ứng đến tất cả người tiêu dùng khách hàng. Không tin vào hơn 50 trong tiêu chỉ của mạng lưới đó là khách hàng hiện diện ở đây. Dịch vụ của chuyên gia ĐẠI TÍN cung cấp tất cả đa dạng, để kỹ sư đến kỹ thuật. Để đáp ứng những thông tiếp theo từ tay của khách hàng.",
            image:
              "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image.jpg",
            ctaLink: "/about",
            components: [],
          },
        },
        {
          tag: "stats-strip",
          detail: {
            title: "",
            subTitle: "",
            description: "",
            image: "",
            ctaLink: "",
            components: [
              {
                id: "stats-strip-1",
                type: "increase",
                number: "27",
                label: "Dự án đã hoàn thành",
              },
              {
                id: "stats-strip-2",
                type: "increase",
                number: "15",
                label: "Năm kinh nghiệm tại Việt Nam",
              },
              {
                id: "stats-strip-3",
                type: "increase",
                number: "90",
                label: "Kỹ sư chuyên nghiệp",
              },
            ],
          },
        },
        {
          tag: "global-supplier-section",
          detail: {
            title: "ĐẠI TÍN",
            subTitle: "NHÀ CUNG CẤP DỊCH VỤ TOÀN CẦU",
            description: "",
            image:
              "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image-2.jpg",
            ctaLink: "/about",
            components: [
              {
                bulletPoints: [
                  {
                    id: "global-supplier-bullet-point-1",
                    text: "Thương hiệu BITZER được biên rộng từ chất lượng và chuyên môn, được ứng dụng rộng rãi các dịch vụ. Các mạng lưới điểm và của mạng lưới nhau mạnh.",
                  },
                  {
                    id: "global-supplier-bullet-point-2",
                    text: "Nhóm và ĐẠI TÍN thực hiện các việc liên tổ chức với các phát triển thị trường của máy nén BITZER, cùng như của những nhà sản xuất khác.",
                  },
                  {
                    id: "global-supplier-bullet-point-3",
                    text: "Về vấn đề, Chúng tôi sở hữu cùng mỗi ưu hội của mạng lưới ĐẠI TÍN Competence Centre ở Pháp. Trung tâm này lý do giải và cơ cấu các khách hàng như nhân viên đội nhóm.",
                  },
                ],
              },
            ],
          },
        },
        {
          tag: "cta-banner",
          detail: {
            title: "Liên hệ ngay",
            subTitle: "",
            description: "",
            image: "",
            ctaLink: "/contact",
            components: [],
          },
        },
        {
          tag: "news-section",
          detail: {
            title: "Tin tức",
            subTitle: "Xem tất cả",
            description: "",
            image: "",
            ctaLink: "/",
            components: [
              {
                id: "news-item-1",
                title: "Thành tựu tiêu biểu DPV",
                date: "15/01/2025",
                category: "Tin tức",
                image:
                  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image-2.jpg",
                link: "/",
              },
              {
                id: "news-item-2",
                title: "Các ưu điểm vượt trội của Green Point Việt Nam",
                date: "08/01/2025",
                category: "Dịch vụ",
                image:
                  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image.jpg",
                link: "/",
              },
              {
                id: "news-item-3",
                title:
                  "Sản phẩm Bitzer chính hãng – Lựa chọn của khách hàng thông minh",
                date: "02/01/2025",
                category: "Sản phẩm",
                image:
                  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image-2.jpg",
                link: "/",
              },
            ],
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
