"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import Button from "@/components/button";
import {
  Envelope,
  Globe,
  Location,
  Paperplane,
  Phone,
} from "@/components/icons";
import Text from "@/components/text";
import TextField from "@/components/text-field/text-field";
import { useCart } from "@/hooks";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Grid, Stack, styled } from "@/vendors/styled-system/jsx";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TextArea = styled("textarea", {
  base: {
    w: "full",
    minH: "150px",
    p: "3",
    borderRadius: "md",
    border: "1px solid",
    borderColor: "gray.300",
    fontSize: "sm",
    fontFamily: "body",
    resize: "vertical",
    outline: "none",
    transition: "border-color 0.2s",
    _placeholder: { color: "text.muted" },
    _focus: { borderColor: "brand.500" },
    _disabled: { bg: "gray.100", cursor: "not-allowed" },
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

const COMPANY_INFO = {
  name: "CÔNG TY TNHH TM VÀ DV CÔNG NGHỆ ĐIỆN LẠNH ĐẠI TÍN",
  address:
    "Tầng 12 - Tháp A2, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, P. Hoà Hưng, TP. Hồ Chí Minh",
  phone: "0962 884 529",
  email: "bitzerecommerce@gmail.com",
  website: "www.congnghedaitin.com",
};

export function ContactClient() {
  const { t } = useIntl();
  const { items } = useCart();
  const searchParams = useSearchParams();
  const fromCart = searchParams.get("from") === "cart";

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (fromCart && items.length > 0) {
      const cartContent = items
        .map((item) => {
          const price =
            item.product.price !== null
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.product.price)
              : "Liên hệ";
          return `- ${item.product.name}\n  Mã SP: ${item.product.id}\n  Số lượng: ${item.quantity}\n  Đơn giá: ${price}`;
        })
        .join("\n\n");

      const totalPrice = items.reduce((sum, item) => {
        if (item.product.price === null) return sum;
        return sum + item.product.price * item.quantity;
      }, 0);

      const hasContactPrice = items.some((item) => item.product.price === null);
      const totalText = hasContactPrice
        ? "Liên hệ để biết giá"
        : new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalPrice);

      setFormData((prev) => ({
        ...prev,
        message: `Tôi muốn đặt mua các sản phẩm sau:\n\n${cartContent}\n\n---\nTổng cộng: ${totalText}\n\nVui lòng liên hệ lại với tôi để xác nhận đơn hàng.`,
      }));
    }
  }, [fromCart, items]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: data.message });
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      } else {
        setSubmitStatus({ type: "error", message: data.error });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [{ label: t("Liên hệ") }];

  return (
    <Box py="6" px="3">
      <Box mb="6">
        <Breadcrumbs items={breadcrumbItems} />
      </Box>

      <Box textAlign="center" mb="8">
        <Text variant="section-heading-1" weight="bold" tone="primary">
          {t("Liên hệ")}
        </Text>
        <Box
          w="16"
          h="3px"
          bg="brand.500"
          borderRadius="full"
          mx="auto"
          mt="3"
        />
      </Box>

      <Grid columns={{ base: 1, lg: 2 }} gap="8">
        {/* Company Info */}
        <Box>
          <Box
            bg="white"
            p="6"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text
              variant="section-heading-2"
              weight="bold"
              tone="primary"
              mb="4"
            >
              {COMPANY_INFO.name}
            </Text>

            <Stack gap="4">
              <Flex gap="3" align="flex-start">
                <Box flexShrink={0} mt="2">
                  <Location size="sm" tone="success" />
                </Box>
                <Box>
                  <Text variant="caption-1" weight="bold" tone="secondary">
                    {t("Địa chỉ")}:
                  </Text>
                  <Text variant="paragraph-2" tone="primary">
                    {COMPANY_INFO.address}
                  </Text>
                </Box>
              </Flex>

              <Flex gap="3" align="center">
                <Box flexShrink={0}>
                  <Phone size="sm" tone="success" />
                </Box>
                <Text
                  variant="paragraph-2"
                  weight="bold"
                  tone="link"
                  className={css({ cursor: "pointer" })}
                  onClick={() =>
                    (window.location.href = `tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`)
                  }
                >
                  {COMPANY_INFO.phone}
                </Text>
              </Flex>

              <Flex gap="3" align="center">
                <Box flexShrink={0}>
                  <Envelope size="sm" tone="success" />
                </Box>
                <Text
                  variant="paragraph-2"
                  tone="link"
                  className={css({ cursor: "pointer" })}
                  onClick={() =>
                    (window.location.href = `mailto:${COMPANY_INFO.email}`)
                  }
                >
                  {COMPANY_INFO.email}
                </Text>
              </Flex>

              <Flex gap="3" align="center">
                <Box flexShrink={0}>
                  <Globe size="sm" tone="success" />
                </Box>
                <Text
                  variant="paragraph-2"
                  tone="link"
                  className={css({ cursor: "pointer" })}
                  onClick={() =>
                    window.open(`https://${COMPANY_INFO.website}`, "_blank")
                  }
                >
                  {COMPANY_INFO.website}
                </Text>
              </Flex>
            </Stack>
          </Box>
        </Box>

        {/* Contact Form */}
        <Box>
          <Box
            as="form"
            bg="white"
            p="6"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            onSubmit={handleSubmit}
          >
            <Stack gap="4">
              <TextField
                name="name"
                label={t("Họ và tên") + " *"}
                placeholder={t("Nhập họ và tên...")}
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />

              <TextField
                name="email"
                type="email"
                label={t("Địa chỉ email") + " *"}
                placeholder={t("Nhập địa chỉ email...")}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />

              <TextField
                name="phone"
                type="tel"
                label={t("Số điện thoại") + " *"}
                placeholder={t("Nhập số điện thoại...")}
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />

              <TextField
                name="address"
                label={t("Địa chỉ")}
                placeholder={t("Nhập địa chỉ...")}
                value={formData.address}
                onChange={handleChange}
                disabled={isSubmitting}
              />

              <Box>
                <Text
                  variant="paragraph-2"
                  weight="medium"
                  tone="primary"
                  mb="1"
                >
                  {t("Nội dung chia sẻ")} *
                </Text>
                <TextArea
                  name="message"
                  placeholder={t("Nhập nội dung...")}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </Box>

              {submitStatus && (
                <Box
                  p="3"
                  borderRadius="md"
                  bg={submitStatus.type === "success" ? "green.50" : "red.50"}
                  border="1px solid"
                  borderColor={
                    submitStatus.type === "success" ? "green.200" : "red.200"
                  }
                >
                  <Text
                    variant="paragraph-2"
                    tone={submitStatus.type === "success" ? "success" : "error"}
                  >
                    {submitStatus.message}
                  </Text>
                </Box>
              )}

              <Button
                type="submit"
                variant="default"
                size="lg"
                leftIcon={Paperplane}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("Đang gửi...") : t("Gửi liên hệ")}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
