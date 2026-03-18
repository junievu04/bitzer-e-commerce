"use client";

import { SelectDropdown, SelectOption } from "@/components/select-dropdown";
import Text from "@/components/text";
import type { ProductSortType } from "@/types/api";
import { Flex } from "@/vendors/styled-system/jsx";

const SORT_OPTIONS: SelectOption<ProductSortType>[] = [
  { value: "default", label: "Thứ tự mặc định" },
  { value: "price-asc", label: "Giá: Thấp đến cao" },
  { value: "price-desc", label: "Giá: Cao đến thấp" },
  { value: "name-asc", label: "Tên: A-Z" },
  { value: "name-desc", label: "Tên: Z-A" },
];

interface ProductSortProps {
  sortBy: ProductSortType;
  totalLoaded: number;
  onSortChange: (sort: ProductSortType) => void;
}

export default function ProductSort({
  sortBy,
  totalLoaded,
  onSortChange,
}: ProductSortProps) {
  return (
    <Flex justify="space-between" align="center" flexWrap="wrap" gap="3">
      <Text variant="paragraph-2" tone="secondary">
        Hiển thị {totalLoaded} sản phẩm
      </Text>

      <SelectDropdown
        options={SORT_OPTIONS}
        value={sortBy}
        onChange={onSortChange}
        placeholder="Thứ tự mặc định"
        variant="secondary"
        dropdownPosition="bottom-right"
      />
    </Flex>
  );
}
