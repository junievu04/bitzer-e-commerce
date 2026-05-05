"use client";

import Button from "@/components/button";
import { Carousel } from "@/components/carousel";
import { Cart, Phone } from "@/components/icons";
import { Image } from "@/components/image";
import Text from "@/components/text";
import { DAITIN_IMAGE } from "@/constants";
import { useCart } from "@/hooks";
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/helpers/shared-helpers";
import { useIntl } from "@/utils/intl";
import { Box, Flex, Grid, Stack } from "@/vendors/styled-system/jsx";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { HeaderTitleWrapper } from "../../layout/components/header-title-wrapper";
import type {
  ProductDetail,
  ProductItem,
  ProductSpecification,
} from "../products.d";
import SuggestedProductsSection from "../suggested-products-section";

interface ProductDetailClientProps {
  product: ProductDetail;
  suggestions?: ProductItem[] | [];
}

const handleContactToBuy = (params: {
  slug: string;
  name: string;
  price?: number;
}) => {
  if (typeof window === "undefined") return;
  const query = new URLSearchParams();
  query.set(
    "product",
    JSON.stringify({
      name: params.name,
      slug: params.slug,
      price: params.price,
    }),
  );
  window.location.href = `/contact?${query.toString()}`;
};

export default function ProductDetailClient({
  product,
  suggestions,
}: ProductDetailClientProps) {
  const { t } = useIntl();
  const { translate } = useTranslation(product);
  const { addToCart } = useCart();

  const {
    slug,
    images,
    price,
    stock,
    category,
    name,
    brief,
    description,
    specifications,
  } = product;

  // Dùng translate() cho các field dynamic từ backend
  const nameTranslated = translate("name") ?? name;
  const briefTranslated = translate("brief") ?? brief;
  const descriptionTranslated = translate("description") ?? description;
  const specificationsTranslated: ProductSpecification[] | null =
    translate<ProductSpecification>("specifications") ?? specifications;

  const isOutOfStock = useMemo(() => !stock || stock <= 0, [stock]);
  const imagesArray = useMemo(
    () => (images && !isEmpty(images) ? images : [DAITIN_IMAGE]),
    [images],
  );

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * 4;
      setShowExpandButton(el.scrollHeight >= maxHeight);
    }
  }, [descriptionTranslated]);

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: t("Sản phẩm"), href: "/products" },
  ];

  if (category) {
    breadcrumbItems.push({
      label: category.name,
      href: `/products?category=${category.slug}`,
    });
  }

  breadcrumbItems.push({ label: name });

  return (
    <>
      <HeaderTitleWrapper breadcrumbItems={breadcrumbItems}>
        <Grid columns={{ base: 1, lg: 2 }} gap="8">
          <Box maxW={{ base: "360px", lg: "480px" }} mx="auto" w="full">
            <Carousel
              variant="single"
              loop={imagesArray.length > 1}
              navigation={imagesArray.length > 1}
            >
              {imagesArray.map((image: string, index: number) => (
                <Image
                  key={index}
                  aspectRatio="1/1"
                  width="100%"
                  objectFit="cover"
                  borderRadius="lg"
                  wrapperProps={{
                    border: "1px solid {colors.gray.200}",
                    cursor: "zoom-in",
                    onClick: () => setLightboxIndex(index),
                  }}
                  src={image || DAITIN_IMAGE}
                  alt={name}
                />
              ))}
            </Carousel>
          </Box>

          <Stack gap="4">
            <Text variant="page-heading-2" weight="bold" tone="primary">
              {nameTranslated}
            </Text>

            <Text variant="caption-1" tone="secondary">
              {t("Loại sản phẩm")}: {t(category?.name || "Không có danh mục")}
            </Text>

            <Text variant="section-heading-1" weight="bold" tone="error">
              {formatPrice(price, t)}
            </Text>

            {briefTranslated && (
              <Text variant="paragraph-2" tone="secondary">
                {briefTranslated}
              </Text>
            )}

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
                  tone={isOutOfStock ? "error" : "success"}
                >
                  {isOutOfStock ? t("Hết hàng") : t("Còn hàng")}
                </Text>
              </Flex>
              {stock && (
                <Text variant="caption-1" tone="secondary">
                  {t("Số lượng")}: {stock}
                </Text>
              )}
            </Box>

            <Flex gap="3" mt="2">
              <Button
                variant="default"
                size="lg"
                leftIcon={Phone}
                disabled={isOutOfStock}
                onClick={() =>
                  handleContactToBuy({ slug, name: nameTranslated, price })
                }
              >
                {t("Liên hệ tư vấn")}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                leftIcon={Cart}
                onClick={() => addToCart(product)}
                disabled={isOutOfStock}
              >
                {t("Thêm vào giỏ hàng")}
              </Button>
            </Flex>
          </Stack>
        </Grid>

        {/* Detailed Description */}
        {descriptionTranslated && (
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
                  {descriptionTranslated}
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
        {specificationsTranslated && specificationsTranslated.length > 0 && (
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
                {specificationsTranslated.map((spec, index) => (
                  <Flex
                    key={spec?.label}
                    py="3"
                    borderBottom={
                      index < specifications!.length - 1
                        ? "1px solid {colors.gray.200}"
                        : "none"
                    }
                  >
                    <Text
                      variant="paragraph-2"
                      weight="medium"
                      tone="primary"
                      w="40%"
                      flexShrink="0"
                    >
                      {spec?.label || ""}
                    </Text>
                    <Text variant="paragraph-2" tone="secondary">
                      {spec?.value || ""}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Stack>
          </Box>
        )}

        {/* Suggested Products */}
        {suggestions && suggestions.length > 0 && (
          <SuggestedProductsSection
            products={suggestions}
            categorySlug={category?.slug}
          />
        )}
      </HeaderTitleWrapper>

      {lightboxIndex !== null && (
        <Box
          position="fixed"
          inset="0"
          zIndex="topmost"
          bg="black/80"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setLightboxIndex(null)}
          cursor="zoom-out"
        >
          <Box
            maxW={{ base: "500px", lg: "680px" }}
            w="full"
            onClick={(e) => e.stopPropagation()}
          >
            <Carousel
              variant="single"
              loop
              navigation={imagesArray.length > 1}
              pagination={imagesArray.length > 1}
            >
              {imagesArray.map((image: string, index: number) => (
                <Image
                  key={index}
                  aspectRatio="1/1"
                  width="100%"
                  objectFit="contain"
                  src={image || DAITIN_IMAGE}
                  alt={name}
                />
              ))}
            </Carousel>
          </Box>
        </Box>
      )}
    </>
  );
}
