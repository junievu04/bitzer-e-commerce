// scripts/seed-db.ts
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import "dotenv/config";

const CATEGORIES = [
  { name: "Máy Nén Bitzer Đức", slug: "may-nen-bitzer-duc" },
  { name: "Máy Nén Trục Vít Bitzer", slug: "may-nen-truc-vit-bitzer" },
  { name: "Máy Nén Hở Bitzer", slug: "may-nen-ho-bitzer" },
  { name: "Máy Nén Xoắn Ốc Bitzer", slug: "may-nen-xoan-oc-bitzer" },
  { name: "Gas", slug: "gas" },
  {
    name: "Bình Ngưng – Bình Tách Dầu – Bình Chứa",
    slug: "binh-ngung-tach-dau-chua",
  },
  { name: "Cụm Máy Nén Bitzer", slug: "cum-may-nen-bitzer" },
  { name: "Cụm Rack Bitzer", slug: "cum-rack-bitzer" },
  {
    name: "Phụ Kiện Thay Thế Máy Nén Bitzer",
    slug: "phu-kien-thay-the-may-nen-bitzer",
  },
];

type ProductSeed = {
  name: string;
  slug: string;
  price: number;
  stock: number;
  brief: string;
  images?: string[];
  description: string;
  specifications: { label: string; value: string }[];
  translations: {
    en: {
      name: string;
      brief: string;
      description: string;
      specifications: { label: string; value: string }[];
    };
  };
};

const DESCRIPTION_EN =
  "The Bitzer Orbit+ Scroll Compressor is an efficient cooling solution for industrial refrigeration systems, equipped with advanced scroll compression technology. This product delivers powerful cooling performance, energy savings, and environmental protection through the use of eco-friendly refrigerants such as R134a, R404A, and NH3. Easy to maintain and highly durable, it is suitable for applications in the food industry, cold storage, chemical processing, and many other industrial sectors.";

const DESCRIPTION_VI =
  "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.";

