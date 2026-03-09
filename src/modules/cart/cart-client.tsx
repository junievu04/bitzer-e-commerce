"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import Button from "@/components/button";
import { Dustbin, Minus, Phone, Plus } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { useCart } from "@/hooks";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import {
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  Stack,
} from "@/vendors/styled-system/jsx";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "/file.svg";

const formatPrice = (price: number | null, t: FormatMessage) => {
  if (price === null) return t("Liên hệ");
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const handleContactToBuy = () => {
  if (typeof window === "undefined") return;
  window.location.href = "/contact?from=cart";
};

export function CartClient() {
  const { t } = useIntl();
  const { items, totalItems, clearCart, removeFromCart, updateQuantity } =
    useCart();

  const totalPrice = items.reduce((sum, item) => {
    if (item.product.price === null) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  const hasContactPrice = items.some((item) => item.product.price === null);

  const breadcrumbItems = [{ label: t("Giỏ hàng") }];

  if (items.length === 0) {
    return (
      <Box py="6" px="3">
        <Box mb="4">
          <Breadcrumbs items={breadcrumbItems} />
        </Box>

        <Center py="16">
          <Stack gap="4" align="center">
            <Box
              w="24"
              h="24"
              borderRadius="full"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Dustbin size="lg" tone="secondary" />
            </Box>
            <Text variant="section-heading-2" weight="bold" tone="primary">
              {t("Giỏ hàng trống")}
            </Text>
            <Text variant="paragraph-2" tone="secondary" textAlign="center">
              {t("Bạn chưa có sản phẩm nào trong giỏ hàng.")}
            </Text>
            <Link href="/products">
              <Button variant="default">{t("Tiếp tục mua sắm")}</Button>
            </Link>
          </Stack>
        </Center>
      </Box>
    );
  }

  return (
    <Box py="6" px="3">
      <Box mb="4">
        <Breadcrumbs items={breadcrumbItems} />
      </Box>

      <Flex justify="space-between" align="center" mb="6">
        <Text variant="section-heading-1" weight="bold" tone="primary">
          {t("Giỏ hàng")} ({totalItems})
        </Text>
        <Button variant="plain" onClick={clearCart}>
          <Text tone="error" weight="medium">
            {t("Xóa tất cả")}
          </Text>
        </Button>
      </Flex>

      <Grid columns={{ base: 1, lg: 3 }} gap="6">
        {/* Cart Items */}
        <Box gridColumn={{ base: "1", lg: "span 2" }}>
          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
          >
            {/* Header */}
            <Flex
              display={{ base: "none", md: "flex" }}
              px="4"
              py="3"
              bg="gray.50"
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <Box flex="1">
                <Text variant="caption-1" weight="bold" tone="secondary">
                  {t("Sản phẩm")}
                </Text>
              </Box>
              <Box w="120px" textAlign="center">
                <Text variant="caption-1" weight="bold" tone="secondary">
                  {t("Đơn giá")}
                </Text>
              </Box>
              <Box w="140px" textAlign="center">
                <Text variant="caption-1" weight="bold" tone="secondary">
                  {t("Số lượng")}
                </Text>
              </Box>
              <Box w="120px" textAlign="center">
                <Text variant="caption-1" weight="bold" tone="secondary">
                  {t("Thành tiền")}
                </Text>
              </Box>
              <Box w="50px" />
            </Flex>

            {/* Items */}
            {items.map((item, index) => (
              <Box
                key={item.product.id}
                px="4"
                py="4"
                borderBottom={index < items.length - 1 ? "1px solid" : "none"}
                borderColor="gray.200"
              >
                <Flex
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "stretch", md: "center" }}
                  gap={{ base: "4", md: "0" }}
                >
                  {/* Product Info */}
                  <Flex flex="1" gap="3" align="center">
                    <Link
                      href={`/products/${item.product.slug || item.product.id}`}
                    >
                      <Box
                        position="relative"
                        w="80px"
                        h="80px"
                        bg="gray.50"
                        borderRadius="md"
                        overflow="hidden"
                        flexShrink={0}
                      >
                        <Image
                          src={item.product.image || PLACEHOLDER_IMAGE}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: "contain", padding: "8px" }}
                        />
                      </Box>
                    </Link>
                    <Stack gap="1" flex="1">
                      <Link
                        href={`/products/${item.product.slug || item.product.id}`}
                      >
                        <Text
                          variant="paragraph-2"
                          weight="bold"
                          tone="link"
                          truncate={2}
                        >
                          {item.product.name}
                        </Text>
                      </Link>
                      <Text variant="caption-2" tone="secondary">
                        SKU: {item.product.id}
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
                      {formatPrice(item.product.price, t)}
                    </Text>
                  </Flex>

                  {/* Price - Desktop */}
                  <Box
                    w="120px"
                    textAlign="center"
                    display={{ base: "none", md: "block" }}
                  >
                    <Text
                      variant="paragraph-2"
                      weight="bold"
                      tone="error"
                      textAlign="center"
                    >
                      {formatPrice(item.product.price, t)}
                    </Text>
                  </Box>

                  {/* Quantity */}
                  <Flex
                    w={{ base: "full", md: "140px" }}
                    justify={{ base: "space-between", md: "center" }}
                    align="center"
                  >
                    <Text
                      display={{ base: "block", md: "none" }}
                      tone="secondary"
                    >
                      {t("Số lượng")}:
                    </Text>
                    <HStack
                      gap="0"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                    >
                      <Button
                        variant="plain"
                        size="sm"
                        p="2"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus
                          size="xs"
                          tone={item.quantity <= 1 ? "disabled" : "primary"}
                        />
                      </Button>
                      <Center
                        w="10"
                        h="8"
                        borderX="1px solid"
                        borderColor="gray.300"
                      >
                        <Text variant="paragraph-2" weight="medium">
                          {item.quantity}
                        </Text>
                      </Center>
                      <Button
                        variant="plain"
                        size="sm"
                        p="2"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
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
                      {item.product.price !== null
                        ? formatPrice(item.product.price * item.quantity, t)
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
                      {item.product.price !== null
                        ? formatPrice(item.product.price * item.quantity, t)
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
                      onClick={() => removeFromCart(item.product.id)}
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
              </Box>
            ))}
          </Box>

          {/* Continue Shopping */}
          <Box mt="4">
            <Link href="/products">
              <Text tone="link" weight="medium">
                ← {t("Tiếp tục mua sắm")}
              </Text>
            </Link>
          </Box>
        </Box>

        {/* Order Summary */}
        <Box>
          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p="5"
            position={{ base: "relative", lg: "sticky" }}
            top={{ lg: "100px" }}
          >
            <Text
              variant="section-heading-2"
              weight="bold"
              tone="primary"
              mb="4"
            >
              {t("Thanh toán")}
            </Text>

            <Stack gap="3" mb="4">
              <Flex justify="space-between">
                <Text variant="paragraph-2" tone="secondary">
                  {t("Tổng sản phẩm")}
                </Text>
                <Text variant="paragraph-2" weight="medium">
                  {totalItems} {t("sản phẩm")}
                </Text>
              </Flex>

              <Flex justify="space-between">
                <Text variant="paragraph-2" tone="secondary">
                  {t("Tổng tạm tính")}
                </Text>
                <Text variant="paragraph-2" weight="medium">
                  {hasContactPrice ? t("Liên hệ") : formatPrice(totalPrice, t)}
                </Text>
              </Flex>

              <Box h="1px" bg="gray.200" my="2" />

              <Flex justify="space-between">
                <Text variant="paragraph-1" weight="bold" tone="primary">
                  {t("Thành tiền")}
                </Text>
                <Text variant="section-heading-2" weight="bold" tone="error">
                  {hasContactPrice ? t("Liên hệ") : formatPrice(totalPrice, t)}
                </Text>
              </Flex>

              {hasContactPrice && (
                <Text variant="caption-2" tone="secondary" fontStyle="italic">
                  * {t("Một số sản phẩm cần liên hệ để biết giá")}
                </Text>
              )}
            </Stack>

            <Stack gap="3">
              <Button
                fullWidth
                size="lg"
                leftIcon={Phone}
                onClick={handleContactToBuy}
              >
                {t("Liên hệ mua hàng")}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
