import { Layout } from "@/models/Layout";

const IMG = {
  hero1: "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-1.jpg",
  hero2: "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-2.jpg",
  hero3: "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-3.jpg",
  about1: "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image.jpg",
  about2:
    "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image-2.jpg",
  yellowIcon:
    "https://res.cloudinary.com/dsw4o0hjl/image/upload/yellow-ensure-icon.svg",
  grayIcon:
    "https://res.cloudinary.com/dsw4o0hjl/image/upload/gray-spanner-icon.svg",
  greenEnv:
    "https://res.cloudinary.com/dsw4o0hjl/image/upload/green-environment-icon.svg",
  orangeStars:
    "https://res.cloudinary.com/dsw4o0hjl/image/upload/orange-stars-hand-icon.svg",
  paper:
    "https://res.cloudinary.com/dsw4o0hjl/image/upload/green-paper-icon.svg",
  medal: "https://res.cloudinary.com/dsw4o0hjl/image/upload/medal-icon.svg",
  tick: "https://res.cloudinary.com/dsw4o0hjl/image/upload/green-tick-icon.svg",
  p1: "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-1.jpg",
  p2: "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-2.jpg",
  p3: "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
  p4: "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
};

/** Thống kê khiêm tốn — công ty mới (2024), không nhấn mạnh quy mô nhân sự */
const STATS_STRIP_MODEST = {
  title: "",
  subTitle: "",
  description: "",
  image: "",
  cta: { link: "", text: "" },
  components: [
    {
      id: "stats-strip-1",
      type: "increase",
      number: "2024",
      label: "Năm thành lập",
    },
    {
      id: "stats-strip-2",
      type: "increase",
      number: "5",
      label: "Nhóm hàng & dịch vụ",
    },
    {
      id: "stats-strip-3",
      type: "increase",
      number: "2",
      label: "Năm đồng hành thị trường",
    },
  ],
};

const ABOUT_PARAGRAPHS_HOME = [
  "Công ty TNHH TM & DV Công Nghệ Điện Lạnh Đại Tín thành lập năm 2024, hoạt động trong lĩnh vực điện lạnh công nghiệp và kỹ thuật cơ điện cho công trình: cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà xưởng và công trình dân dụng – công nghiệp.",
  "Kim chỉ nam: «Uy tín – Chất lượng – Hiệu quả lâu dài». Chúng tôi tư vấn giải pháp phù hợp quy mô từng hệ thống, ưu tiên nguồn hàng và thông tin minh bạch.",
  "Mảng kinh doanh gồm: dầu máy nén (tương thích máy nén Bitzer như BSE170, BSE32, B320SH…), máy nén và phụ tùng chính hãng, gas lạnh và vật tư ngành lạnh, thiết bị – vật tư cơ điện thi công, cùng dịch vụ tư vấn kỹ thuật theo nhu cầu.",
];

