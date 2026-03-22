"use client";

import Button from "@/components/button";
import { Cart } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import { DAITIN_IMAGE } from "@/constants";
import { useCart } from "@/hooks";
import { formatPrice } from "@/utils/helpers/shared-helpers";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, Stack } from "@/vendors/styled-system/jsx";
import { useMemo } from "react";
import type { ProductItem } from "./products";

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useIntl();
  const { addToCart } = useCart();

  const productUrl = `/products/${product.slug || product.id}`;
  const isOutOfStock = useMemo(
    () => !product.stock || product.stock <= 0,
    [product.stock],
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      href={productUrl}
      hover="none"
      display="block"
      textDecoration="none"
      maxW={{ base: "100%", md: "360px" }}
    >
      <Box
        bg="white"
        borderRadius="lg"
        overflow="hidden"
        border="1px solid {colors.gray.200}"
        transition="all 0.25s ease"
        h="full"
        _hover={{
          boxShadow: "0 8px 24px token(colors.gray.900/0.12)",
          transform: "translateY(-2px)",
          borderColor: "brand.300",
        }}
      >
        <Image
          src={product.images?.[0] || DAITIN_IMAGE}
          alt={product.name}
          aspectRatio="1/1"
          width="100%"
          objectFit="cover"
          borderRadius="0"
          fallback={DAITIN_IMAGE}
        />

        <Stack gap="2" p="3">
          <Text
            variant="paragraph-2"
            weight="bold"
            tone="link"
            truncate={2}
            className={css({ minH: "40px" })}
          >
            {product.name}
          </Text>

          {product.price && (
            <Text variant="paragraph-1" weight="bold" tone="error">
              {formatPrice(product.price, t)}
            </Text>
          )}

          {product.stock && (
            <Text
              variant="caption-2"
              weight="medium"
              tone={product.stock > 0 ? "success" : "error"}
            >
              {product.stock > 0 ? t("Còn hàng") : t("Hết hàng")}
            </Text>
          )}

          <Button
            variant="secondary"
            fullWidth
            mt="1"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <Center gap="1">
              <Cart size="sm" tone={isOutOfStock ? "disabled" : "success"} />
              <Text weight="bold" tone={isOutOfStock ? "disabled" : "success"}>
                {t("Thêm vào giỏ")}
              </Text>
            </Center>
          </Button>
        </Stack>
      </Box>
    </Link>
  );
}
