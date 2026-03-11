"use client";

import Button from "@/components/button";
import { Cart } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import { useCart } from "@/hooks";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, Stack } from "@/vendors/styled-system/jsx";
import { useState } from "react";
import { Product } from "./types";

const PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/breakfast.jpg";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number | null, t: FormatMessage) => {
  if (price === null) return t("Liên hệ");
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useIntl();
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(product.image || PLACEHOLDER_IMAGE);

  const productUrl = `/products/${product.slug || product.id}`;

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
          src={imgSrc}
          alt={product.name}
          aspectRatio="1/1"
          width="100%"
          objectFit="cover"
          borderRadius="0"
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
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

          <Text variant="paragraph-1" weight="bold" tone="error">
            {formatPrice(product.price, t)}
          </Text>

          <Text
            variant="caption-2"
            weight="medium"
            tone={product.quantity > 0 ? "success" : "error"}
          >
            {product.quantity > 0 ? t("Còn hàng") : t("Hết hàng")}
          </Text>

          <Button
            variant="secondary"
            fullWidth
            mt="1"
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
          >
            <Center gap="1">
              <Cart
                size="sm"
                tone={product.quantity > 0 ? "success" : "disabled"}
              />
              <Text
                weight="bold"
                tone={product.quantity > 0 ? "success" : "disabled"}
              >
                {t("Thêm vào giỏ")}
              </Text>
            </Center>
          </Button>
        </Stack>
      </Box>
    </Link>
  );
}
