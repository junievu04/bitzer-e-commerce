// scripts/seed-product-db.ts
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import "./load-env";
import { seedLayoutsDaiTin } from "./seed-layouts-dai-tin";

const CATEGORIES = [
  { name: "Cụm máy nén Bitzer", slug: "may-nen-piston-bitzer" },
  { name: "Máy nén Trục vít", slug: "may-nen-truc-vit-bitzer" },
  {
    name: "Bình ngưng – Bình tách dầu",
    slug: "binh-ngung-tach-dau-chua-bitzer",
  },
  { name: "Cụm máy nén", slug: "cum-may-nen-bitzer" },
  { name: "Dầu Bitzer", slug: "dau-bitzer" },
];

type Spec = { label: string; value: string };
type Translation = {
  name: string;
  brief: string;
  description: string;
  specifications: Spec[];
};
type ProductSeed = {
  name: string;
  slug: string;
  price: number;
  stock: number;
  brief: string;
  images?: string[];
  description: string;
  specifications: Spec[];
  translations: { en: Translation };
};

const IMG_DAU_MAY_NEN = [
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dau-may-nen-bitzer-bse170.jpg",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dau-may-nen-bitzer-bse32.jpg",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dau-may-nen-bitzer-b100.jpg",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dau-nhot-lanh-bitzer-b320sh.jpg",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dau-nhot-lanh-bitzer-b5-2.jpg",
];

const IMG_MAY_NEN = [
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/may-nen-piston-nua-kin.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/may-nen-piston-nua-kin-2-cap.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/may-nen-piston-dang-ho.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/may-nen-piston-bitzer-4ees-6y.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/may-nen-piston-bitzer-s6f-30-2.jpg",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload//may-nen-piston-dang-ho-van-tai.png",
];

const IMG_MAY_NEN_TRUC_VIT = [
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/may-nen-truc-vit-da-van-ong-dan.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/may-nen-truc-vit-compact.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/may-nen-truc-vit-tru-dai.png",
];

const IMG_BINH_NGUNG = [
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/binh-ngung-tu-giai-nhiet-nuoc-bitzer.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/binh-ngung-tu-giai-nhiet-nuoc-bien-bitzer.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/binh-tach-dau-bitzer.png",
];

const IMG_CUM_MAY_NEN = [
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/cum-may-nen-bien-tan-bitzer-ecolite.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/cum-may-nen-dan-ngung-giai-nhiet-gio-bien-tan-bitzer-ecostar.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/cum-may-nen-dan-ngung-2-cap.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/cum-may-nen-binh-ngung-giai-nhiet-nuoc-bitzer.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/cum-may-nen-dan-ngung-giai-nhiet-gio-bitzer.png",
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/he-thong-kieu-co2.png",
];

