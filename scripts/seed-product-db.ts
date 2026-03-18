// scripts/seed-db.ts
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import "dotenv/config";

const CATEGORIES = [
  { name: "Máy Nén Bitzer Đức", slug: "may-nen-bitzer-duc" },
  { name: "Máy Nén Trục Vít Bitzer", slug: "may-nen-truc-vit-bitzer" },
  { name: "Máy Nén Hở Bitzer", slug: "may-nen-ho-bitzer" },
  { name: "Máy Nén Xoắn Ốc Bitzer", slug: "may-nen-xoan-oc-bitzer" },
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

const PRODUCTS_BY_CATEGORY: Record<
  string,
  {
    name: string;
    slug: string;
    price: number;
    stock: number;
    brief: string;
    images?: string[];
    description: string;
    specifications: { label: string; value: string }[];
  }[]
> = {
  "may-nen-bitzer-duc": [
    {
      name: "Máy Nén Bitzer 2KC-05.2",
      slug: "may-nen-bitzer-2kc-05-2",
      price: 45000000,
      stock: 5,
      brief:
        "Máy nén pittông 2 xy lanh, công suất nhỏ, phù hợp hệ thống lạnh thương mại.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
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
    },
    {
      name: "Máy Nén Bitzer 4NC-20.2",
      slug: "may-nen-bitzer-4nc-20-2",
      price: 98000000,
      stock: 3,
      brief:
        "Máy nén pittông 4 xy lanh hiệu suất cao, ứng dụng kho lạnh công nghiệp.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
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
    },
    {
      name: "Máy Nén Bitzer 6F-30.2",
      slug: "may-nen-bitzer-6f-30-2",
      price: 145000000,
      stock: 2,
      brief:
        "Máy nén pittông 6 xy lanh, phù hợp cho hệ thống lạnh công suất lớn.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Số xy lanh", value: "6" },
        { label: "Môi chất", value: "R134a / R404A" },
        { label: "Công suất", value: "22 kW" },
        { label: "Xuất xứ", value: "Đức" },
      ],
      images: [
        "https://res.cloudinary.com/dsw4o0hjl/image/upload/product-4.jpg",
      ],
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
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
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
    },
    {
      name: "Máy Nén Trục Vít Bitzer CSH9593-125Y",
      slug: "may-nen-truc-vit-bitzer-csh9593-125y",
      price: 480000000,
      stock: 1,
      brief:
        "Máy nén trục vít công suất lớn, ứng dụng trong công nghiệp chế biến thực phẩm.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
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
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
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
    },
    {
      name: "Máy Nén Hở Bitzer 6HE-28Y",
      slug: "may-nen-ho-bitzer-6he-28y",
      price: 115000000,
      stock: 3,
      brief: "Máy nén hở 6 xy lanh, phù hợp kho lạnh NH3 công nghiệp.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Loại", value: "Máy nén hở" },
        { label: "Số xy lanh", value: "6" },
        { label: "Môi chất", value: "NH3 / R717" },
        { label: "Công suất", value: "20 kW" },
      ],
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
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
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
    },
    {
      name: "Máy Nén Xoắn Ốc Bitzer CSVH12-135Y",
      slug: "may-nen-xoan-oc-bitzer-csvh12-135y",
      price: 380000000,
      stock: 2,
      brief:
        "Máy nén xoắn ốc công suất lớn, hiệu suất COP cao, phù hợp toà nhà thương mại.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Loại", value: "Xoắn ốc (Scroll)" },
        { label: "Môi chất", value: "R410A" },
        { label: "Công suất", value: "135 kW" },
        { label: "Điện áp", value: "380V / 50Hz" },
      ],
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
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Loại", value: "Vỏ bọc ống" },
        { label: "Dung tích", value: "20 lít" },
        { label: "Áp suất làm việc", value: "25 bar" },
        { label: "Môi chất", value: "R22 / R404A" },
      ],
    },
    {
      name: "Bình Tách Dầu Bitzer BOC-15",
      slug: "binh-tach-dau-bitzer-boc-15",
      price: 18500000,
      stock: 8,
      brief:
        "Bình tách dầu hiệu suất cao, bảo vệ hệ thống lạnh khỏi dầu lẫn môi chất.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Loại", value: "Tách dầu" },
        { label: "Dung tích", value: "15 lít" },
        { label: "Kết nối", value: "DN25" },
        { label: "Áp suất", value: "28 bar" },
      ],
    },
    {
      name: "Bình Chứa Gas Bitzer BRC-50",
      slug: "binh-chua-gas-bitzer-brc-50",
      price: 35000000,
      stock: 4,
      brief:
        "Bình chứa môi chất lạnh dung tích lớn, đạt tiêu chuẩn áp lực châu Âu.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Loại", value: "Bình chứa" },
        { label: "Dung tích", value: "50 lít" },
        { label: "Áp suất", value: "30 bar" },
        { label: "Tiêu chuẩn", value: "PED 2014/68/EU" },
      ],
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
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Công suất", value: "20 HP" },
        { label: "Cấp nén", value: "1 cấp" },
        { label: "Môi chất", value: "R22 / R404A" },
        { label: "Điện áp", value: "380V / 3P / 50Hz" },
      ],
    },
    {
      name: "Cụm Máy Nén Bitzer 2 Cấp 40HP",
      slug: "cum-may-nen-bitzer-2-cap-40hp",
      price: 420000000,
      stock: 1,
      brief:
        "Cụm máy nén 2 cấp nén, phù hợp kho lạnh đông nhiệt độ thấp -40°C.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Công suất", value: "40 HP" },
        { label: "Cấp nén", value: "2 cấp" },
        { label: "Môi chất", value: "R404A / R507" },
        { label: "Nhiệt độ bay hơi", value: "-40°C" },
      ],
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
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Số máy nén", value: "4" },
        { label: "Tổng công suất", value: "60 HP" },
        { label: "Môi chất", value: "R404A / R449A" },
        { label: "Điều khiển", value: "Bộ điều khiển CAREL" },
      ],
    },
    {
      name: "Cụm Rack Bitzer 6 Máy Nén",
      slug: "cum-rack-bitzer-6-may-nen",
      price: 950000000,
      stock: 1,
      brief: "Cụm rack 6 máy nén, thiết kế modular, dễ bảo trì và mở rộng.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Số máy nén", value: "6" },
        { label: "Tổng công suất", value: "100 HP" },
        { label: "Môi chất", value: "R410A / R32" },
        { label: "Điều khiển", value: "Bộ điều khiển Danfoss" },
      ],
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
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Kết nối", value: "22mm hàn" },
        { label: "Áp suất", value: "32 bar" },
        { label: "Môi chất", value: "Tất cả môi chất phổ biến" },
      ],
    },
    {
      name: "Lọc Dầu Bitzer OFC-100",
      slug: "loc-dau-bitzer-ofc-100",
      price: 3800000,
      stock: 15,
      brief:
        "Lọc dầu thay thế chính hãng, tương thích nhiều dòng máy nén Bitzer.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Loại", value: "Lọc dầu" },
        { label: "Tương thích", value: "2K, 4N, 4T, 6F series" },
        { label: "Chu kỳ thay", value: "2000 giờ" },
      ],
    },
    {
      name: "Bộ Gioăng Seal Kit Bitzer SK-4N",
      slug: "bo-giong-seal-kit-bitzer-sk-4n",
      price: 1900000,
      stock: 30,
      brief: "Bộ gioăng làm kín chính hãng cho máy nén 4N series.",
      description:
        "Máy Nén Xoắn Ốc Bitzer Orbit + là giải pháp làm lạnh hiệu quả cho các hệ thống lạnh công nghiệp, được trang bị công nghệ nén xoắn ốc tiên tiến. Sản phẩm này mang lại hiệu suất làm lạnh mạnh mẽ, tiết kiệm năng lượng và bảo vệ môi trường nhờ vào việc sử dụng các chất làm lạnh thân thiện như R134a, R404A và NH3. Máy nén dễ bảo dưỡng và có độ bền cao, phù hợp cho các ứng dụng trong ngành thực phẩm, kho lạnh, chế biến hóa chất và nhiều lĩnh vực công nghiệp khác.",
      specifications: [
        { label: "Tương thích", value: "4N series" },
        { label: "Vật liệu", value: "PTFE / NBR" },
        { label: "Bộ gồm", value: "12 chi tiết" },
      ],
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
