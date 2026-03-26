"use client";
import Button from "@/components/button";
import { Dustbin, Minus, Plus } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import { DAITIN_IMAGE } from "@/constants";
import { CartItem } from "@/hooks/use-cart";
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/helpers/shared-helpers";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, Flex, HStack, Stack } from "@/vendors/styled-system/jsx";

interface Props {
  cartItemRow: CartItem;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartItemRow = ({
  cartItemRow,
  updateQuantity,
  removeFromCart,
}: Props) => {
  const { t } = useIntl();
  const { translate } = useTranslation(cartItemRow.product);
  const nameTranslated = translate("name") ?? cartItemRow.product.name;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "stretch", md: "center" }}
      gap={{ base: "4", md: "0" }}
    >
      {/* Product Info */}
      <Flex flex="1" gap="3" align="center">
        <Link
          href={`/products/${cartItemRow.product.slug || cartItemRow.product.id}`}
        >
          <Image
            src={cartItemRow.product.images?.[0] || DAITIN_IMAGE}
            alt={cartItemRow.product.name}
            aspectRatio="1/1"
            width="80px"
            objectFit="cover"
            borderRadius="md"
          />
        </Link>
        <Stack gap="1" flex="1">
          <Link
            href={`/products/${cartItemRow.product.slug || cartItemRow.product.id}`}
          >
            <Text variant="paragraph-2" weight="bold" tone="link" truncate={2}>
              {nameTranslated}
            </Text>
          </Link>
          <Text variant="caption-2" tone="secondary">
            SKU: {cartItemRow.product.id}
          </Text>
        </Stack>
      </Flex>

      {/* Price - Mobile */}
      <Flex
        display={{ base: "flex", md: "none" }}
        justify="space-between"
        align="center"
      >
        <Text tone="secondary">{t("Đơn giá")}:</Text>
        <Text variant="paragraph-2" weight="bold" tone="error">
          {formatPrice(cartItemRow.product.price, t)}
        </Text>
      </Flex>

      {/* Price - Desktop */}
      <Box w="120px" textAlign="center" display={{ base: "none", md: "block" }}>
        <Text
          variant="paragraph-2"
          weight="bold"
          tone="error"
          textAlign="center"
        >
          {formatPrice(cartItemRow.product.price, t)}
        </Text>
      </Box>

      {/* Quantity */}
      <Flex
        w={{ base: "full", md: "140px" }}
        justify={{ base: "space-between", md: "center" }}
        align="center"
      >
        <Text display={{ base: "block", md: "none" }} tone="secondary">
          {t("Số lượng")}:
        </Text>
        <HStack gap="0" border="1px solid {colors.gray.300}" borderRadius="md">
          <Button
            variant="plain"
            size="sm"
            p="2"
            onClick={() =>
              updateQuantity(cartItemRow.product.id, cartItemRow.quantity - 1)
            }
            disabled={cartItemRow.quantity <= 1}
          >
            <Minus
              size="xs"
              tone={cartItemRow.quantity <= 1 ? "disabled" : "primary"}
            />
          </Button>
          <Center w="10" h="8" borderX="1px solid {colors.gray.300}">
            <Text variant="paragraph-2" weight="medium">
              {cartItemRow.quantity}
            </Text>
          </Center>
          <Button
            variant="plain"
            size="sm"
            p="2"
            onClick={() =>
              updateQuantity(cartItemRow.product.id, cartItemRow.quantity + 1)
            }
          >
            <Plus size="xs" tone="primary" />
          </Button>
        </HStack>
      </Flex>

      {/* Subtotal - Mobile */}
      <Flex
        display={{ base: "flex", md: "none" }}
        justify="space-between"
        align="center"
      >
        <Text tone="secondary">{t("Thành tiền")}:</Text>
        <Text variant="paragraph-1" weight="bold" tone="success">
          {!!cartItemRow.product.price
            ? formatPrice(cartItemRow.product.price * cartItemRow.quantity, t)
            : t("Liên hệ")}
        </Text>
      </Flex>

      {/* Subtotal - Desktop */}
      <Box w="120px" display={{ base: "none", md: "block" }}>
        <Text
          variant="paragraph-2"
          weight="bold"
          tone="success"
          textAlign="center"
        >
          {!!cartItemRow.product.price
            ? formatPrice(cartItemRow.product.price * cartItemRow.quantity, t)
            : t("Liên hệ")}
        </Text>
      </Box>

      {/* Delete */}
      <Box
        w={{ base: "full", md: "50px" }}
        textAlign={{ base: "center", md: "right" }}
      >
        <Button
          variant="plain"
          p="2"
          onClick={() => removeFromCart(cartItemRow.product.id)}
          className={css({
            _hover: { bg: "red.50" },
            borderRadius: "md",
          })}
        >
          <Text
            display={{ base: "inline", md: "none" }}
            tone="error"
            weight="medium"
            mr="1"
          >
            {t("Xóa")}
          </Text>
          <Dustbin size="sm" tone="error" />
        </Button>
      </Box>
    </Flex>
  );
};

export default CartItemRow;