const PRODUCTS_BY_CATEGORY: Record<string, ProductSeed[]> = {
  "may-nen-piston-bitzer": [
    {
      name: "Máy nén piston Nửa kín",
      slug: "may-nen-piston-nua-kin",
      price: 4200000,
      stock: 1,
      brief:
        "Máy nén piston nửa kín (semi-hermetic) Bitzer, motor và máy nén trong cùng vỏ kín khí, bảo trì thuận tiện.",
      description:
        "Dòng máy nén piston nửa kín Bitzer kết hợp động cơ điện và khối nén trong thân máy kín khí, giảm rò rỉ môi chất và tiếng ồn so với dạng hở. Phù hợp trạm lạnh thương mại, kho bảo quản và nhà máy chế biến cần độ tin cậy cao.",
      specifications: [
        { label: "Loại", value: "Nửa kín (Semi-hermetic piston)" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Ứng dụng", value: "Lạnh thương mại & công nghiệp" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN[0]],
      translations: {
        en: {
          name: "Semi-hermetic piston compressor",
          brief:
            "Bitzer semi-hermetic piston compressor with motor and compression block in a gas-tight housing.",
          description:
            "Semi-hermetic Bitzer piston compressors integrate the electric motor and compressor in a gas-tight shell, reducing refrigerant leakage and noise compared to open-type designs. Suitable for commercial cold rooms, storage and food processing plants.",
          specifications: [
            { label: "Type", value: "Semi-hermetic piston" },
            { label: "Brand", value: "Bitzer" },
            {
              label: "Application",
              value: "Commercial & industrial refrigeration",
            },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Máy nén piston Nửa kín, 2 cấp",
      slug: "may-nen-piston-nua-kin-2-cap",
      price: 1650000,
      stock: 1,
      brief:
        "Máy nén piston nửa kín hai cấp nén, tối ưu cho nhiệt độ bay hơi thấp và kho đông.",
      description:
        "Máy nén piston nửa kín hai cấp Bitzer tách quá trình nén thành hai giai đoạn, cải thiện hiệu suất khi vận hành nhiệt độ thấp so với máy một cấp. Thích hợp kho đông, cấp đông nhanh và ứng dụng cần áp suất hút – đẩy chênh lệch lớn.",
      specifications: [
        { label: "Loại", value: "Nửa kín, 2 cấp nén" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Ưu điểm", value: "Hiệu suất cao ở nhiệt độ thấp" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN[1]],
      translations: {
        en: {
          name: "Semi-hermetic two-stage piston compressor",
          brief:
            "Two-stage semi-hermetic Bitzer piston compressor for low evaporation temperatures.",
          description:
            "Two-stage semi-hermetic Bitzer piston compressors split compression into low and high stages for better efficiency at low temperatures than single-stage machines. Ideal for freezers, blast freezing and high pressure ratio duty.",
          specifications: [
            { label: "Type", value: "Semi-hermetic, two-stage" },
            { label: "Brand", value: "Bitzer" },
            {
              label: "Highlights",
              value: "High efficiency at low temperature",
            },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Máy nén piston Dạng hở",
      slug: "may-nen-piston-dang-ho",
      price: 5800000,
      stock: 1,
      brief:
        "Máy nén piston dạng hở (open type), trục khuỷu kết nối động cơ ngoài qua đai hoặc khớp nối.",
      description:
        "Dòng máy nén piston dạng hở Bitzer cho phép chọn động cơ điện hoặc động cơ đốt trong phù hợp công suất. Phù hợp hệ thống công nghiệp, amoniac (NH₃) hoặc khi cần bảo trì phớt trục tách biệt với motor.",
      specifications: [
        { label: "Loại", value: "Dạng hở (Open-type piston)" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Truyền động", value: "Đai / Khớp nối" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN[2]],
      translations: {
        en: {
          name: "Open-type piston compressor",
          brief:
            "Open-type Bitzer piston compressor with external motor via belt or coupling.",
          description:
            "Open-type Bitzer piston compressors allow separate motor selection (electric or other). Suited to industrial plants, ammonia systems and applications where shaft seal serviceability is critical.",
          specifications: [
            { label: "Type", value: "Open-type piston" },
            { label: "Brand", value: "Bitzer" },
            { label: "Drive", value: "Belt / Coupling" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "4EES-6Y",
      slug: "may-nen-piston-bitzer-4ees-6y",
      price: 4500000,
      stock: 1,
      brief:
        "Máy nén piston nửa kín 4 xy lanh dòng ECOLINE, hiệu suất cao, tiết kiệm năng lượng.",
      description:
        "Máy nén piston nửa kín Bitzer 4EES-6Y thuộc dòng ECOLINE với thiết kế 4 xy lanh, sản xuất tại Đức theo tiêu chuẩn châu Âu. Tối ưu hóa hiệu suất năng lượng nhờ công nghệ ECOLINE, phù hợp cho hệ thống lạnh thương mại và công nghiệp nhẹ. Motor tích hợp bảo vệ nhiệt, van hút và van đẩy được thiết kế giảm tổn thất áp suất.",
      specifications: [
        { label: "Model", value: "4EES-6Y" },
        { label: "Số xy lanh", value: "4" },
        { label: "Loại", value: "Nửa kín (Semi-hermetic)" },
        { label: "Môi chất", value: "R404A / R507 / R134a" },
        { label: "Công suất điện", value: "4.5 kW" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN[3]],
      translations: {
        en: {
          name: "4EES-6Y",
          brief:
            "4-cylinder ECOLINE semi-hermetic piston compressor, high efficiency, energy saving.",
          description:
            "The Bitzer 4EES-6Y semi-hermetic piston compressor belongs to the ECOLINE series with 4-cylinder design, manufactured in Germany to European standards. Optimized energy efficiency through ECOLINE technology, suitable for commercial and light industrial refrigeration.",
          specifications: [
            { label: "Model", value: "4EES-6Y" },
            { label: "Number of cylinders", value: "4" },
            { label: "Type", value: "Semi-hermetic" },
            { label: "Refrigerant", value: "R404A / R507 / R134a" },
            { label: "Motor power", value: "4.5 kW" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "S6F-30.2",
      slug: "may-nen-piston-bitzer-s6f-30-2",
      price: 1800000,
      stock: 1,
      brief:
        "Máy nén piston nửa kín 2 cấp 6 xy lanh, phù hợp kho lạnh đông nhiệt độ thấp đến -40°C.",
      description:
        "Máy nén piston nửa kín 2 cấp Bitzer S6F-30.2 thiết kế cho ứng dụng nhiệt độ thấp, đạt nhiệt độ bay hơi xuống -40°C. Cấu trúc 2 cấp nén cho hiệu suất cao hơn máy nén 1 cấp khi vận hành nhiệt độ thấp. Thích hợp kho cấp đông, kho bảo quản thịt, hải sản.",
      specifications: [
        { label: "Model", value: "S6F-30.2" },
        { label: "Số xy lanh", value: "6" },
        { label: "Cấp nén", value: "2 cấp" },
        { label: "Loại", value: "Nửa kín (Semi-hermetic)" },
        { label: "Môi chất", value: "R404A / R507 / R22" },
        { label: "Nhiệt độ bay hơi", value: "Đến -40°C" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN[4]],
      translations: {
        en: {
          name: "S6F-30.2",
          brief:
            "6-cylinder two-stage semi-hermetic piston compressor for low-temperature freezing at -40°C.",
          description:
            "The Bitzer S6F-30.2 two-stage semi-hermetic piston compressor is designed for low-temperature applications down to -40°C evaporation. Two-stage compression achieves higher efficiency than single-stage at low temperatures. Suitable for blast freezers and food cold storage.",
          specifications: [
            { label: "Model", value: "S6F-30.2" },
            { label: "Number of cylinders", value: "6" },
            { label: "Compression stage", value: "Two stage" },
            { label: "Type", value: "Semi-hermetic" },
            { label: "Refrigerant", value: "R404A / R507 / R22" },
            { label: "Evaporation temperature", value: "Down to -40°C" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Máy nén Piston dạng hở cho vận tải",
      slug: "may-nen-piston-dang-ho-van-tai",
      price: 7200000,
      stock: 1,
      brief:
        "Máy nén piston dạng hở chuyên dụng cho xe tải lạnh và ứng dụng vận tải thực phẩm.",
      description:
        "Dòng máy nén piston dạng hở cho vận tải Bitzer phù hợp lắp trên phương tiện lạnh động, chịu rung và thay đổi tải khi di chuyển. Kết nối linh hoạt với động cơ nguồn trên xe, dễ bảo trì phớt trục và hệ thống bôi trơn trong điều kiện vận hành di động.",
      specifications: [
        { label: "Loại", value: "Dạng hở – Vận tải" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Ứng dụng", value: "Xe tải lạnh, container lạnh" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN[5]],
      translations: {
        en: {
          name: "Open-type piston compressor for transport",
          brief:
            "Open-type Bitzer piston compressor for refrigerated trucks and mobile cold chain.",
          description:
            "Open-type transport refrigeration compressors suit vehicle mounting, vibration and variable load on the road. Flexible coupling to on-board prime movers with serviceable shaft seals for mobile operation.",
          specifications: [
            { label: "Type", value: "Open type – Transport" },
            { label: "Brand", value: "Bitzer" },
            {
              label: "Application",
              value: "Refrigerated trucks, reefer containers",
            },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
  ],

  "may-nen-truc-vit-bitzer": [
    {
      name: "Máy nén trục vít Bitzer – Thiết kế đa van & đường ống",
      slug: "may-nen-truc-vit-da-van-ong-dan",
      price: 3100000,
      stock: 1,
      brief:
        "Máy nén trục vít công nghiệp Bitzer dạng thấp, nhiều van và đường ống kết nối hai đầu, phù hợp trạm lạnh công suất lớn.",
      description:
        "Thiết kế module với hệ thống van điều tiết và ống dẫn gas bố trí rõ ràng hai phía thân máy, thuận tiện đấu nối vào đường ống hiện trường. Vỏ máy và hộp điện đặc trưng dòng trục vít Bitzer, phù hợp nhà máy chế biến và kho lạnh công nghiệp.",
      specifications: [
        { label: "Loại", value: "Trục vít bán kín" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Đặc điểm", value: "Đa van, nhiều đường ống ngoài" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN_TRUC_VIT[0]],
      translations: {
        en: {
          name: "Bitzer screw compressor – Multi-valve & piping layout",
          brief:
            "Low-profile industrial Bitzer screw compressor with extensive valves and end connections.",
          description:
            "Modular layout with service valves and gas lines on both ends of the block for straightforward field piping. Typical Bitzer screw housing and terminal box, suited to industrial cold stores and food plants.",
          specifications: [
            { label: "Type", value: "Semi-hermetic screw" },
            { label: "Brand", value: "Bitzer" },
            { label: "Highlights", value: "Multi-valve, external piping" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Máy nén trục vít Bitzer – Dòng compact",
      slug: "may-nen-truc-vit-compact",
      price: 2650000,
      stock: 1,
      brief:
        "Máy nén trục vít Bitzer khối gọn, cổng hút/đẩy bố trí phía trước, tối ưu không gian lắp đặt.",
      description:
        "Kiểu dáng compact với thân máy đậm, cửa tròn lớn phía trước và cổng xả phụ bên hông, phù hợp phòng máy hẹp hoặc gắn trên khung cụm. Hiệu suất cao trong thể tích lắp đặt nhỏ, thường dùng cho HVAC thương mại và trạm trung gian.",
      specifications: [
        { label: "Loại", value: "Trục vít bán kín" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Đặc điểm", value: "Khối gọn, cổng trước" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN_TRUC_VIT[1]],
      translations: {
        en: {
          name: "Bitzer screw compressor – Compact series",
          brief:
            "Compact Bitzer screw block with front suction/discharge ports for tight machine rooms.",
          description:
            "Dense package with prominent front porting and side discharge, ideal for skids or confined plant rooms. High capacity per footprint for commercial HVAC and distributed refrigeration.",
          specifications: [
            { label: "Type", value: "Semi-hermetic screw" },
            { label: "Brand", value: "Bitzer" },
            { label: "Highlights", value: "Compact, front ports" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Máy nén trục vít Bitzer – Dạng trụ dài",
      slug: "may-nen-truc-vit-tru-dai",
      price: 2880000,
      stock: 1,
      brief:
        "Máy nén trục vít Bitzer thân trụ dài, đầu tròn một phía, phù hợp hệ thống dòng gas lớn và tuyến ống dài.",
      description:
        "Hình khối trụ dài hơn so với các dòng compact, một đầu bo tròn và cổng kết nối phía đối diện, thuận tiện bố trí trong dàn máy song song hoặc cụm nhiều máy nén. Thích hợp trung tâm lạnh và nhà máy cần mở rộng công suất theo modul.",
      specifications: [
        { label: "Loại", value: "Trục vít bán kín" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Đặc điểm", value: "Thân dài, đầu tròn" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_MAY_NEN_TRUC_VIT[2]],
      translations: {
        en: {
          name: "Bitzer screw compressor – Long-barrel layout",
          brief:
            "Long cylindrical Bitzer screw housing with rounded end cap for large-line systems.",
          description:
            "Extended barrel form vs compact siblings, with rounded head and opposite-end connections, suited to parallel compressor racks and modular plant expansion.",
          specifications: [
            { label: "Type", value: "Semi-hermetic screw" },
            { label: "Brand", value: "Bitzer" },
            { label: "Highlights", value: "Long body, rounded end" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
  ],

  "binh-ngung-tach-dau-chua-bitzer": [
    {
      name: "Bình Ngưng Tụ Giải Nhiệt Nước Bitzer",
      slug: "binh-ngung-tu-giai-nhiet-nuoc-bitzer",
      price: 3200000,
      stock: 1,
      brief:
        "Bình ngưng tụ giải nhiệt bằng nước ngọt Bitzer, dạng bình ngang, trao đổi nhiệt hiệu quả với vòng nước làm mát.",
      description:
        "Bình ngưng tụ giải nhiệt nước Bitzer dùng cho hệ thống có nguồn nước ngọt ổn định (tháp giải nhiệt, bể tuần hoàn). Thân bình ngang, chân đế cố định, nhiều cổng kết nối gas và nước theo tiêu chuẩn áp lực châu Âu. Phù hợp trạm lạnh công nghiệp và thương mại.",
      specifications: [
        { label: "Loại", value: "Ngưng tụ giải nhiệt nước ngọt" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Kiểu lắp", value: "Bình ngang, chân đế" },
        { label: "Tiêu chuẩn", value: "PED (áp lực châu Âu)" },
      ],
      images: [IMG_BINH_NGUNG[0]],
      translations: {
        en: {
          name: "Bitzer water-cooled condenser",
          brief:
            "Fresh-water-cooled Bitzer condenser, horizontal vessel with mounting feet.",
          description:
            "Water-cooled Bitzer condensers for systems with a reliable fresh-water loop (cooling tower or circulation tank). Horizontal shell, fixed feet and multiple refrigerant and water connections to European pressure equipment practice.",
          specifications: [
            { label: "Type", value: "Fresh-water-cooled condenser" },
            { label: "Brand", value: "Bitzer" },
            { label: "Mounting", value: "Horizontal, foot-mounted" },
            { label: "Standard", value: "PED pressure equipment" },
          ],
        },
      },
    },
    {
      name: "Bình Ngưng Tụ Giải Nhiệt Nước Biển Bitzer",
      slug: "binh-ngung-tu-giai-nhiet-nuoc-bien-bitzer",
      price: 3800000,
      stock: 1,
      brief:
        "Bình ngưng tụ giải nhiệt nước biển Bitzer, vật liệu và kết cấu phù hợp môi trường nước mặn.",
      description:
        "Thiết kế cho nguồn nước biển hoặc nước có độ mặn cao, với vật liệu và bề mặt trao đổi nhiệt chịu ăn mòn tốt hơn so với bình ngưng nước ngọt. Thích hợp tàu thủy, nhà máy ven biển và hệ thống dùng nước biển trực tiếp làm môi giải nhiệt.",
      specifications: [
        { label: "Loại", value: "Ngưng tụ giải nhiệt nước biển" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Ứng dụng", value: "Tàu biển, nhà máy ven biển" },
        { label: "Tiêu chuẩn", value: "PED (áp lực châu Âu)" },
      ],
      images: [IMG_BINH_NGUNG[1]],
      translations: {
        en: {
          name: "Bitzer seawater-cooled condenser",
          brief:
            "Seawater-cooled Bitzer condenser for marine and coastal seawater loops.",
          description:
            "Intended for seawater or high-salinity cooling circuits with materials and heat exchange surfaces suited to corrosive media. Common in marine refrigeration, coastal plants and direct seawater cooling applications.",
          specifications: [
            { label: "Type", value: "Seawater-cooled condenser" },
            { label: "Brand", value: "Bitzer" },
            { label: "Application", value: "Marine, coastal industry" },
            { label: "Standard", value: "PED pressure equipment" },
          ],
        },
      },
    },
    {
      name: "Bình Tách Dầu Bitzer",
      slug: "binh-tach-dau-bitzer",
      price: 1450000,
      stock: 1,
      brief:
        "Bình tách dầu Bitzer dạng đứng, tách dầu bôi trơn khỏi môi chất lạnh sau máy nén.",
      description:
        "Bình tách dầu Bitzer dạng thùng đứng, nối vào đường đẩy máy nén để giảm lượng dầu vào dàn lạnh và van tiết lưu. Tăng hiệu suất trao đổi nhiệt và kéo dài tuổi thọ hệ thống. Kết hợp đường hồi dầu về crankcase theo thiết kế hệ thống.",
      specifications: [
        { label: "Loại", value: "Bình tách dầu (Oil separator)" },
        { label: "Hãng", value: "Bitzer" },
        { label: "Kiểu lắp", value: "Đứng" },
        { label: "Tiêu chuẩn", value: "PED (áp lực châu Âu)" },
      ],
      images: [IMG_BINH_NGUNG[2]],
      translations: {
        en: {
          name: "Bitzer oil separator",
          brief:
            "Vertical Bitzer oil separator on the compressor discharge line.",
          description:
            "Vertical Bitzer oil separators reduce oil carry-over into evaporators and expansion devices, improving heat transfer and system life. Oil return to the compressor crankcase is engineered per system design.",
          specifications: [
            { label: "Type", value: "Oil separator" },
            { label: "Brand", value: "Bitzer" },
            { label: "Mounting", value: "Vertical vessel" },
            { label: "Standard", value: "PED pressure equipment" },
          ],
        },
      },
    },
  ],

  "cum-may-nen-bitzer": [
    {
      name: "Cụm Máy Nén Biến Tần Bitzer Ecolite",
      slug: "cum-may-nen-bien-tan-bitzer-ecolite",
      price: 2850000,
      stock: 1,
      brief:
        "Cụm máy nén biến tần Ecolite: máy nén ECOLINE VARISPEED, dàn ngưng giải nhiệt gió quạt EC, vỏ tủ trắng tích hợp quạt lớn.",
      description:
        "Cụm Ecolite là giải pháp cụm sẵn sàng lắp đặt với máy nén piston Bitzer điều chỉnh tốc độ, dàn ngưng giải nhiệt gió và quạt EC tiết kiệm điện. Thiết kế dạng tủ đứng hai mặt quạt – panel ECOLITE, phù hợp siêu thị, kho lạnh thương mại và trạm lạnh vừa.",
      specifications: [
        { label: "Dòng", value: "Ecolite biến tần" },
        { label: "Máy nén", value: "Bitzer ECOLINE + VARISPEED" },
        { label: "Giải nhiệt", value: "Dàn ngưng gió – Quạt EC" },
        { label: "Môi chất", value: "R404A / R449A / R452A" },
        { label: "Điện áp", value: "380V / 3P / 50Hz" },
      ],
      images: [IMG_CUM_MAY_NEN[0]],
      translations: {
        en: {
          name: "Bitzer Ecolite inverter condensing unit",
          brief:
            "Ecolite package: ECOLINE VARISPEED compressor, air-cooled coil and EC fans in a white ECOLITE enclosure.",
          description:
            "Ready-to-install Ecolite packages combine speed-controlled Bitzer ECOLINE compressors with air-cooled condensers and EC fans. Vertical cabinet with dual fans and ECOLITE branding for supermarkets and commercial cold rooms.",
          specifications: [
            { label: "Line", value: "Ecolite inverter" },
            { label: "Compressor", value: "Bitzer ECOLINE + VARISPEED" },
            { label: "Heat rejection", value: "Air-cooled – EC fans" },
            { label: "Refrigerant", value: "R404A / R449A / R452A" },
            { label: "Voltage", value: "380V / 3P / 50Hz" },
          ],
        },
      },
    },
    {
      name: "Cụm Máy Nén Dàn Ngưng Giải Nhiệt Gió Biến Tần Bitzer Ecostar",
      slug: "cum-may-nen-dan-ngung-giai-nhiet-gio-bien-tan-bitzer-ecostar",
      price: 4650000,
      stock: 1,
      brief:
        "Cụm ECOSTAR biến tần: dàn ngưng tối ưu, máy nén ECOLINE VARISPEED, quạt EC – đáp ứng Ecodesign và nhiều môi chất.",
      description:
        "Cụm máy nén dàn ngưng giải nhiệt gió biến tần Bitzer ECOSTAR ứng dụng công nghệ thông minh để vận hành linh hoạt công suất theo tải thực. Hệ gồm cụm ngưng tụ ECOSTAR với bộ trao đổi nhiệt tối ưu, máy nén ECOLINE VARISPEED điều chỉnh tốc độ/tần số, và quạt EC tiết kiệm năng lượng, phù hợp tiêu chí Ecodesign. Vỏ thép mạ kẽm sơn tĩnh điện chống thời tiết; điều khiển thân thiện, tích hợp web server và Modbus RTU; có thể giao tiếp phần mềm BEST BITZER qua Bluetooth/USB. Phụ kiện tiêu biểu: bình tách dầu kèm van một chiều, hệ RI cho ứng dụng khắc nghiệt, van một chiều đường ngưng tụ, cảm biến nhiệt phòng và màn hình hiển thị ngoài.",
      specifications: [
        { label: "Dòng", value: "ECOSTAR biến tần" },
        { label: "Máy nén", value: "ECOLINE VARISPEED" },
        {
          label: "Dàn ngưng",
          value: "Mini-channel, trao đổi nhiệt cao, môi chất charge thấp",
        },
        { label: "Quạt", value: "EC điều tốc, họng hút tròn đầy đủ" },
        {
          label: "Môi chất",
          value: "HFO blends Ecodesign & nhiều môi chất thông dụng",
        },
        { label: "Vỏ máy", value: "Thép mạ kẽm, sơn tĩnh điện" },
        { label: "Kết nối", value: "Web server tích hợp, Modbus RTU" },
        { label: "Phần mềm", value: "BEST BITZER (Bluetooth / USB)" },
      ],
      images: [IMG_CUM_MAY_NEN[1]],
      translations: {
        en: {
          name: "Bitzer ECOSTAR inverter air-cooled condensing unit",
          brief:
            "ECOSTAR inverter package: optimized condenser, ECOLINE VARISPEED compressor, EC fans for Ecodesign-class efficiency.",
          description:
            "Bitzer ECOSTAR inverter air-cooled condensing units combine optimized ECOSTAR heat exchangers, ECOLINE VARISPEED compressors with speed/frequency control, and speed-controlled EC fans for low power use and Ecodesign alignment. Galvanized, powder-coated weather housing; service-friendly access; advanced controller with data logging, integrated web server and Modbus RTU; BEST BITZER connectivity via Bluetooth or USB. Typical accessories include oil separator with check valve, RI refrigerant injection for demanding duty, condensate check valve, room temperature sensor and external display.",
          specifications: [
            { label: "Line", value: "ECOSTAR inverter" },
            { label: "Compressor", value: "ECOLINE VARISPEED" },
            { label: "Condenser", value: "Mini-channel, high UA, low charge" },
            { label: "Fans", value: "Speed-controlled EC, full bell mouths" },
            {
              label: "Refrigerants",
              value: "Ecodesign HFO blends & common gases",
            },
            { label: "Enclosure", value: "Galvanized steel, powder coated" },
            { label: "Connectivity", value: "Web server, Modbus RTU" },
            { label: "Software", value: "BEST BITZER (Bluetooth / USB)" },
          ],
        },
      },
    },
    {
      name: "Cụm máy nén dàn ngưng 2 cấp",
      slug: "cum-may-nen-dan-ngung-2-cap",
      price: 5200000,
      stock: 1,
      brief:
        "Cụm máy nén kèm dàn ngưng hai cấp nén, khung mở màu xanh lá, quạt giải nhiệt gió tích hợp.",
      description:
        "Thiết kế cụm mở trên khung thép với máy nén piston Bitzer màu xanh và quạt dàn ngưng cùng hệ, phục vụ ứng dụng cần hai cấp nén (nhiệt độ bay hơi thấp, áp suất chênh lệch lớn). Phù hợp nhà máy đông lạnh và trạm lạnh công nghiệp có không gian phòng máy rộng.",
      specifications: [
        { label: "Cấu hình", value: "Máy nén + dàn ngưng 2 cấp" },
        { label: "Giải nhiệt", value: "Gió" },
        { label: "Hãng máy nén", value: "Bitzer" },
        { label: "Kiểu lắp", value: "Khung mở (open frame)" },
      ],
      images: [IMG_CUM_MAY_NEN[2]],
      translations: {
        en: {
          name: "Two-stage air-cooled condensing package",
          brief:
            "Open-frame green Bitzer two-stage compressor with integrated air-cooled condenser fan.",
          description:
            "Open skid with Bitzer green piston compressor and matched air-cooled condenser fan for two-stage refrigeration cycles (low evaporation, high pressure ratio). Suited to industrial freezing where plant space allows an open package.",
          specifications: [
            { label: "Layout", value: "Compressor + two-stage condensing" },
            { label: "Heat rejection", value: "Air" },
            { label: "Compressor brand", value: "Bitzer" },
            { label: "Mounting", value: "Open frame" },
          ],
        },
      },
    },
    {
      name: "Cụm Máy Nén Bình Ngưng Giải Nhiệt Nước Bitzer",
      slug: "cum-may-nen-binh-ngung-giai-nhiet-nuoc-bitzer",
      price: 3550000,
      stock: 1,
      brief:
        "Cụm máy nén Bitzer kết hợp bình ngưng giải nhiệt nước nằm ngang, lắp trong phòng máy.",
      description:
        "Cấu hình máy nén gắn trên hoặc liền khối với bình ngưng dạng bình ngang giải nhiệt nước, kết nối tháp giải nhiệt hoặc vòng nước lạnh. Giảm tiếng ồn và nhiệt thải ra môi trường ngoài so với dàn ngưng gió, thích hợp đô thị và nhà máy có sẵn nguồn nước làm mát.",
      specifications: [
        { label: "Giải nhiệt", value: "Nước – Bình ngưng ngang" },
        { label: "Máy nén", value: "Bitzer (piston / trục vít theo cấu hình)" },
        { label: "Ứng dụng", value: "Phòng máy trong nhà" },
        { label: "Điện áp", value: "380V / 3P / 50Hz" },
      ],
      images: [IMG_CUM_MAY_NEN[3]],
      translations: {
        en: {
          name: "Bitzer water-cooled condensing package",
          brief:
            "Bitzer compressor on horizontal water-cooled condenser vessel for indoor plant rooms.",
          description:
            "Compressor integrated with a horizontal water-cooled condenser barrel, fed from a cooling tower or chilled-water loop. Lower outdoor noise and heat rejection than air-cooled packages, ideal for urban sites and plants with water available.",
          specifications: [
            { label: "Cooling", value: "Water – horizontal condenser" },
            {
              label: "Compressor",
              value: "Bitzer (piston or screw per build)",
            },
            { label: "Application", value: "Indoor machine room" },
            { label: "Voltage", value: "380V / 3P / 50Hz" },
          ],
        },
      },
    },
    {
      name: "Cụm Máy Nén Dàn Ngưng Giải Nhiệt Gió Bitzer",
      slug: "cum-may-nen-dan-ngung-giai-nhiet-gio-bitzer",
      price: 2980000,
      stock: 1,
      brief:
        "Cụm máy nén Bitzer giải nhiệt gió: máy nén xanh, quạt lớn và thành phần phụ trợ trên khung đế phẳng.",
      description:
        "Giải pháp cụm một cấp với dàn ngưng giải nhiệt gió, quạt hút/đẩy không khí trực tiếp, bình phụ kiện dạng đứng bên cạnh khối nén. Lắp nhanh tại hiện trường, phù hợp kho lạnh, nhà hàng chuỗi và trạm lạnh không có vòng nước làm mát.",
      specifications: [
        { label: "Giải nhiệt", value: "Gió – Dàn ngưng + quạt" },
        { label: "Máy nén", value: "Bitzer" },
        { label: "Kiểu lắp", value: "Khung đế phẳng" },
        { label: "Điện áp", value: "380V / 3P / 50Hz" },
      ],
      images: [IMG_CUM_MAY_NEN[4]],
      translations: {
        en: {
          name: "Bitzer air-cooled condensing package",
          brief:
            "Air-cooled Bitzer package: green compressor, large fan and vertical auxiliaries on a flat base frame.",
          description:
            "Single-stage air-cooled condensing unit with Bitzer compressor, propeller fan and vertical ancillary vessel on a flat skid. Quick field installation for cold stores and chain kitchens without a water cooling loop.",
          specifications: [
            { label: "Cooling", value: "Air – coil and fan" },
            { label: "Compressor", value: "Bitzer" },
            { label: "Mounting", value: "Flat base frame" },
            { label: "Voltage", value: "380V / 3P / 50Hz" },
          ],
        },
      },
    },
    {
      name: "Hệ thống kiểu CO₂",
      slug: "he-thong-kieu-co2",
      price: 1200000,
      stock: 1,
      brief:
        "Hệ rack CO₂ transcritical / dải áp suất cao, nhiều máy nén Bitzer trên khung đen, đường ống và điều khiển tích hợp.",
      description:
        "Hệ thống dạng rack cho môi chất CO₂ với nhiều máy nén Bitzer, van, đường ống thép không gỉ và tủ điện trên cùng khung. Phù hợp siêu thị xanh, logistics lạnh và nhà máy hướng tới môi chất tự nhiên, cần quản lý tải phức tạp và dự phòng máy nén.",
      specifications: [
        { label: "Môi chất", value: "CO₂ (R-744)" },
        { label: "Cấu hình", value: "Rack đa máy nén" },
        { label: "Máy nén", value: "Bitzer (theo sơ đồ hệ)" },
        { label: "Ứng dụng", value: "Siêu thị, kho lạnh công nghiệp" },
      ],
      images: [IMG_CUM_MAY_NEN[5]],
      translations: {
        en: {
          name: "CO₂ rack system",
          brief:
            "Multi-compressor CO₂ rack with Bitzer compressors, black frame, integrated piping and controls.",
          description:
            "Rack-style CO₂ systems with several Bitzer compressors, valves, stainless piping and electrical panels on a common structure. For natural-refrigerant supermarkets, cold chain logistics and plants needing redundancy and complex load management.",
          specifications: [
            { label: "Refrigerant", value: "CO₂ (R-744)" },
            { label: "Layout", value: "Multi-compressor rack" },
            { label: "Compressors", value: "Bitzer (per system design)" },
            {
              label: "Application",
              value: "Supermarkets, industrial cold storage",
            },
          ],
        },
      },
    },
  ],

  "dau-bitzer": [
    {
      name: "Dầu Máy Nén Bitzer BSE170",
      slug: "dau-may-nen-bitzer-bse170",
      price: 850000,
      stock: 1,
      brief:
        "Dầu tổng hợp Ester POE BSE170, dùng cho máy nén môi chất HFC như R134a, R404A.",
      description:
        "Dầu Bitzer BSE170 là dầu tổng hợp POE (Polyol Ester) phát triển đặc biệt cho máy nén HFC như R134a, R404A, R407C, R410A. Độ nhớt ISO VG 170 phù hợp tải trung bình đến nặng. Hòa tan tốt với HFC, bôi trơn hiệu quả ở nhiệt độ thấp.",
      specifications: [
        { label: "Mã sản phẩm", value: "BSE170" },
        { label: "Loại dầu", value: "Tổng hợp Ester (POE)" },
        { label: "Độ nhớt", value: "ISO VG 170" },
        { label: "Môi chất tương thích", value: "R134a, R404A, R407C, R410A" },
        { label: "Quy cách đóng gói", value: "Chai 1 lít / Can 5 lít" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_DAU_MAY_NEN[0]],
      translations: {
        en: {
          name: "Bitzer BSE170 Synthetic POE Compressor Oil",
          brief:
            "Synthetic POE oil BSE170 for HFC refrigerant compressors R134a, R404A.",
          description:
            "Bitzer BSE170 POE synthetic oil for HFC compressors. ISO VG 170 for medium to heavy duty. Excellent HFC miscibility and low-temperature lubrication.",
          specifications: [
            { label: "Product code", value: "BSE170" },
            { label: "Oil type", value: "Synthetic Ester (POE)" },
            { label: "Viscosity", value: "ISO VG 170" },
            {
              label: "Compatible refrigerants",
              value: "R134a, R404A, R407C, R410A",
            },
            { label: "Packaging", value: "1L bottle / 5L can" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Dầu Máy Nén Bitzer BSE32",
      slug: "dau-may-nen-bitzer-bse32",
      price: 650000,
      stock: 1,
      brief:
        "Dầu tổng hợp POE BSE32 độ nhớt thấp, cho máy nén lạnh nhiệt độ thấp và cấp đông.",
      description:
        "Dầu Bitzer BSE32 là dầu POE độ nhớt thấp ISO VG 32 cho máy nén nhiệt độ bay hơi thấp, đặc biệt hệ thống cấp đông và kho lạnh âm sâu. Điểm đông thấp, độ nhớt ổn định ở nhiệt độ thấp đảm bảo bôi trơn liên tục.",
      specifications: [
        { label: "Mã sản phẩm", value: "BSE32" },
        { label: "Loại dầu", value: "Tổng hợp Ester (POE)" },
        { label: "Độ nhớt", value: "ISO VG 32" },
        { label: "Ứng dụng", value: "Nhiệt độ thấp / Cấp đông" },
        { label: "Môi chất tương thích", value: "R404A, R507, R22" },
        { label: "Quy cách đóng gói", value: "Chai 1 lít / Can 5 lít" },
      ],
      images: [IMG_DAU_MAY_NEN[1]],
      translations: {
        en: {
          name: "Bitzer BSE32 Low-Viscosity POE Compressor Oil",
          brief:
            "Low-viscosity POE oil BSE32 for low-temperature and blast-freeze compressors.",
          description:
            "Bitzer BSE32 ISO VG 32 POE oil for compressors at low evaporation temperatures. Low pour point and stable viscosity for continuous lubrication in deep-freeze systems.",
          specifications: [
            { label: "Product code", value: "BSE32" },
            { label: "Oil type", value: "Synthetic Ester (POE)" },
            { label: "Viscosity", value: "ISO VG 32" },
            { label: "Application", value: "Low temperature / Blast freezing" },
            { label: "Compatible refrigerants", value: "R404A, R507, R22" },
            { label: "Packaging", value: "1L bottle / 5L can" },
          ],
        },
      },
    },
    {
      name: "Dầu Máy Nén Bitzer B100",
      slug: "dau-may-nen-bitzer-b100",
      price: 450000,
      stock: 1,
      brief:
        "Dầu khoáng Naphthenic B100, cho máy nén môi chất CFC/HCFC như R22.",
      description:
        "Dầu Bitzer B100 là dầu khoáng naphthenic ISO VG 100 cho máy nén CFC/HCFC như R22, R12. Hòa tan tốt với R22, điểm đông thấp, chỉ số nhớt ổn định. Phù hợp nhiều dòng máy nén piston và trục vít.",
      specifications: [
        { label: "Mã sản phẩm", value: "B100" },
        { label: "Loại dầu", value: "Dầu khoáng Naphthenic" },
        { label: "Độ nhớt", value: "ISO VG 100" },
        { label: "Môi chất tương thích", value: "R22, R12, R502" },
        { label: "Quy cách đóng gói", value: "Chai 1 lít / Can 5 lít" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [IMG_DAU_MAY_NEN[2]],
      translations: {
        en: {
          name: "Bitzer B100 Naphthenic Mineral Compressor Oil",
          brief:
            "Naphthenic mineral oil B100 for CFC/HCFC refrigerant compressors like R22.",
          description:
            "Bitzer B100 ISO VG 100 naphthenic mineral oil for CFC/HCFC compressors. Good R22 miscibility, low pour point, stable viscosity index.",
          specifications: [
            { label: "Product code", value: "B100" },
            { label: "Oil type", value: "Naphthenic mineral oil" },
            { label: "Viscosity", value: "ISO VG 100" },
            { label: "Compatible refrigerants", value: "R22, R12, R502" },
            { label: "Packaging", value: "1L bottle / 5L can" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Dầu Máy Nén Bitzer B320SH",
      slug: "dau-may-nen-bitzer-b320sh",
      price: 950000,
      stock: 1,
      brief:
        "Dầu khoáng Naphthenic B320SH độ nhớt cao, chuyên dùng máy nén trục vít công suất lớn.",
      description:
        "Dầu Bitzer B320SH là dầu khoáng naphthenic ISO VG 320 cho máy nén trục vít công suất lớn với HCFC. Độ nhớt cao bảo vệ bề mặt bánh vít, giảm mài mòn và kéo dài tuổi thọ. Phù hợp môi trường vận hành nhiệt độ cao.",
      specifications: [
        { label: "Mã sản phẩm", value: "B320SH" },
        { label: "Loại dầu", value: "Dầu khoáng Naphthenic" },
        { label: "Độ nhớt", value: "ISO VG 320" },
        { label: "Ứng dụng", value: "Máy nén trục vít công suất lớn" },
        { label: "Môi chất tương thích", value: "R22, R134a" },
        { label: "Quy cách đóng gói", value: "Can 5 lít / Thùng 20 lít" },
      ],
      images: [IMG_DAU_MAY_NEN[3]],
      translations: {
        en: {
          name: "Bitzer B320SH High-Viscosity Naphthenic Mineral Oil",
          brief:
            "High-viscosity mineral oil B320SH for large screw compressors.",
          description:
            "Bitzer B320SH ISO VG 320 naphthenic mineral oil for large screw compressors with HCFC. High viscosity protects screw surfaces, reduces wear. Suitable for high-temperature environments.",
          specifications: [
            { label: "Product code", value: "B320SH" },
            { label: "Oil type", value: "Naphthenic mineral oil" },
            { label: "Viscosity", value: "ISO VG 320" },
            { label: "Application", value: "Large screw compressors" },
            { label: "Compatible refrigerants", value: "R22, R134a" },
            { label: "Packaging", value: "5L can / 20L drum" },
          ],
        },
      },
    },
    {
      name: "Dầu Máy Nén Bitzer B5.2",
      slug: "dau-may-nen-bitzer-b5-2",
      price: 380000,
      stock: 1,
      brief:
        "Dầu khoáng B5.2 độ nhớt thấp ISO VG 22, điểm đông -50°C, cho máy nén R22 nhiệt độ thấp.",
      description:
        "Dầu Bitzer B5.2 là dầu khoáng naphthenic ISO VG 22 cho máy nén piston R22 nhiệt độ bay hơi rất thấp. Điểm đông -50°C đảm bảo dầu không đông trong hệ thống đông sâu. Thường dùng kết hợp dầu độ nhớt cao hơn theo khuyến nghị Bitzer.",
      specifications: [
        { label: "Mã sản phẩm", value: "B5.2" },
        { label: "Loại dầu", value: "Dầu khoáng Naphthenic" },
        { label: "Độ nhớt", value: "ISO VG 22" },
        { label: "Điểm đông đặc", value: "-50°C" },
        { label: "Môi chất tương thích", value: "R22" },
        { label: "Ứng dụng", value: "Nhiệt độ thấp – Đông sâu" },
      ],
      images: [IMG_DAU_MAY_NEN[4]],
      translations: {
        en: {
          name: "Bitzer B5.2 Low-Viscosity Naphthenic Mineral Oil",
          brief:
            "Low-viscosity mineral oil B5.2 ISO VG 22, pour point -50°C, for R22 low-temperature compressors.",
          description:
            "Bitzer B5.2 ISO VG 22 naphthenic mineral oil for R22 piston compressors at very low evaporation temperatures. -50°C pour point prevents solidification in deep-freeze systems.",
          specifications: [
            { label: "Product code", value: "B5.2" },
            { label: "Oil type", value: "Naphthenic mineral oil" },
            { label: "Viscosity", value: "ISO VG 22" },
            { label: "Pour point", value: "-50°C" },
            { label: "Compatible refrigerants", value: "R22" },
            { label: "Application", value: "Low temperature – Deep freeze" },
          ],
        },
      },
    },
  ],
};

async function main() {
  const { connectDB } = await import("@/lib/mongodb");
  await connectDB();

  await Product.collection.dropIndexes();
  await Category.collection.dropIndexes();
  console.log("🗑️  Dropped all indexes");

  await Product.deleteMany({});
  await Category.deleteMany({});
  console.log("🗑️  Cleared existing data");

  for (const cat of CATEGORIES) {
    const createdCat = await Category.create({
      name: cat.name,
      slug: cat.slug,
      isActive: true,
    });
    console.log(`✅ Category: ${cat.name}`);

    const products = PRODUCTS_BY_CATEGORY[cat.slug] ?? [];
    for (const p of products) {
      await Product.create({
        name: p.name,
        slug: p.slug,
        price: p.price,
        stock: p.stock,
        images: p.images || [],
        description: p.description,
        brief: p.brief,
        specifications: p.specifications,
        category: createdCat._id,
        translations: p.translations,
      });
      console.log(`   └─ Product: ${p.name}`);
    }
  }

  await seedLayoutsDaiTin();
  console.log("✅ Layouts: cleared & re-seeded (home-1, about-1)");

  console.log(
    "\n✅ Seed completed successfully (categories, products, layouts)",
  );
}

main()
  .catch((err) => {
    console.error("❌ Seed error:", err);
  })
  .finally(() => {
    process.exit(0);
  });
