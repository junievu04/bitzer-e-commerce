"use client";

import { SelectDropdown } from "@/components/select-dropdown";
import Text from "@/components/text";
import { Flex } from "@/vendors/styled-system/jsx";
import { PRODUCT_SORT_OPTIONS } from "./products.constant";
import type { ProductSortType } from "./products.d";

interface Props {
  sortBy: ProductSortType;
  totalLoaded: number;
  onSortChange: (sort: ProductSortType) => void;
}

export default function ProductSort({
  sortBy,
  totalLoaded,
  onSortChange,
}: Props) {
  return (
    <Flex justify="space-between" align="center" flexWrap="wrap" gap="3">
      <Text variant="paragraph-2" tone="secondary">
        Hiển thị {totalLoaded} sản phẩm
      </Text>

      <SelectDropdown
        options={PRODUCT_SORT_OPTIONS}
        value={sortBy}
        onChange={onSortChange}
        placeholder="Thứ tự mặc định"
        variant="secondary"
        dropdownPosition="bottom-right"
      />
    </Flex>
  );
}
