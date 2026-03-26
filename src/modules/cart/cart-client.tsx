"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import Button from "@/components/button";
import { Dustbin, Phone } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { useCart } from "@/hooks";
import { formatPrice } from "@/utils/helpers/shared-helpers";
import { useIntl } from "@/utils/intl";
import { Box, Center, Flex, Grid, Stack } from "@/vendors/styled-system/jsx";
import CartItemRow from "./cart-item-row";

const handleContactToBuy = () => {
  if (typeof window === "undefined") return;
  window.location.href = "/contact?from=cart";
};

export const CartClient = () => {
  const { t } = useIntl();
  const { items, totalItems, clearCart, removeFromCart, updateQuantity } =
    useCart();

  const totalPrice = items.reduce((sum, item) => {
    if (!item.product.price) return sum;
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
            border="1px solid {colors.gray.200}"
            overflow="hidden"
          >
            {/* Header */}
            <Flex
              display={{ base: "none", md: "flex" }}
              px="4"
              py="3"
              bg="gray.50"
              borderBottom="1px solid {colors.gray.200}"
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
                borderBottom={
                  index < items.length - 1
                    ? "1px solid {colors.gray.200}"
                    : "none"
                }
              >
                <CartItemRow
                  key={index}
                  cartItemRow={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
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
            border="1px solid {colors.gray.200}"
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
                  {t("{totalItems} sản phẩm", { totalItems })}
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
};
