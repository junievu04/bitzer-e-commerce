import { Boxes, ClipboardPaper, Gear, ThumbsUp } from "@/components/icons";

const ADMIN_ITEMS = [
  {
    href: "/admin",
    label: "Tổng quan",
    icon: ClipboardPaper,
  },
  {
    href: "/admin/products",
    label: "Sản phẩm",
    icon: Gear,
    quickLink: { label: "Thêm sản phẩm", action: "Quản lý" },
    searchable: true,
  },
  {
    href: "/admin/categories",
    label: "Danh mục",
    icon: Boxes,
    quickLink: { label: "Thêm danh mục", action: "Quản lý" },
    searchable: true,
  },
  {
    href: "/admin/services",
    label: "Dịch vụ",
    icon: ThumbsUp,
    quickLink: { label: "Thêm dịch vụ", action: "Quản lý" },
    searchable: true,
  },
];

// Derive từ ADMIN_ITEMS
export const NAV_ITEMS = ADMIN_ITEMS.map(({ href, label, icon }) => ({
  href,
  label,
  icon,
}));

export const QUICK_LINKS = ADMIN_ITEMS.filter((item) => item.quickLink).map(
  ({ href, icon, quickLink }) => ({ href, icon, ...quickLink }),
);

export const SEARCHABLE = ADMIN_ITEMS.filter((item) => item.searchable).map(
  (item) => item.href,
);
