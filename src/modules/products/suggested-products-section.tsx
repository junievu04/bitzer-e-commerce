"use client";

import { Carousel } from "@/components/carousel";
import { ArrowRight } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { Box, HStack, Stack } from "@/vendors/styled-system/jsx";
import { useMemo } from "react";
import ProductCard from "./product-card";
import type { ProductItem } from "./products.d";

interface SuggestedProductsSectionProps {
  products: ProductItem[];
  categorySlug?: string;
}

export default function SuggestedProductsSection({
  products,
  categorySlug,
}: SuggestedProductsSectionProps) {
  const { t } = useIntl();
  const isShowNavigation = useMemo(() => {
    return products.length > 4;
  }, [products]);
  if (products.length === 0) return null;

  return (
    <Box mt="10" px="6">
      <Stack gap="6">
        <HStack justifyContent="space-between" alignItems="center">
          <Stack gap="2">
            <Text
              variant="section-heading-1"
              weight="bold"
              tone="primary"
              textTransform="uppercase"
            >
              {t("Sản phẩm liên quan")}
            </Text>
            <Box w="12" h="3px" bg="brand.500" borderRadius="full" />
          </Stack>

          <Link
            href={`/products?category=${categorySlug ?? "/products"}`}
            tone="link"
            hover="none"
          >
            <HStack gap="1" alignItems="center">
              <Text variant="caption-1" weight="bold" tone="link">
                {t("Xem tất cả")}
              </Text>
              <ArrowRight size="xs" tone="link" />
            </HStack>
          </Link>
        </HStack>

        <Carousel navigation={isShowNavigation} pagination>
          {products.map((product) => (
            <Box key={product.id} p="1">
              <ProductCard key={product.id} product={product} />
            </Box>
          ))}
        </Carousel>
      </Stack>
    </Box>
  );
}
