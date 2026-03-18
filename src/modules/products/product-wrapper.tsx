"use client";

import { ProductFilter, ProductList, ProductSort } from "@/modules/products";
import type { CategoryDTO, ProductCard, ProductSortType } from "@/types/api";
import { Flex, Stack } from "@/vendors/styled-system/jsx";
import { HeaderTitleWrapper } from "../layout/components/header-title-wrapper";

interface ProductWrapperProps {
  products: ProductCard[];
  categories: CategoryDTO[];
  categorySlug: string;
  sortBy: ProductSortType;
  searchText: string;
  totalLoaded: number;
  onSortChange: (sort: ProductSortType) => void;
  onCategoryChange: (categorySlug: string) => void;
  onSearch: (text: string) => void;
}

export default function ProductWrapper({
  products,
  categories,
  categorySlug,
  sortBy,
  searchText,
  totalLoaded,
  onSortChange,
  onCategoryChange,
  onSearch,
}: ProductWrapperProps) {
  const breadcrumbItems: {
    label: string;
    href?: string;
    onClick?: () => void;
  }[] = [{ label: "Sản phẩm", href: "/products" }];
  const selectedCategory = categories?.find((c) => c.slug === categorySlug);
  if (selectedCategory) {
    breadcrumbItems.push({ label: selectedCategory.name });
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
          <ProductFilter
            categories={categories}
            categorySlug={categorySlug}
            onCategoryChange={onCategoryChange}
          />
          <ProductSort
            sortBy={sortBy}
            totalLoaded={totalLoaded}
            onSortChange={onSortChange}
          />
        </Flex>

        <ProductList products={products} />
      </Stack>
    </HeaderTitleWrapper>
  );
}