export async function seedLayoutsDaiTin() {
  await Layout.collection.dropIndexes().catch(() => {});
  await Layout.deleteMany({});

  await Layout.insertMany([
    {
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
              cta: { link: "", text: "" },
              components: [
                {
                  slides: [
                    {
                      id: "hero-banner-1",
                      image: IMG.hero1,
                      ctaLink: "/products",
                    },
                    {
                      id: "hero-banner-2",
                      image: IMG.hero2,
                      ctaLink: "/services",
                    },
                    {
                      id: "hero-banner-3",
                      image: IMG.hero3,
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
              cta: { link: "", text: "" },
              components: [
                {
                  id: "intro-card-1",
                  icon: "Gear",
                  title: "BẢO TRÌ & SỬA CHỮA MÁY NÉN",
                  description:
                    "Hỗ trợ bảo dưỡng định kỳ và xử lý sự cố máy nén Bitzer theo quy trình rõ ràng, báo cáo ngắn gọn sau mỗi lần kiểm tra.",
                  link: "/services",
                  accent: false,
                },
                {
                  icon: "ShieldTick",
                  title: "PHỤ TÙNG & DẦU CHÍNH HÃNG",
                  description:
                    "Cung ứng dầu máy nén (BSE170, BSE32, B320SH…), phụ tùng và vật tư phù hợp tài liệu kỹ thuật từng dòng máy.",
                  link: "/products",
                  accent: true,
                },
                {
                  icon: "MagnifyingGlass",
                  title: "TƯ VẤN HỆ THỐNG",
                  description:
                    "Trao đổi phương án lắp đặt – vận hành phù hợp quy mô kho lạnh và công trình cơ điện của bạn.",
                  link: "/contact",
                  accent: false,
                },
              ],
            },
          },
          {
            tag: "about-section",
            detail: {
              title: "ĐIỆN LẠNH CÔNG NGHIỆP",
              subTitle: "ĐẠI TÍN – GIỚI THIỆU NGẮN",
              description: "",
              image: IMG.about1,
              cta: { link: "/about", text: "Tìm hiểu thêm" },
              theme: "#1a399c",
              components: [{ contents: ABOUT_PARAGRAPHS_HOME }],
            },
          },
          {
            tag: "stats-strip",
            detail: STATS_STRIP_MODEST,
          },
          {
            tag: "about-section",
            detail: {
              title: "ĐỒNG HÀNH CÙNG BITZER",
              subTitle: "THIẾT BỊ & VẬT TƯ",
              description: "",
              image: IMG.about2,
              cta: { link: "/products", text: "Xem sản phẩm" },
              imagePosition: "right",
              components: [
                {
                  bulletPoints: [
                    {
                      id: "bp-1",
                      text: "Cung cấp máy nén, phụ tùng và dầu tương thích các dòng Bitzer thông dụng trên thị trường.",
                    },
                    {
                      id: "bp-2",
                      text: "Gas lạnh, vật tư ngành lạnh và thiết bị cơ điện phục vụ thi công – vận hành.",
                    },
                    {
                      id: "bp-3",
                      text: "Tư vấn lựa chọn vật tư theo hồ sơ công trình; không cam kết quy mô nhân sự hay số liệu ảo.",
                    },
                  ],
                },
              ],
            },
          },
          {
            tag: "cta-banner",
            detail: {
              title: "LIÊN HỆ NGAY",
              subTitle: "",
              description: "",
              image: "",
              theme:
                "linear-gradient(135deg, #0f172a 0%, #2563eb 55%, #60a5fa 100%)",
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
              title: "TIN TỨC",
              subTitle: "",
              description: "",
              image: "",
              cta: { link: "/", text: "Xem tất cả", position: "right" },
              components: [
                {
                  id: "news-item-1",
                  title: "ĐẠI TÍN MỞ RỘNG DANH MỤC VẬT TƯ BITZER",
                  date: "10/03/2026",
                  category: "Tin tức",
                  image: IMG.about2,
                  link: "/",
                },
                {
                  id: "news-item-2",
                  title: "BẢO QUẢN DẦU MÁY NÉN VÀ CHU KỲ THAY THẾ",
                  date: "22/02/2026",
                  category: "Kỹ thuật",
                  image: IMG.about1,
                  link: "/",
                },
                {
                  id: "news-item-3",
                  title: "GAS LẠNH VÀ AN TOÀN VẬN HÀNH KHO ĐÔNG",
                  date: "05/01/2026",
                  category: "Sản phẩm",
                  image: IMG.about2,
                  link: "/",
                },
              ],
            },
          },
        ],
      },
    },
    {
      layoutKey: "about-1",
      name: "Giới thiệu",
      locale: "vi",
      data: {
        type: "content",
        components: [
          {
            tag: "themed-banner-grid-overlay",
            detail: {
              title: "ĐẠI TÍN",
              subTitle: "CÔNG NGHỆ ĐIỆN LẠNH & CƠ ĐIỆN CÔNG TRÌNH",
              description: "",
              image: "",
              cta: {},
              components: [],
            },
          },
          {
            tag: "about-section",
            detail: {
              title: "VỀ CHÚNG TÔI",
              label: "Giới thiệu",
              subTitle: "",
              description: "",
              image: IMG.about1,
              cta: {},
              imagePosition: "right",
              components: [
                {
                  contents: [
                    "Công ty TNHH TM & DV Công Nghệ Điện Lạnh Đại Tín được thành lập năm 2024, tập trung điện lạnh công nghiệp và hạng mục cơ điện cho dự án.",
                    "Chúng tôi cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà máy và công trình xây dựng; luôn ưu tiên tính minh bạch và hiệu quả sử dụng vốn của khách hàng.",
                    "Với nền tảng non trẻ, Đại Tín chọn lộ trình phát triển bền vững: làm đúng phạm vi cam kết, tích lũy kinh nghiệm thực tế qua từng công trình thay vì quảng bá con số ảo.",
                  ],
                },
              ],
            },
          },
          {
            tag: "stats-strip",
            detail: STATS_STRIP_MODEST,
          },
          {
            tag: "about-section",
            detail: {
              title: "Lĩnh vực hoạt động",
              label: "HOẠT ĐỘNG",
              subTitle: "",
              description:
                "Đại Tín phục vụ các nhu cầu cốt lõi trong chuỗi cung ứng lạnh và cơ điện — phù hợp doanh nghiệp vừa và nhỏ, công trình đang triển khai giai đoạn đầu.",
              image: IMG.about2,
              cta: {},
              components: [
                {
                  bulletPoints: [
                    {
                      id: "field-oil",
                      text: "Dầu máy nén (tương thích Bitzer: BSE170, BSE32, B320SH…)",
                    },
                    {
                      id: "field-comp",
                      text: "Máy nén lạnh & phụ tùng chính hãng",
                    },
                    {
                      id: "field-gas",
                      text: "Gas lạnh và vật tư ngành lạnh",
                    },
                    {
                      id: "field-mech",
                      text: "Thiết bị – vật tư cơ điện cho thi công",
                    },
                    {
                      id: "field-consult",
                      text: "Tư vấn kỹ thuật theo từng hệ thống",
                    },
                  ],
                },
              ],
            },
          },
          {
            tag: "dynamic-cards-about-section",
            detail: {
              title: "GIÁ TRỊ CỐT LÕI",
              subTitle: "",
              label: "CAM KẾT HỢP TÁC",
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
                      image: IMG.yellowIcon,
                      title: "CHÍNH HÃNG & NGUỒN GỐC RÕ",
                      description:
                        "Ưu tiên phụ tùng, dầu và vật tư có chứng từ, đúng chủng loại cho từng model máy.",
                    },
                    {
                      id: "value-card-2",
                      displayInRow: true,
                      image: IMG.grayIcon,
                      title: "KỸ THUẬT THỰC TIỄN",
                      description:
                        "Quy trình kiểm tra – báo cáo gọn, phù hợp vận hành thực tế tại kho và nhà máy.",
                    },
                    {
                      id: "value-card-3",
                      displayInRow: true,
                      image: IMG.greenEnv,
                      title: "AN TOÀN & HIỆU QUẢ",
                      description:
                        "Tư vấn vận hành an toàn gas lạnh và điện; hướng tới hiệu quả lâu dài thay vì hình thức.",
                    },
                    {
                      id: "value-card-4",
                      displayInRow: true,
                      image: IMG.orangeStars,
                      title: "ĐỒNG HÀNH TRUNG THỰC",
                      description:
                        "Thông báo phạm vi công việc và chi phí dự kiến; không hứa hẹn quy mô nhân sự hay số dự án không kiểm chứng.",
                    },
                  ],
                },
              ],
            },
          },
          {
            tag: "dynamic-cards-about-section",
            detail: {
              title: "PHÁP LÝ & HỒ SƠ",
              subTitle: "",
              label: "PHÁP LÝ",
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
                      image: IMG.paper,
                      title: "GIẤY PHÉP KINH DOANH",
                    },
                    {
                      id: "cert-card-2",
                      displayInRow: false,
                      image: IMG.medal,
                      title: "HỢP ĐỒNG – CHỨNG TỪ NGUỒN GỐC HÀNG",
                    },
                    {
                      id: "cert-card-3",
                      displayInRow: false,
                      image: IMG.tick,
                      title: "TUÂN THỦ QUY ĐỊNH AN TOÀN LẠNH",
                    },
                  ],
                },
              ],
            },
          },
          {
            tag: "dynamic-cards-about-section",
            detail: {
              title: "MỘT SỐ DÒNG MÁY NÉN",
              subTitle: "",
              label: "SẢN PHẨM",
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
                      image: IMG.p1,
                      title: "MÁY NÉN SCROLL",
                      description: "",
                    },
                    {
                      id: "product-card-2",
                      displayInRow: false,
                      image: IMG.p2,
                      title: "MÁY NÉN PISTON",
                      description: "",
                    },
                    {
                      id: "product-card-3",
                      displayInRow: false,
                      image: IMG.p3,
                      title: "MÁY NÉN TRỤC VÍT",
                      description: "",
                    },
                    {
                      id: "product-card-4",
                      displayInRow: false,
                      image: IMG.p4,
                      title: "MÁY NÉN SEMI-HERMETIC",
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
              title: "PHÂN KHÚC PHỤC VỤ",
              subTitle: "",
              label: "ĐỐI TÁC",
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
                      title: "KHO LẠNH THỰC PHẨM",
                      minWidthCard: 28,
                    },
                    {
                      id: "client-card-2",
                      displayInRow: false,
                      title: "NHÀ MÁY CHẾ BIẾN",
                      minWidthCard: 28,
                    },
                    {
                      id: "client-card-3",
                      displayInRow: false,
                      title: "CÔNG TRÌNH CƠ ĐIỆN",
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
              theme:
                "linear-gradient(135deg, #172554 0%, #1d4ed8 55%, #3b82f6 100%)",
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
    },
  ]);
}

async function main() {
  await import("./load-env");
  const { connectDB } = await import("@/lib/mongodb");
  await connectDB();

  await seedLayoutsDaiTin();
  console.log("✅ Layouts: cleared & re-seeded (home-1, about-1)");
}

main()
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
