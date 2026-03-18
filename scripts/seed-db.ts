// scripts/seed-db.ts
import { Layout } from "@/models/Layout";
import { Service } from "@/models/Service";
import "dotenv/config";

async function main() {
  const { connectDB } = await import("@/lib/mongodb");
  await connectDB();

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

  // 4. Layout mẫu (home)
  await Layout.create({
    layoutKey: "about-1",
    name: "Giới thiệu",
    locale: "vi",
    data: {
      type: "content",
      components: [
        {
          tag: "themed-banner-grid-overlay",
          detail: {
            title: "DAI TIN GROUP",
            subTitle: "NHÀ CUNG CẤP DỊCH VỤ TOÀN CẦU",
            description: "",
            image: "",
            cta: {},
            components: [],
          },
        },
        {
          tag: "about-section",
          detail: {
            title: "Về chúng tôi - ĐẠI TÍN",
            label: "Giới thiệu",
            subTitle: "",
            description: "",
            image:
              "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image.jpg",
            cta: {},
            imagePosition: "right",
            components: [
              {
                contents: [
                  "Mạng lưới ĐẠI TÍN chủ yếu để đây ứng đến tất cả người tiêu dùng khách hàng. Không tin vào hơn 50 trong tiêu chỉ của mạng lưới đó là khách hàng hiện diện ở đây. Dịch vụ của chuyên gia ĐẠI TÍN cung cấp tất cả đa dạng, để kỹ sư đến kỹ thuật. Để đáp ứng những thông tiếp theo từ tay của khách hàng.",
                  "Với gần 20 năm kinh nghiệm, chúng tôi không ngừng phát triển và chuẩn hóa chất lượng dịch vụ để đáp ứng ngày càng cao yêu cầu của quý khách hàng và khẳng định uy tín và thương hiệu trên thị trường Việt Nam.",
                  "Đội ngũ kỹ sư, kỹ thuật viên của chúng tôi có tay nghề cao, trách nhiệm cao, tận tâm trong công việc, được đào tạo và chuyên giao công nghệ từ tập đoàn Bitzer bởi các chuyên gia kinh nghiệm.",
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
                number: "20",
                label: "Năm kinh nghiệm",
              },
              {
                id: "stats-strip-2",
                type: "increase",
                number: "500",
                label: "Sản phẩm chính hãng",
              },
              {
                id: "stats-strip-3",
                type: "increase",
                number: "90",
                label: "Kỹ sư chuyên nghiệp",
              },
              {
                id: "stats-strip-4",
                type: "increase",
                number: "27",
                label: "Dự án đã hoàn thành",
              },
            ],
          },
        },
        {
          tag: "about-section",
          detail: {
            title: "Lĩnh vực hoạt động",
            label: "Hoạt động",
            subTitle: "",
            description:
              "Công ty TNHH ĐẠI TÍN Vietnam là trung tâm dịch vụ được ủy quyền duy nhất tại Việt Nam cho việc sửa chữa, bảo trì toàn diện máy nén BITZER. Hệ thống ĐẠI TÍN GROUP cung cấp cho khách hàng dịch vụ sửa chữa máy nén với các giá trị cốt lõi sau",
            image:
              "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image-2.jpg",
            cta: {},
            components: [
              {
                bulletPoints: [
                  {
                    id: "genuine-spare-parts",
                    text: "Genuine spare parts: Phụ tùng chính hãng",
                  },
                  {
                    id: "professionalism",
                    text: "Professionalism: Dịch vụ chuyên nghiệp",
                  },
                  {
                    id: "expertise",
                    text: "Expertise: Kỹ thuật chuyên môn đào tạo bởi BITZER",
                  },
                  {
                    id: "environmental-care",
                    text: "Environmental care: Bảo vệ môi trường",
                  },
                ],
              },
            ],
          },
        },
        {
          tag: "dynamic-cards-about-section",
          detail: {
            title: "Về giá trị ĐẠI TÍN",
            subTitle: "",
            label: "Cam kết",
            description: "",
            image: "",
            theme: "",
            cta: {},
            components: [
              {
                id: "grid-values-cards",
                type: "grid",
                numberOfColumns: 2,
                data: [
                  {
                    id: "value-card-1",
                    displayInRow: true,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/yellow-ensure-icon.svg",
                    title: "Chính hãng 100%",
                    description:
                      "Toàn bộ phụ tùng và nhớt chỉ sử dụng hàng chính hãng Bitzer, cam kết chất lượng tuyệt đối.",
                  },
                  {
                    id: "value-card-2",
                    displayInRow: true,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/gray-spanner-icon.svg",
                    title: "Kỹ thuật chuyên sâu",
                    description:
                      "Đội ngũ kỹ sư được đào tạo chuyên môn bởi tập đoàn Bitzer Đức, nắm vững công nghệ tiên tiến.",
                  },
                  {
                    id: "value-card-3",
                    displayInRow: true,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/green-environment-icon.svg",
                    title: "Bảo vệ môi trường",
                    description:
                      "Cam kết sử dụng các giải pháp thân thiện môi trường, hướng tới phát triển bền vững.",
                  },
                  {
                    id: "value-card-4",
                    displayInRow: true,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/orange-stars-hand-icon.svg",
                    title: "Dịch vụ tận tâm",
                    description:
                      "Luôn đặt lợi ích khách hàng lên hàng đầu, hỗ trợ kỹ thuật 24/7 trên toàn quốc.",
                  },
                ],
              },
            ],
          },
        },
        {
          tag: "dynamic-cards-about-section",
          detail: {
            title: "Giấy chứng nhận của ĐẠI TÍN",
            subTitle: "",
            label: "Pháp lý",
            description: "",
            image: "",
            theme: "",
            cta: {},
            components: [
              {
                id: "horizontal-certs-cards",
                type: "horizontal",
                data: [
                  {
                    id: "cert-card-1",
                    displayInRow: false,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/green-paper-icon.svg",
                    title: "Giấy phép kinh doanh",
                  },
                  {
                    id: "cert-card-2",
                    displayInRow: false,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/medal-icon.svg",
                    title: "Chứng nhận đại lý Bitzer",
                  },
                  {
                    id: "cert-card-3",
                    displayInRow: false,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/green-tick-icon.svg",
                    title: "ISO 9001:2015",
                  },
                ],
              },
            ],
          },
        },
        {
          tag: "dynamic-cards-about-section",
          detail: {
            title: "Một số dòng máy nén",
            subTitle: "",
            label: "Sản phẩm",
            description: "",
            image: "",
            theme: "",
            cta: {},
            components: [
              {
                id: "horizontal-carousel-product-cards",
                type: "horizontal-carousel",
                numberOfItems: 3,
                data: [
                  {
                    id: "product-card-1",
                    displayInRow: false,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-1.jpg",
                    title: "Máy nén Scroll",
                    description: "",
                  },
                  {
                    id: "product-card-2",
                    displayInRow: false,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-2.jpg",
                    title: "Máy nén Piston",
                    description: "",
                  },
                  {
                    id: "product-card-3",
                    displayInRow: false,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
                    title: "Máy nén Trục vít",
                    description: "",
                  },
                  {
                    id: "product-card-4",
                    displayInRow: false,
                    image:
                      "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
                    title: "Máy nén Semi-hermetic",
                    description: "",
                  },
                ],
              },
            ],
          },
        },
        {
          tag: "dynamic-cards-about-section",
          detail: {
            title: "Khách hàng tiêu biểu",
            subTitle: "",
            label: "Đối tác",
            description: "",
            image: "",
            theme: "",
            cta: {},
            components: [
              {
                id: "horizontal-clients-cards",
                type: "horizontal",
                data: [
                  {
                    id: "client-card-1",
                    displayInRow: false,
                    title: "Lotte",
                    minWidthCard: 28,
                  },
                  {
                    id: "client-card-2",
                    displayInRow: false,
                    title: "M&M",
                    minWidthCard: 28,
                  },
                  {
                    id: "client-card-3",
                    displayInRow: false,
                    title: "GO!",
                    minWidthCard: 28,
                  },
                  {
                    id: "client-card-4",
                    displayInRow: false,
                    title: "Thai Som Group",
                    minWidthCard: 28,
                  },
                  {
                    id: "client-card-5",
                    displayInRow: false,
                    title: "Vinamilk",
                    minWidthCard: 28,
                  },
                  {
                    id: "client-card-6",
                    displayInRow: false,
                    title: "Kinh Đô",
                    minWidthCard: 28,
                  },
                  {
                    id: "client-card-7",
                    displayInRow: false,
                    title: "Kido",
                    minWidthCard: 28,
                  },
                  {
                    id: "client-card-8",
                    displayInRow: false,
                    title: "CP Group",
                    minWidthCard: 28,
                  },
                ],
              },
            ],
          },
        },
        {
          tag: "cta-banner",
          detail: {
            title: "LIÊN HỆ TƯ VẤN",
            subTitle: "(+84) 975 187 429",
            description: "",
            image: "",
            theme: "linear-gradient(90deg, #15803d, #22c55e)",
            cta: {
              link: "/contact",
              text: "Gửi yêu cầu tư vấn",
              position: "center",
              variant: "default",
            },
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
