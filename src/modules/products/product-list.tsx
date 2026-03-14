"use client";

import Button from "@/components/button";
import { House, MagnifyingGlass } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { Center, Grid, Stack } from "@/vendors/styled-system/jsx";
import ProductCard from "./product-card";
import { Product } from "./types";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { t } = useIntl();

  if (products.length === 0) {
    return (
      <Center py="16">
        <Stack gap="4" align="center">
          <MagnifyingGlass size="lg" tone="secondary" />
          <Text variant="paragraph-1" weight="bold" tone="primary">
            {t("Không tìm thấy sản phẩm")}
          </Text>
          <Text variant="paragraph-2" tone="secondary" textAlign="center">
            {t(
              "Hiện chưa có sản phẩm nào. Hãy quay về trang chủ để khám phá thêm!",
            )}
          </Text>
          <Link href="/">
            <Button variant="secondary" leftIcon={House}>
              {t("Về trang chủ")}
            </Button>
          </Link>
        </Stack>
      </Center>
    );
  }

  return (
    <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
