"use client";
import Button from "@/components/button";
import { TravelNavigation } from "@/components/icons";
import Text from "@/components/text";
import TextArea from "@/components/text-area/text-area";
import TextField from "@/components/text-field";
import { useCart } from "@/hooks";
import { useIntl } from "@/utils/intl";
import { Box, Stack } from "@/vendors/styled-system/jsx";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export const ContactForm = () => {
  const { t } = useIntl();
  const { items } = useCart();
  const searchParams = useSearchParams();
  const fromCart = searchParams.get("from") === "cart";
  const productRaw = searchParams.get("product");
  const serviceRaw = searchParams.get("service");

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

  const parseQueryObject = <T,>(value: string | null): T | null => {
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (fromCart && items.length > 0) {
      const cartContent = items
        .map((item) => {
          const price =
            item.product.price != null
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.product.price)
              : "Liên hệ";
          return `- ${item.product.name}\n  Mã SP: ${item.product.id}\n  Số lượng: ${item.quantity}\n  Đơn giá: ${price}`;
        })
        .join("\n\n");

      const totalPrice = items.reduce((sum, item) => {
        if (item.product.price == null) return sum;
        return sum + item.product.price * item.quantity;
      }, 0);

      const hasContactPrice = items.some((item) => item.product.price == null);
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
      return;
    }

    const product = parseQueryObject<{
      name?: string;
      slug?: string;
      price?: number;
    }>(productRaw);
    const service = parseQueryObject<{
      slug?: string;
      name?: string;
    }>(serviceRaw);

    if (product) {
      const priceText =
        typeof product.price === "number" && !Number.isNaN(product.price)
          ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)
          : "Liên hệ";

      setFormData((prev) => ({
        ...prev,
        message: `Tôi quan tâm đến sản phẩm sau:

- Tên sản phẩm: ${product.name || "Không rõ"}
- Mã sản phẩm:  ${product.slug || "Không rõ"}
- Giá: ${priceText}

Vui lòng liên hệ lại với tôi để tư vấn chi tiết và hỗ trợ mua hàng.`,
      }));
      return;
    }

    if (service) {
      setFormData((prev) => ({
        ...prev,
        message: `Tôi quan tâm đến gói dịch vụ sau:

- Tên dịch vụ: ${service.name || "Không rõ"}
- Mã dịch vụ: ${service.slug || "Không rõ"}

Vui lòng liên hệ lại với tôi để tư vấn chi tiết và đăng ký dịch vụ.`,
      }));
    }
  }, [fromCart, items, productRaw, serviceRaw]);

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
        message: t("Có lỗi xảy ra. Vui lòng thử lại sau."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      as="form"
      bg="white"
      p="6"
      borderRadius="lg"
      border="1px solid {colors.gray.200}"
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
          <Text variant="paragraph-2" weight="medium" tone="primary" mb="1">
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
          rightIcon={TravelNavigation}
          disabled={isSubmitting}
        >
          {isSubmitting ? t("Đang gửi...") : t("Gửi liên hệ")}
        </Button>
      </Stack>
    </Box>
  );
};
