import { Layout } from "@/models/Layout";
import "dotenv/config";

async function main() {
  const { connectDB } = await import("@/lib/mongodb");
  await connectDB();

  // 4. Layout mẫu (home)
  await Layout.create({
    layoutKey: "about-1",
    name: "Giới thiệu",
    locale: "vi",
    data: {
      type: "content",
      components: [
        {
          tag: "hero-banner-carousel",
          detail: {
            title: "",
            subTitle: "",
            description: "",
            image: "",
            cta: {
              link: "",
              text: "",
            },
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
            cta: {
              link: "",
              text: "",
            },
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
            description: "",
            image:
              "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image.jpg",
            cta: {
              link: "/about",
              text: "Tìm hiểu thêm",
            },
            theme: "brand.700",
            components: [
              {
                contents: [
                  "Mạng lưới ĐẠI TÍN chủ yếu để đây ứng đến tất cả người tiêu dùng khách hàng. Không tin vào hơn 50 trong tiêu chỉ của mạng lưới đó là khách hàng hiện diện ở đây. Dịch vụ của chuyên gia ĐẠI TÍN cung cấp tất cả đa dạng, để kỹ sư đến kỹ thuật. Để đáp ứng những thông tiếp theo từ tay của khách hàng.",
                  "Công ty ĐẠI TÍN là đại lý nhượng quyền duy nhất của tập đoàn Bitzer Đức chuyên cung cấp dịch vụ sửa chữa, bảo dưỡng, phụ tùng và dầu nhớt cho hệ thống lạnh tại Việt Nam.",
                ],
              },
            ],
          },
        },
        {
          tag: "stats-strip",
          detail: {
            title: "",
            subTitle: "",
            description: "",
            image: "",
            cta: {
              link: "",
              text: "",
            },
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
          tag: "about-section",
          detail: {
            title: "ĐẠI TÍN",
            subTitle: "NHÀ CUNG CẤP DỊCH VỤ TOÀN CẦU",
            description: "",
            image:
              "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image-2.jpg",
            cta: {
              link: "/about",
              text: "Tìm hiểu thêm",
            },
            imagePosition: "right",
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
            theme: "gray.800",
            cta: {
              link: "/contact",
              text: "Liên hệ ngay",
              position: "right",
              variant: "default",
            },
            components: [],
          },
        },
        {
          tag: "news-section",
          detail: {
            title: "Tin tức",
            subTitle: "",
            description: "",
            image: "",
            cta: {
              link: "/",
              text: "Xem tất cả",
              position: "right",
            },
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
