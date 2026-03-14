"use client";

import { useIntl } from "@/utils/intl";
import { Flex, Stack } from "@/vendors/styled-system/jsx";
import { HeaderTitleWrapper } from "../layout/components/header-title-wrapper";
import ProductFilter from "./product-filter";
import ProductList from "./product-list";
import ProductPagination from "./product-pagination";
import ProductSort from "./product-sort";
import { PaginationState, Product, ProductFilterState } from "./types";

interface ProductWrapperProps {
  products: Product[];
  filter: ProductFilterState;
  pagination: PaginationState;
  onFilterChange: (filter: ProductFilterState) => void;
  onPageChange: (page: number) => void;
  categoryTitle?: string;
  categorySlug?: string | null;
}

export default function ProductWrapper({
  products,
  filter,
  pagination,
  onFilterChange,
  onPageChange,
  categoryTitle,
  categorySlug,
}: ProductWrapperProps) {
  const { t } = useIntl();

  const startItem =
    pagination.totalItems === 0
      ? 0
      : (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems,
  );

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: t("Sản phẩm"), href: "/products" },
  ];

  if (categoryTitle && categoryTitle !== t("Tất cả sản phẩm")) {
    breadcrumbItems.push({
      label: categoryTitle,
      href: `/products?category=${categorySlug}`,
    });
  }

  return (
    <HeaderTitleWrapper breadcrumbItems={breadcrumbItems}>
      <Stack gap="4">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          gap="4"
          p="4"
          bg="white"
          borderRadius="lg"
          boxShadow="0 2px 8px token(colors.gray.900/0.06)"
        >
          <ProductFilter filter={filter} onFilterChange={onFilterChange} />

          <ProductSort
            filter={filter}
            onFilterChange={onFilterChange}
            totalItems={pagination.totalItems}
            startItem={startItem}
            endItem={endItem}
          />
        </Flex>

        <ProductList products={products} />

        <ProductPagination
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </Stack>
    </HeaderTitleWrapper>
  );
}
