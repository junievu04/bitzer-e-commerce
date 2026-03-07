"use client";
import { Carousel } from "@/components/carousel";
import { ArrowRight, BoxesLines } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/home/main-content/main-content-wrapper";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, HStack, Stack } from "@/vendors/styled-system/jsx";

const NEWS_ITEMS = [
  {
    slug: "thanh-tuu-tieu-bieu-dpv",
    title: "Thành tựu tiêu biểu DPV",
    date: "15/01/2025",
    category: "Tin tức",
  },
  {
    slug: "cac-uu-diem-vuot-troi-green-point-viet-nam",
    title: "Các ưu điểm vượt trội của Green Point Việt Nam",
    date: "08/01/2025",
    category: "Dịch vụ",
  },
  {
    slug: "san-pham-bitzer-chinh-hang",
    title: '"Sản phẩm Bitzer chính hãng – Lựa chọn của khách hàng thông minh"',
    date: "02/01/2025",
    category: "Sản phẩm",
  },
  {
    slug: "bao-duong-may-nen-dinh-ky",
    title: "Tầm quan trọng của bảo dưỡng máy nén định kỳ",
    date: "20/12/2024",
    category: "Kỹ thuật",
  },
  {
    slug: "gas-lanh-r410a",
    title:
      "Gas lạnh R410A — Ưu điểm và ứng dụng trong hệ thống lạnh công nghiệp",
    date: "10/12/2024",
    category: "Sản phẩm",
  },
];

export function NewsSection() {
  const { t } = useIntl();
  return (
    <MainContentWrapper>
      <Box py={{ base: "12", md: "18" }} bg="white" px="5" borderRadius="xl">
        <Stack gap="8">
          {/* ── Heading row ──────────────────────────────────────────────── */}
          <HStack justifyContent="space-between" alignItems="center">
            <Stack gap="2">
              <Text
                variant="page-heading-2"
                weight="bold"
                tone="primary"
                className={css({ textTransform: "uppercase" })}
              >
                {t("Tin tức")}
              </Text>
              <Box w="12" h="3px" bg="brand.500" borderRadius="full" />
            </Stack>

            <Link href="/news" tone="link" hover="none">
              <HStack gap="1" alignItems="center">
                <Text variant="caption-1" weight="bold" tone="link">
                  {t("Xem tất cả")}
                </Text>
                <ArrowRight size="xs" tone="link" />
              </HStack>
            </Link>
          </HStack>

          {/* ── Carousel ─────────────────────────────────────────────────── */}
          <Carousel variant="three" navigation pagination gap={20}>
            {NEWS_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                tone="primary"
                hover="none"
                className={css({
                  display: "block",
                  textDecoration: "none",
                  borderRadius: "xl",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "gray.100",
                  bg: "white",
                  boxShadow: "0 2px 12px token(colors.gray.900/0.06)",
                  transition: "all 0.25s ease",
                  _hover: {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px token(colors.gray.900/0.12)",
                    borderColor: "brand.200",
                  },
                })}
              >
                {/* Thumbnail */}
                <Center
                  h="44"
                  bg="brand.100"
                  position="relative"
                  overflow="hidden"
                >
                  <BoxesLines size="lg" />
                  <Box
                    position="absolute"
                    top="3"
                    left="3"
                    bg="brand.600"
                    px="2.5"
                    pb="1"
                    borderRadius="full"
                  >
                    <Text variant="caption-2" weight="bold" tone="inverse">
                      {t(item.category)}
                    </Text>
                  </Box>
                </Center>

                {/* Body */}
                <Stack gap="3" p="5">
                  <Text variant="caption-1" tone="secondary" opacity="0.6">
                    {item.date}
                  </Text>
                  <Text
                    variant="paragraph-1"
                    weight="bold"
                    tone="primary"
                    className={css({ lineHeight: "1.5" })}
                  >
                    {t(item.title)}
                  </Text>
                  <HStack gap="1" pt="1">
                    <Text variant="caption-1" weight="bold" tone="link">
                      {t("Đọc thêm")}
                    </Text>
                    <Text variant="caption-1" tone="link" inline>
                      →
                    </Text>
                  </HStack>
                </Stack>
              </Link>
            ))}
          </Carousel>
        </Stack>
      </Box>
    </MainContentWrapper>
  );
}
