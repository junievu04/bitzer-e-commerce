"use client";

import { SelectDropdown, SelectOption } from "@/components/select-dropdown";
import { ProductCategory, ProductFilterState } from "./types";

const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "0", name: "Tất cả sản phẩm", slug: "" },
  { id: "1", name: "Máy Nén Bitzer Đức", slug: "may-nen-bitzer-duc" },
  { id: "2", name: "Máy Nén Trục Vít Bitzer", slug: "may-nen-truc-vit-bitzer" },
  { id: "3", name: "Máy Nén Hở Bitzer", slug: "may-nen-ho-bitzer" },
  { id: "4", name: "Máy Nén Xoắn Ốc Bitzer", slug: "may-nen-xoan-oc-bitzer" },
  {
    id: "5",
    name: "Bình Ngưng – Bình Tách Dầu – Bình Chứa",
    slug: "binh-ngung-bitzer",
  },
  { id: "6", name: "Cụm Máy Nén Bitzer", slug: "cum-may-nen-bitzer" },
  { id: "7", name: "Cụm Rack Bitzer", slug: "cum-rack-bitzer" },
  { id: "8", name: "Phụ Kiện Thay Thế", slug: "phu-kien-thay-the" },
];

export { PRODUCT_CATEGORIES };

const CATEGORY_OPTIONS: SelectOption[] = PRODUCT_CATEGORIES.map((cat) => ({
  value: cat.slug,
  label: cat.name,
}));

interface ProductFilterProps {
  filter: ProductFilterState;
  onFilterChange: (filter: ProductFilterState) => void;
}

export function ProductFilter({ filter, onFilterChange }: ProductFilterProps) {
  const handleCategoryChange = (slug: string) => {
    onFilterChange({
      ...filter,
      categorySlug: slug || null,
    });
  };

  return (
    <SelectDropdown
      options={CATEGORY_OPTIONS}
      value={filter.categorySlug || ""}
      onChange={handleCategoryChange}
      placeholder="Danh mục sản phẩm"
    />
  );
}
