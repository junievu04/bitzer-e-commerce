import { Facebook, Mail, Messenger, Zalo } from "@/components/icons";

export const DAITIN_IMAGE =
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/dai-tin-image.jpg";

export const LOGO_IMAGE =
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/logo-1.png";

export const NAV_LINKS: { pathname: string; label: string }[] = [
  { pathname: "/", label: "Trang chủ" },
  { pathname: "/products", label: "Sản phẩm" },
  { pathname: "/services", label: "Dịch vụ" },
  { pathname: "/about", label: "Giới thiệu" },
  { pathname: "/contact", label: "Liên hệ" },
];

export const INFO_LINKS = [
  { label: "Giới thiệu", href: "/about" },
  { label: "Sản phẩm chính hãng", href: "/products" },
  { label: "Liên hệ", href: "/contact" },
  { label: "Dịch vụ sửa chữa", href: "/services" },
];

export const SOCIAL_LINKS = [
  {
    icon: Zalo,
    url: "https://",
    title: "Zalo",
  },
  {
    icon: Messenger,
    url: "https://",
    title: "Messenger",
  },
  {
    icon: Facebook,
    url: "https://facebook.com/YOUR_PAGE",
    title: "Facebook",
  },
  {
    icon: Mail,
    url: "https://",
    title: "Mail",
  },
];

export const INFO_COMPANY = {
  fullName: "CÔNG TY TNHH TM VÀ DV CÔNG NGHỆ ĐIỆN LẠNH ĐẠI TÍN",
  shortName: "ĐẠI TÍN",
  bio: "Điện lạnh Đại Tín",
  address1:
    "Tầng 12 - Tháp A2, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, P. Hoà Hưng, TP. Hồ Chí Minh",
  address2: "8A Hẻm F11, Vĩnh Lộc A, Bình Chánh, TP. Hồ Chí Minh",
  taxCode: "0318617669",
  phone: "0962 884 529",
  email: "bitzerecommerce@gmail.com",
  website: "www.congnghedaitin.com",
  admin: "Ms. Vân (Kinh doanh)",
};
