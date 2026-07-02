"use client";
import { ArrowRight } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { DAITIN_IMAGE } from "@/constants";
import { useTranslation } from "@/hooks/use-translation";
import { ProductItem } from "@/modules/products";
import { useIntl } from "@/utils/intl/use-intl";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";

const ChatbotProductSuggestions = ({ product }: { product: ProductItem }) => {
  const { t } = useIntl();
  const { translate } = useTranslation(product);
  const nameTranslated = translate("name") ?? product.name;
  return (
    <Link
      key={product.id}
      href={`/products/${product.slug}`}
      display="block"
      textDecoration="none"
      borderRadius="xl"
      overflow="hidden"
      border="1.5px solid {colors.gray.200}"
      bg="white"
      transition="all 0.2s ease"
      _hover={{
        borderColor: "brand.500",
        boxShadow: "0 4px 16px {colors.brand.500/0.15}",
        transform: "translateY(-1px)",
      }}
    >
      <Flex alignItems="center" gap="0" px="1">
        <Box position="relative" w="16" h="16" flexShrink={0} bg="gray.100">
          <Image
            aspectRatio="1/1"
            width="100%"
            height="100%"
            objectFit="cover"
            src={product.images?.[0] || DAITIN_IMAGE}
            alt={product.name}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Stack gap="0.5" px="3" py="2" flex="1" minW="0">
          <Text variant="caption-2" weight="bold" tone="link" inline>
            {product.slug}
          </Text>
          <Text variant="caption-1" weight="bold" truncate={1}>
            {nameTranslated}
          </Text>
          <Text variant="caption-2" tone="secondary" truncate={1}>
            {t("Nhấn để xem chi tiết sản phẩm")}
          </Text>
        </Stack>
        <ArrowRight pr="3" flexShrink={0} tone="link" size="sm" />
      </Flex>
    </Link>
  );
};

export default ChatbotProductSuggestions;
