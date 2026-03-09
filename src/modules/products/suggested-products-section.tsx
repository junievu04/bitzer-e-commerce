"use client";

import { Carousel } from "@/components/carousel";
import { ArrowRight } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, HStack, Stack } from "@/vendors/styled-system/jsx";
import { ProductCard } from "./product-card";
import { Product } from "./types";

interface SuggestedProductsSectionProps {
  products: Product[];
  categorySlug: string;
}

export function SuggestedProductsSection({
  products,
  categorySlug,
}: SuggestedProductsSectionProps) {
  const { t } = useIntl();

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
              className={css({ textTransform: "uppercase" })}
            >
              {t("Sản phẩm liên quan")}
            </Text>
            <Box w="12" h="3px" bg="brand.500" borderRadius="full" />
          </Stack>

          <Link
            href={`/products?category=${categorySlug}`}
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

        <Carousel navigation pagination>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </Stack>
    </Box>
  );
}