const PRODUCTS_BY_CATEGORY: Record<string, ProductSeed[]> = {
  "may-nen-bitzer-duc": [
    {
      name: "Máy Nén Bitzer 2KC-05.2",
      slug: "may-nen-bitzer-2kc-05-2",
      price: 45000000,
      stock: 5,
      brief:
        "Máy nén pittông 2 xy lanh, công suất nhỏ, phù hợp hệ thống lạnh thương mại.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Số xy lanh", value: "2" },
        { label: "Môi chất", value: "R404A / R507" },
        { label: "Công suất", value: "2.2 kW" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-1.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-2.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
      translations: {
        en: {
          name: "Bitzer 2KC-05.2 Compressor",
          brief:
            "2-cylinder piston compressor, small capacity, suitable for commercial refrigeration systems.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Number of cylinders", value: "2" },
            { label: "Refrigerant", value: "R404A / R507" },
            { label: "Power", value: "2.2 kW" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Máy Nén Bitzer 4NC-20.2",
      slug: "may-nen-bitzer-4nc-20-2",
      price: 98000000,
      stock: 3,
      brief:
        "Máy nén pittông 4 xy lanh hiệu suất cao, ứng dụng kho lạnh công nghiệp.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Số xy lanh", value: "4" },
        { label: "Môi chất", value: "R22 / R404A" },
        { label: "Công suất", value: "15 kW" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
      translations: {
        en: {
          name: "Bitzer 4NC-20.2 Compressor",
          brief:
            "High-performance 4-cylinder piston compressor for industrial cold storage.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Number of cylinders", value: "4" },
            { label: "Refrigerant", value: "R22 / R404A" },
            { label: "Power", value: "15 kW" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
    {
      name: "Máy Nén Bitzer 6F-30.2",
      slug: "may-nen-bitzer-6f-30-2",
      price: 145000000,
      stock: 2,
      brief:
        "Máy nén pittông 6 xy lanh, phù hợp cho hệ thống lạnh công suất lớn.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Số xy lanh", value: "6" },
        { label: "Môi chất", value: "R134a / R404A" },
        { label: "Công suất", value: "22 kW" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
      translations: {
        en: {
          name: "Bitzer 6F-30.2 Compressor",
          brief:
            "6-cylinder piston compressor, suitable for large-capacity refrigeration systems.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Number of cylinders", value: "6" },
            { label: "Refrigerant", value: "R134a / R404A" },
            { label: "Power", value: "22 kW" },
            { label: "Origin", value: "Germany" },
          ],
        },
      },
    },
  ],
  "may-nen-truc-vit-bitzer": [
    {
      name: "Máy Nén Trục Vít Bitzer CSH7553-90Y",
      slug: "may-nen-truc-vit-bitzer-csh7553-90y",
      price: 320000000,
      stock: 2,
      brief:
        "Máy nén trục vít bán kín Bitzer dòng CSH, phù hợp hệ thống điều hòa trung tâm.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Trục vít bán kín" },
        { label: "Môi chất", value: "R134a / R513A" },
        { label: "Công suất", value: "90 kW" },
        { label: "Cấp nén", value: "1 cấp" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
      translations: {
        en: {
          name: "Bitzer CSH7553-90Y Screw Compressor",
          brief:
            "Semi-hermetic screw compressor Bitzer CSH series, suitable for central air conditioning systems.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Semi-hermetic screw" },
            { label: "Refrigerant", value: "R134a / R513A" },
            { label: "Power", value: "90 kW" },
            { label: "Compression stage", value: "Single stage" },
          ],
        },
      },
    },
    {
      name: "Máy Nén Trục Vít Bitzer CSH9593-125Y",
      slug: "may-nen-truc-vit-bitzer-csh9593-125y",
      price: 480000000,
      stock: 1,
      brief:
        "Máy nén trục vít công suất lớn, ứng dụng trong công nghiệp chế biến thực phẩm.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Trục vít bán kín" },
        { label: "Môi chất", value: "R22 / R407C" },
        { label: "Công suất", value: "125 kW" },
        { label: "Cấp nén", value: "1 cấp" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-1.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-2.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
      translations: {
        en: {
          name: "Bitzer CSH9593-125Y Screw Compressor",
          brief:
            "High-capacity screw compressor for food processing industries.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Semi-hermetic screw" },
            { label: "Refrigerant", value: "R22 / R407C" },
            { label: "Power", value: "125 kW" },
            { label: "Compression stage", value: "Single stage" },
          ],
        },
      },
    },
  ],
  "may-nen-ho-bitzer": [
    {
      name: "Máy Nén Hở Bitzer 4TCS-8.2",
      slug: "may-nen-ho-bitzer-4tcs-8-2",
      price: 62000000,
      stock: 4,
      brief:
        "Máy nén hở pittông 4 xy lanh, truyền động đai, lắp đặt linh hoạt.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Máy nén hở" },
        { label: "Số xy lanh", value: "4" },
        { label: "Môi chất", value: "R22 / NH3" },
        { label: "Công suất", value: "6 kW" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-1.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-2.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
      translations: {
        en: {
          name: "Bitzer 4TCS-8.2 Open Compressor",
          brief:
            "4-cylinder open piston compressor, belt drive, flexible installation.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Open compressor" },
            { label: "Number of cylinders", value: "4" },
            { label: "Refrigerant", value: "R22 / NH3" },
            { label: "Power", value: "6 kW" },
          ],
        },
      },
    },
    {
      name: "Máy Nén Hở Bitzer 6HE-28Y",
      slug: "may-nen-ho-bitzer-6he-28y",
      price: 115000000,
      stock: 3,
      brief: "Máy nén hở 6 xy lanh, phù hợp kho lạnh NH3 công nghiệp.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Máy nén hở" },
        { label: "Số xy lanh", value: "6" },
        { label: "Môi chất", value: "NH3 / R717" },
        { label: "Công suất", value: "20 kW" },
      ],
      translations: {
        en: {
          name: "Bitzer 6HE-28Y Open Compressor",
          brief:
            "6-cylinder open compressor, suitable for industrial NH3 cold storage.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Open compressor" },
            { label: "Number of cylinders", value: "6" },
            { label: "Refrigerant", value: "NH3 / R717" },
            { label: "Power", value: "20 kW" },
          ],
        },
      },
    },
  ],
  "may-nen-xoan-oc-bitzer": [
    {
      name: "Máy Nén Xoắn Ốc Bitzer CSVH9-100Y",
      slug: "may-nen-xoan-oc-bitzer-csvh9-100y",
      price: 275000000,
      stock: 3,
      brief:
        "Máy nén xoắn ốc Bitzer dòng Orbit, vận hành êm ái, tiết kiệm điện.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Xoắn ốc (Scroll)" },
        { label: "Môi chất", value: "R410A / R32" },
        { label: "Công suất", value: "100 kW" },
        { label: "Điện áp", value: "380V / 50Hz" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-1.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-2.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
      translations: {
        en: {
          name: "Bitzer CSVH9-100Y Scroll Compressor",
          brief:
            "Bitzer Orbit series scroll compressor, quiet operation, energy saving.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Scroll" },
            { label: "Refrigerant", value: "R410A / R32" },
            { label: "Power", value: "100 kW" },
            { label: "Voltage", value: "380V / 50Hz" },
          ],
        },
      },
    },
    {
      name: "Máy Nén Xoắn Ốc Bitzer CSVH12-135Y",
      slug: "may-nen-xoan-oc-bitzer-csvh12-135y",
      price: 380000000,
      stock: 2,
      brief:
        "Máy nén xoắn ốc công suất lớn, hiệu suất COP cao, phù hợp toà nhà thương mại.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Xoắn ốc (Scroll)" },
        { label: "Môi chất", value: "R410A" },
        { label: "Công suất", value: "135 kW" },
        { label: "Điện áp", value: "380V / 50Hz" },
      ],
      translations: {
        en: {
          name: "Bitzer CSVH12-135Y Scroll Compressor",
          brief:
            "High-capacity scroll compressor, high COP efficiency, suitable for commercial buildings.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Scroll" },
            { label: "Refrigerant", value: "R410A" },
            { label: "Power", value: "135 kW" },
            { label: "Voltage", value: "380V / 50Hz" },
          ],
        },
      },
    },
  ],
  gas: [
    {
      name: "Gas Lạnh R134a Honeywell",
      slug: "gas-lanh-r134a-honeywell",
      price: 1850000,
      stock: 25,
      brief:
        "Gas lạnh R134a chính hãng Honeywell, dùng cho hệ thống lạnh dân dụng và công nghiệp.",
      description:
        "Gas lạnh R134a Honeywell là môi chất lạnh phổ biến, thân thiện với môi trường, không phá hủy tầng ozone. Sản phẩm được sử dụng rộng rãi trong hệ thống điều hòa không khí, tủ lạnh công nghiệp và các thiết bị làm lạnh thương mại. Đảm bảo hiệu suất làm lạnh ổn định, an toàn và tiết kiệm năng lượng.",
      specifications: [
        { label: "Loại gas", value: "R134a" },
        { label: "Thương hiệu", value: "Honeywell" },
        { label: "Trọng lượng", value: "13.6 kg" },
        { label: "Ứng dụng", value: "Điều hòa, kho lạnh, tủ đông" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-1.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-2.jpg",
      ],
      translations: {
        en: {
          name: "Honeywell R134a Refrigerant Gas",
          brief:
            "Genuine Honeywell R134a refrigerant, for residential and industrial cooling systems.",
          description:
            "Honeywell R134a refrigerant is a widely used, environmentally friendly refrigerant that does not deplete the ozone layer. Widely used in air conditioning systems, industrial refrigerators, and commercial cooling equipment. Ensures stable, safe, and energy-efficient cooling performance.",
          specifications: [
            { label: "Gas type", value: "R134a" },
            { label: "Brand", value: "Honeywell" },
            { label: "Weight", value: "13.6 kg" },
            {
              label: "Application",
              value: "Air conditioning, cold storage, freezer",
            },
          ],
        },
      },
    },
    {
      name: "Gas Lạnh R404A Dupont",
      slug: "gas-lanh-r404a-dupont",
      price: 2650000,
      stock: 18,
      brief:
        "Gas lạnh R404A Dupont, chuyên dùng cho kho lạnh và hệ thống đông lạnh công nghiệp.",
      description:
        "Gas lạnh R404A Dupont là môi chất lạnh hỗn hợp HFC, được thiết kế cho các hệ thống lạnh nhiệt độ thấp và trung bình. Sản phẩm mang lại hiệu suất làm lạnh cao, ổn định và phù hợp cho các kho lạnh, dây chuyền cấp đông và bảo quản thực phẩm.",
      specifications: [
        { label: "Loại gas", value: "R404A" },
        { label: "Thương hiệu", value: "Dupont" },
        { label: "Trọng lượng", value: "10.9 kg" },
        { label: "Ứng dụng", value: "Kho lạnh, cấp đông, siêu thị" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-3.jpg",
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
      translations: {
        en: {
          name: "Dupont R404A Refrigerant Gas",
          brief:
            "Dupont R404A refrigerant, designed for cold storage and industrial freezing systems.",
          description:
            "Dupont R404A refrigerant is an HFC mixed refrigerant designed for low and medium temperature refrigeration systems. Delivers high, stable cooling performance suitable for cold storage, blast freezing lines, and food preservation.",
          specifications: [
            { label: "Gas type", value: "R404A" },
            { label: "Brand", value: "Dupont" },
            { label: "Weight", value: "10.9 kg" },
            {
              label: "Application",
              value: "Cold storage, blast freezing, supermarket",
            },
          ],
        },
      },
    },
  ],
  "binh-ngung-tach-dau-chua": [
    {
      name: "Bình Ngưng Tụ Bitzer BC-20",
      slug: "binh-ngung-tu-bitzer-bc-20",
      price: 28000000,
      stock: 6,
      brief:
        "Bình ngưng tụ dạng vỏ bọc ống, dùng cho hệ thống lạnh công suất vừa.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Vỏ bọc ống" },
        { label: "Dung tích", value: "20 lít" },
        { label: "Áp suất làm việc", value: "25 bar" },
        { label: "Môi chất", value: "R22 / R404A" },
      ],
      translations: {
        en: {
          name: "Bitzer BC-20 Condenser",
          brief:
            "Shell-and-tube condenser for medium-capacity refrigeration systems.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Shell and tube" },
            { label: "Volume", value: "20 liters" },
            { label: "Working pressure", value: "25 bar" },
            { label: "Refrigerant", value: "R22 / R404A" },
          ],
        },
      },
    },
    {
      name: "Bình Tách Dầu Bitzer BOC-15",
      slug: "binh-tach-dau-bitzer-boc-15",
      price: 18500000,
      stock: 8,
      brief:
        "Bình tách dầu hiệu suất cao, bảo vệ hệ thống lạnh khỏi dầu lẫn môi chất.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Tách dầu" },
        { label: "Dung tích", value: "15 lít" },
        { label: "Kết nối", value: "DN25" },
        { label: "Áp suất", value: "28 bar" },
      ],
      translations: {
        en: {
          name: "Bitzer BOC-15 Oil Separator",
          brief:
            "High-efficiency oil separator protecting the refrigeration system from oil contamination.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Oil separator" },
            { label: "Volume", value: "15 liters" },
            { label: "Connection", value: "DN25" },
            { label: "Pressure", value: "28 bar" },
          ],
        },
      },
    },
    {
      name: "Bình Chứa Gas Bitzer BRC-50",
      slug: "binh-chua-gas-bitzer-brc-50",
      price: 35000000,
      stock: 4,
      brief:
        "Bình chứa môi chất lạnh dung tích lớn, đạt tiêu chuẩn áp lực châu Âu.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Bình chứa" },
        { label: "Dung tích", value: "50 lít" },
        { label: "Áp suất", value: "30 bar" },
        { label: "Tiêu chuẩn", value: "PED 2014/68/EU" },
      ],
      translations: {
        en: {
          name: "Bitzer BRC-50 Receiver Tank",
          brief:
            "Large-capacity refrigerant receiver tank, compliant with European pressure standards.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Receiver tank" },
            { label: "Volume", value: "50 liters" },
            { label: "Pressure", value: "30 bar" },
            { label: "Standard", value: "PED 2014/68/EU" },
          ],
        },
      },
    },
  ],
  "cum-may-nen-bitzer": [
    {
      name: "Cụm Máy Nén Bitzer 1 Cấp 20HP",
      slug: "cum-may-nen-bitzer-1-cap-20hp",
      price: 185000000,
      stock: 2,
      brief:
        "Cụm máy nén hoàn chỉnh, lắp sẵn trên khung thép, dễ dàng lắp đặt tại công trình.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Công suất", value: "20 HP" },
        { label: "Cấp nén", value: "1 cấp" },
        { label: "Môi chất", value: "R22 / R404A" },
        { label: "Điện áp", value: "380V / 3P / 50Hz" },
      ],
      translations: {
        en: {
          name: "Bitzer Single-Stage 20HP Compressor Unit",
          brief:
            "Complete compressor unit, pre-mounted on steel frame, easy on-site installation.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Power", value: "20 HP" },
            { label: "Compression stage", value: "Single stage" },
            { label: "Refrigerant", value: "R22 / R404A" },
            { label: "Voltage", value: "380V / 3P / 50Hz" },
          ],
        },
      },
    },
    {
      name: "Cụm Máy Nén Bitzer 2 Cấp 40HP",
      slug: "cum-may-nen-bitzer-2-cap-40hp",
      price: 420000000,
      stock: 1,
      brief:
        "Cụm máy nén 2 cấp nén, phù hợp kho lạnh đông nhiệt độ thấp -40°C.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Công suất", value: "40 HP" },
        { label: "Cấp nén", value: "2 cấp" },
        { label: "Môi chất", value: "R404A / R507" },
        { label: "Nhiệt độ bay hơi", value: "-40°C" },
      ],
      translations: {
        en: {
          name: "Bitzer Two-Stage 40HP Compressor Unit",
          brief:
            "Two-stage compressor unit, suitable for deep-freeze cold storage at -40°C.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Power", value: "40 HP" },
            { label: "Compression stage", value: "Two stage" },
            { label: "Refrigerant", value: "R404A / R507" },
            { label: "Evaporation temperature", value: "-40°C" },
          ],
        },
      },
    },
  ],
  "cum-rack-bitzer": [
    {
      name: "Cụm Rack Bitzer 4 Máy Nén",
      slug: "cum-rack-bitzer-4-may-nen",
      price: 680000000,
      stock: 1,
      brief:
        "Cụm rack tích hợp 4 máy nén Bitzer, điều khiển tự động, phù hợp siêu thị.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Số máy nén", value: "4" },
        { label: "Tổng công suất", value: "60 HP" },
        { label: "Môi chất", value: "R404A / R449A" },
        { label: "Điều khiển", value: "Bộ điều khiển CAREL" },
      ],
      translations: {
        en: {
          name: "Bitzer 4-Compressor Rack Unit",
          brief:
            "Rack unit integrating 4 Bitzer compressors, automatic control, suitable for supermarkets.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Number of compressors", value: "4" },
            { label: "Total power", value: "60 HP" },
            { label: "Refrigerant", value: "R404A / R449A" },
            { label: "Controller", value: "CAREL controller" },
          ],
        },
      },
    },
    {
      name: "Cụm Rack Bitzer 6 Máy Nén",
      slug: "cum-rack-bitzer-6-may-nen",
      price: 950000000,
      stock: 1,
      brief: "Cụm rack 6 máy nén, thiết kế modular, dễ bảo trì và mở rộng.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Số máy nén", value: "6" },
        { label: "Tổng công suất", value: "100 HP" },
        { label: "Môi chất", value: "R410A / R32" },
        { label: "Điều khiển", value: "Bộ điều khiển Danfoss" },
      ],
      translations: {
        en: {
          name: "Bitzer 6-Compressor Rack Unit",
          brief:
            "6-compressor rack unit, modular design, easy maintenance and expansion.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Number of compressors", value: "6" },
            { label: "Total power", value: "100 HP" },
            { label: "Refrigerant", value: "R410A / R32" },
            { label: "Controller", value: "Danfoss controller" },
          ],
        },
      },
    },
  ],
  "phu-kien-thay-the-may-nen-bitzer": [
    {
      name: "Van Chặn Dịch Vụ Bitzer SV-22",
      slug: "van-chan-dich-vu-bitzer-sv-22",
      price: 2500000,
      stock: 20,
      brief:
        "Van chặn dịch vụ chính hãng Bitzer, dùng cho đường hút và đẩy máy nén.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Kết nối", value: "22mm hàn" },
        { label: "Áp suất", value: "32 bar" },
        { label: "Môi chất", value: "Tất cả môi chất phổ biến" },
      ],
      translations: {
        en: {
          name: "Bitzer SV-22 Service Valve",
          brief:
            "Genuine Bitzer service valve for suction and discharge lines.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Connection", value: "22mm weld" },
            { label: "Pressure", value: "32 bar" },
            { label: "Refrigerant", value: "All common refrigerants" },
          ],
        },
      },
    },
    {
      name: "Lọc Dầu Bitzer OFC-100",
      slug: "loc-dau-bitzer-ofc-100",
      price: 3800000,
      stock: 15,
      brief:
        "Lọc dầu thay thế chính hãng, tương thích nhiều dòng máy nén Bitzer.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Loại", value: "Lọc dầu" },
        { label: "Tương thích", value: "2K, 4N, 4T, 6F series" },
        { label: "Chu kỳ thay", value: "2000 giờ" },
      ],
      translations: {
        en: {
          name: "Bitzer OFC-100 Oil Filter",
          brief:
            "Genuine replacement oil filter, compatible with multiple Bitzer compressor series.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Type", value: "Oil filter" },
            { label: "Compatible", value: "2K, 4N, 4T, 6F series" },
            { label: "Replacement interval", value: "2000 hours" },
          ],
        },
      },
    },
    {
      name: "Bộ Gioăng Seal Kit Bitzer SK-4N",
      slug: "bo-giong-seal-kit-bitzer-sk-4n",
      price: 1900000,
      stock: 30,
      brief: "Bộ gioăng làm kín chính hãng cho máy nén 4N series.",
      description: DESCRIPTION_VI,
      specifications: [
        { label: "Tương thích", value: "4N series" },
        { label: "Vật liệu", value: "PTFE / NBR" },
        { label: "Bộ gồm", value: "12 chi tiết" },
      ],
      translations: {
        en: {
          name: "Bitzer SK-4N Seal Kit",
          brief: "Genuine sealing gasket kit for 4N series compressors.",
          description: DESCRIPTION_EN,
          specifications: [
            { label: "Compatible", value: "4N series" },
            { label: "Material", value: "PTFE / NBR" },
            { label: "Kit includes", value: "12 parts" },
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

  console.log("\n✅ Seed completed successfully");
}

main()
  .catch((err) => {
    console.error("❌ Seed error:", err);
  })
  .finally(() => {
    process.exit(0);
  });
