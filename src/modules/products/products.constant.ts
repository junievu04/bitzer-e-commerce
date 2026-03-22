import { SelectOption } from "@/components/select-dropdown";
import type { ProductSortType } from "./products.d";

export const PRODUCT_SORT_OPTIONS: SelectOption<ProductSortType>[] = [
  { value: "default", label: "Thứ tự mặc định" },
  { value: "price-asc", label: "Giá: Thấp đến cao" },
  { value: "price-desc", label: "Giá: Cao đến thấp" },
  { value: "name-asc", label: "Tên: A-Z" },
  { value: "name-desc", label: "Tên: Z-A" },
];
