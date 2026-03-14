"use client";

import Button from "@/components/button";
import { ArrowLeft, Cart, Phone } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import { useCart } from "@/hooks";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Grid, Stack } from "@/vendors/styled-system/jsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { HeaderTitleWrapper } from "../layout/components/header-title-wrapper";
import { PRODUCT_CATEGORIES } from "./product-filter";
import SuggestedProductsSection from "./suggested-products-section";
import { Product } from "./types";

const PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/breakfast.jpg";

interface ProductSpecification {
  label: string;
  value: string;
}

interface ProductWithDetails extends Product {
  detailedDescription?: string;
  specifications?: ProductSpecification[];
}

const MOCK_PRODUCTS: ProductWithDetails[] = [
  {
    id: "2DTS-2Y-40S",
    slug: "may-nen-bitzer-2dts-2y-40s",
    name: "Máy Nén Bitzer Model 2DTS-2Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 10,
    description:
      "Máy nén Bitzer bán kín 2 xi lanh, công suất cao, tiết kiệm năng lượng.",
    detailedDescription:
      "Máy nén Bitzer Model 2DTS-2Y-40S là dòng máy nén bán kín cao cấp được sản xuất tại Đức với công nghệ tiên tiến. Sản phẩm được thiết kế đặc biệt cho các hệ thống lạnh công nghiệp và thương mại, đảm bảo hiệu suất vận hành tối ưu và độ bền cao. Với thiết kế 2 xi lanh, máy nén hoạt động êm ái, tiết kiệm năng lượng và giảm thiểu tiếng ồn. Vỏ máy được làm từ gang đúc chất lượng cao, chống ăn mòn và chịu được áp suất làm việc lớn. Máy nén Bitzer Model 2DTS-2Y-40S là dòng máy nén bán kín cao cấp được sản xuất tại Đức với công nghệ tiên tiến. Sản phẩm được thiết kế đặc biệt cho các hệ thống lạnh công nghiệp và thương mại, đảm bảo hiệu suất vận hành tối ưu và độ bền cao. Với thiết kế 2 xi lanh, máy nén hoạt động êm ái, tiết kiệm năng lượng và giảm thiểu tiếng ồn. Vỏ máy được làm từ gang đúc chất lượng cao, chống ăn mòn và chịu được áp suất làm việc lớn.",
    specifications: [
      { label: "Model", value: "2DTS-2Y-40S" },
      { label: "Số xi lanh", value: "2" },
      { label: "Công suất lạnh", value: "4.5 kW" },
      { label: "Điện áp", value: "380V/3Ph/50Hz" },
      { label: "Môi chất lạnh", value: "R404A, R507A, R134a" },
      { label: "Xuất xứ", value: "Đức" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "2DES-3Y-40S",
    slug: "may-nen-bitzer-2des-3y-40s",
    name: "Máy Nén Bitzer Model 2DES-3Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 8,
    description:
      "Máy nén Bitzer bán kín 2 xi lanh, hiệu suất cao cho hệ thống lạnh",
    detailedDescription:
      "Máy nén Bitzer Model 2DES-3Y-40S là sản phẩm chất lượng cao từ thương hiệu Bitzer danh tiếng của Đức. Được thiết kế với 2 xi lanh bán kín, máy nén đảm bảo hiệu suất làm lạnh vượt trội cho các ứng dụng công nghiệp và thương mại.",
    specifications: [
      { label: "Model", value: "2DES-3Y-40S" },
      { label: "Số xi lanh", value: "2" },
      { label: "Công suất lạnh", value: "5.2 kW" },
      { label: "Điện áp", value: "380V/3Ph/50Hz" },
      { label: "Môi chất lạnh", value: "R404A, R507A" },
      { label: "Xuất xứ", value: "Đức" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4TES-9Y-40S",
    slug: "may-nen-bitzer-4tes-9y-40s",
    name: "Máy Nén Bitzer Model 4TES-9Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 5,
    description:
      "Máy nén Bitzer 4 xi lanh, công suất lớn cho kho lạnh công nghiệp",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4CES-6Y-40S",
    slug: "may-nen-bitzer-4ces-6y-40s",
    name: "Máy Nén Bitzer Model 4CES-6Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 7,
    description: "Máy nén Bitzer bán kín, tiết kiệm điện năng",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "HSK-5343-30",
    slug: "may-nen-truc-vit-bitzer-hsk-5343-30",
    name: "Máy Nén Trục Vít Bitzer HSK-5343-30",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 3,
    description: "Máy nén trục vít Bitzer, công suất lớn cho công nghiệp",
    category: {
      id: "may-nen-truc-vit-bitzer",
      name: "Máy Nén Trục Vít Bitzer",
      slug: "may-nen-truc-vit-bitzer",
    },
  },
];

interface ProductDetailClientProps {
  slug: string;
}

const formatPrice = (price: number | null, t: FormatMessage) => {
  if (price === null) return t("Liên hệ");
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const hadnleContactToBuy = () => {
  if (typeof window === "undefined") return;
  window.location.href = "/contact";
};

export default function ProductDetailClient({
  slug,
}: ProductDetailClientProps) {
  const { t } = useIntl();
  const { addToCart } = useCart();
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  const [imgSrc, setImgSrc] = useState(product?.image || PLACEHOLDER_IMAGE);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * 4;
      setShowExpandButton(el.scrollHeight >= maxHeight);
    }
  }, [product?.detailedDescription]);

  const suggestedProducts = useMemo(() => {
    if (!product) return [];
    return MOCK_PRODUCTS.filter(
      (p) => p.category.slug === product.category.slug && p.id !== product.id,
    ).slice(0, 6);
  }, [product]);

  if (!product) {
    return (
      <Box py="10" px="3">
        <Text variant="section-heading-1" tone="primary">
          {t("Không tìm thấy sản phẩm")}
        </Text>
        <Box mt="4" display="flex" justifyContent="center">
          <Link href="/products" tone="link">
            <Text tone="success" display="flex" alignItems="center" gap="1">
              <ArrowLeft tone="success" />
              {t("Quay lại danh sách sản phẩm")}
            </Text>
          </Link>
        </Box>
      </Box>
    );
  }

  const categoryName = PRODUCT_CATEGORIES.find(
    (c) => c.slug === product.category.slug,
  )?.name;

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: t("Sản phẩm"), href: "/products" },
  ];

  if (categoryName) {
    breadcrumbItems.push({
      label: categoryName,
      href: `/products?category=${product.category.slug}`,
    });
  }

  breadcrumbItems.push({ label: product.name });

  return (
    <HeaderTitleWrapper breadcrumbItems={breadcrumbItems}>
      <Grid columns={{ base: 1, lg: 2 }} gap="8">
        <Box maxW={{ base: "360px", lg: "480px" }} mx="auto" w="full">
          <Image
            aspectRatio="1/1"
            width="100%"
            objectFit="cover"
            borderRadius="lg"
            wrapperProps={{
              border: "1px solid {colors.gray.200}",
            }}
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
          />
        </Box>

        <Stack gap="4">
          <Text variant="page-heading-2" weight="bold" tone="primary">
            {product.name}
          </Text>

          <Text variant="caption-1" tone="secondary">
            {t("Mã sản phẩm")}: {product.id}
          </Text>

          <Text variant="section-heading-1" weight="bold" tone="error">
            {formatPrice(product.price, t)}
          </Text>

          <Box>
            <Text variant="paragraph-2" tone="secondary">
              {product.description}
            </Text>
          </Box>

          <Box
            p="4"
            bg="gray.50"
            borderRadius="md"
            border="1px solid {colors.gray.200}"
          >
            <Flex align="center" gap="2" mb="2">
              <Text variant="paragraph-2" weight="medium" tone="primary">
                {t("Tình trạng")}:
              </Text>
              <Text
                variant="paragraph-2"
                weight="bold"
                tone={product.quantity > 0 ? "success" : "error"}
              >
                {product.quantity > 0 ? t("Còn hàng") : t("Hết hàng")}
              </Text>
            </Flex>
            {product.quantity > 0 && (
              <Text variant="caption-1" tone="secondary">
                {t("Số lượng")}: {product.quantity}
              </Text>
            )}
          </Box>

          <Flex gap="3" mt="2">
            <Button
              variant="default"
              size="lg"
              leftIcon={Phone}
              disabled={product.quantity <= 0}
              onClick={hadnleContactToBuy}
            >
              {t("Liên hệ tư vấn")}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={Cart}
              onClick={() => addToCart(product)}
              disabled={product.quantity <= 0}
            >
              {t("Thêm vào giỏ hàng")}
            </Button>
          </Flex>
        </Stack>
      </Grid>

      {/* Detailed Description */}
      {product.detailedDescription && (
        <Box
          mt="8"
          p="6"
          bg="white"
          borderRadius="lg"
          border="1px solid {colors.gray.200}"
        >
          <Stack gap="4" maxH="100%" overflow="hidden">
            <Box>
              <Text
                variant="section-heading-2"
                weight="bold"
                tone="primary"
                textTransform="uppercase"
              >
                {t("Mô tả chi tiết")}
              </Text>
              <Box w="12" h="3px" bg="brand.500" borderRadius="full" mt="2" />
            </Box>
            <Box>
              <Text
                ref={descriptionRef}
                truncate={!isDescriptionExpanded ? 4 : undefined}
                variant="paragraph-2"
                tone="secondary"
              >
                {product.detailedDescription}
              </Text>
              {showExpandButton && (
                <Button
                  variant="plain"
                  size="sm"
                  mt="2"
                  p="0"
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  <Text tone="link" weight="medium">
                    {isDescriptionExpanded ? t("Rút gọn") : t("Xem thêm")}
                  </Text>
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
      )}

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <Box
          mt="6"
          p="6"
          bg="white"
          borderRadius="lg"
          border="1px solid {colors.gray.200}"
        >
          <Stack gap="4">
            <Box>
              <Text
                variant="section-heading-2"
                weight="bold"
                tone="primary"
                textTransform="uppercase"
              >
                {t("Thông số kỹ thuật")}
              </Text>
              <Box w="12" h="3px" bg="brand.500" borderRadius="full" mt="2" />
            </Box>
            <Box>
              {product.specifications.map((spec, index) => (
                <Flex
                  key={spec.label}
                  py="3"
                  borderBottom={
                    index < product.specifications!.length - 1
                      ? "1px solid {colors.gray.200}"
                      : "none"
                  }
                >
                  <Text
                    variant="paragraph-2"
                    weight="medium"
                    tone="primary"
                    className={css({ w: "40%", flexShrink: 0 })}
                  >
                    {t(spec.label)}
                  </Text>
                  <Text variant="paragraph-2" tone="secondary">
                    {spec.value}
                  </Text>
                </Flex>
              ))}
            </Box>
          </Stack>
        </Box>
      )}

      {/* Suggested Products */}
      <SuggestedProductsSection
        products={suggestedProducts}
        categorySlug={product.category.slug}
      />
    </HeaderTitleWrapper>
  );
}
