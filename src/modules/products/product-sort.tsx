"use client";

import { SelectDropdown, SelectOption } from "@/components/select-dropdown";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { Flex } from "@/vendors/styled-system/jsx";
import { ProductFilterState } from "./types";

interface ProductSortProps {
  filter: ProductFilterState;
  onFilterChange: (filter: ProductFilterState) => void;
  totalItems: number;
  startItem: number;
  endItem: number;
}

const SORT_OPTIONS: SelectOption<ProductFilterState["sortBy"]>[] = [
  { value: "default", label: "Thứ tự mặc định" },
  { value: "price-asc", label: "Giá: Thấp đến cao" },
  { value: "price-desc", label: "Giá: Cao đến thấp" },
  { value: "name-asc", label: "Tên: A-Z" },
  { value: "name-desc", label: "Tên: Z-A" },
];

export function ProductSort({
  filter,
  onFilterChange,
  totalItems,
  startItem,
  endItem,
}: ProductSortProps) {
  const { t } = useIntl();

  const handleSortChange = (value: ProductFilterState["sortBy"]) => {
    onFilterChange({ ...filter, sortBy: value });
  };

  return (
    <Flex justify="space-between" align="center" flexWrap="wrap" gap="3">
      <Text variant="paragraph-2" tone="secondary">
        {t("Hiển thị")} {startItem}-{endItem} {t("của")} {totalItems}{" "}
        {t("kết quả")}
      </Text>

      <SelectDropdown
        options={SORT_OPTIONS}
        value={filter.sortBy}
        onChange={handleSortChange}
        placeholder="Thứ tự mặc định"
        variant="secondary"
        dropdownPosition="bottom-right"
      />
    </Flex>
  );
}
