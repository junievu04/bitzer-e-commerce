"use client";
import {
  ArrowRight,
  Gear,
  MagnifyingGlass,
  ShieldTick,
} from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/layout/components/dynamic";
import { LayoutComponentDetail } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, Grid, HStack, Stack } from "@/vendors/styled-system/jsx";
import { useCallback } from "react";

interface Props {
  detail: LayoutComponentDetail;
}

interface IntroCard {
  icon?: string;
  title?: string;
  description?: string;
  link?: string;
  accent?: boolean;
}

const DEFAULT_INTRO_CARDS: IntroCard[] = [
  {
    icon: "Gear",
    title: "Sửa chữa máy nén",
    description:
      "Các dịch vụ sửa chữa máy nén mà không có sự tốn kém hay thay thế phụ kiện hàng năm. Tiết kiệm chi phí bằng cách thuê thợ sửa chữa tại chỗ, đội ngũ có kinh nghiệm lâu năm.",
    link: "/",
    accent: false,
  },
  {
    icon: "ShieldTick",
    title: "Phụ tùng chính hãng",
    description:
      "Tìm kiếm đại lý cung cấp toàn bộ các loại phụ tùng gốc, đảm bảo mang lại dịch vụ và thiết bị an toàn nhất cho khách hàng trên toàn quốc.",
    link: "/",
    accent: true,
  },
  {
    icon: "MagnifyingGlass",
    title: "Kiểm tra máy nén",
    description:
      "Các dịch vụ kiểm tra máy nén mà không cần sự tốn kém, điểm qua cẩn thận trước và sau khi sản xuất, mang lại giá trị cao nhất cho khách hàng.",
    link: "/",
    accent: false,
  },
];

export default function IntroCards({ detail }: Props) {
  const { t } = useIntl();
  const { components } = detail;
  const introCards = (components as IntroCard[]) ?? DEFAULT_INTRO_CARDS;

  const mapIcon = useCallback((icon: string) => {
    switch (icon) {
      case "Gear":
        return <Gear />;
      case "ShieldTick":
        return <ShieldTick />;
      case "MagnifyingGlass":
        return <MagnifyingGlass />;
    }
  }, []);

  if (
    introCards.length === 0 ||
    !introCards ||
    introCards.every((item) => !item.link)
  )
    return null;

  return (
    <MainContentWrapper id="intro-cards">
      <Box
        py={{ base: "10", md: "14" }}
        px={{ base: "4", md: "8" }}
        bg="white"
        borderRadius="xl"
      >
        <Grid columns={{ base: 1, md: 3 }} gap="6" w="100%">
          {introCards.map(
            (item) =>
              item.link && (
                <Link
                  key={item.title}
                  href={item.link ?? "/"}
                  tone="primary"
                  hover="none"
                  display="block"
                  textDecoration="none"
                  borderRadius="xl"
                  overflow="hidden"
                  border="2px solid"
                  transition="all 0.25s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 40px {colors.brand.500/0.18}",
                    borderColor: "brand.400",
                  }}
                  className={css({
                    borderColor: item.accent ? "brand.500" : "gray.100",
                    bg: item.accent ? "brand.50" : "white",
                    boxShadow: item.accent
                      ? "0 4px 24px token(colors.brand.500/0.12)"
                      : "0 2px 8px token(colors.gray.900/0.06)",
                  })}
                >
                  <Stack gap="4" p="6">
                    {/* Icon */}
                    <Center
                      py="1"
                      borderRadius="xl"
                      bg={item.accent ? "brand.500" : "brand.100"}
                      flexShrink={0}
                    >
                      {item.icon && mapIcon(item.icon)}
                    </Center>

                    {/* Title */}
                    {item.title && (
                      <Text
                        variant="section-heading-2"
                        weight="bold"
                        tone={item.accent ? "link" : "primary"}
                        textTransform="uppercase"
                      >
                        {t(item.title)}
                      </Text>
                    )}

                    {/* Green rule */}
                    <Box
                      h="2px"
                      w="8"
                      borderRadius="full"
                      bg={item.accent ? "brand.500" : "brand.300"}
                    />

                    {/* Description */}
                    {item.description && (
                      <Text variant="paragraph-2" tone="secondary">
                        {t(item.description)}
                      </Text>
                    )}

                    {/* Read more */}
                    <HStack gap="1" mt="auto" pt="2">
                      <Text variant="caption-1" weight="bold" tone="link">
                        {t("Xem thêm")}
                      </Text>
                      <ArrowRight tone="link" />
                    </HStack>
                  </Stack>
                </Link>
              ),
          )}
        </Grid>
      </Box>
    </MainContentWrapper>
  );
}
