import { Facebook, Mail, Zalo } from "@/components/icons";

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
    url: "https://zalo.me/0975187429",
    title: "Zalo",
  },
  {
    icon: Facebook,
    url: "https://www.facebook.com/anhvan.truong.77",
    title: "Facebook",
  },
  {
    icon: Mail,
    url: "mailto:bitzerecommerce@gmail.com",
    title: "Mail",
  },
];
