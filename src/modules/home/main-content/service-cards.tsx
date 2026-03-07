"use client";
import {
  ArrowRight,
  Gear,
  MagnifyingGlass,
  ShieldTick,
} from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/home/main-content/main-content-wrapper";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, Grid, HStack, Stack } from "@/vendors/styled-system/jsx";

const SERVICES = [
  {
    icon: Gear,
    title: "Sửa chữa máy nén",
    desc: "Các dịch vụ sửa chữa máy nén mà không có sự tốn kém hay thay thế phụ kiện hàng năm. Tiết kiệm chi phí bằng cách thuê thợ sửa chữa tại chỗ, đội ngũ có kinh nghiệm lâu năm.",
    href: "/products?category=dich-vu",
    accent: false,
  },
  {
    icon: ShieldTick,
    title: "Phụ tùng chính hãng",
    desc: "Tìm kiếm đại lý cung cấp toàn bộ các loại phụ tùng gốc, đảm bảo mang lại dịch vụ và thiết bị an toàn nhất cho khách hàng trên toàn quốc.",
    href: "/products?category=phu-tung-bitzer",
    accent: true,
  },
  {
    icon: MagnifyingGlass,
    title: "Kiểm tra máy nén",
    desc: "Các dịch vụ kiểm tra máy nén mà không cần sự tốn kém, điểm qua cẩn thận trước và sau khi sản xuất, mang lại giá trị cao nhất cho khách hàng.",
    href: "/products?category=kiem-tra",
    accent: false,
  },
];

export function ServiceCards() {
  const { t } = useIntl();
  return (
    <MainContentWrapper>
      <Box
        py={{ base: "10", md: "14" }}
        px={{ base: "4", md: "8" }}
        bg="white"
        borderRadius="xl"
      >
        <Grid columns={{ base: 1, md: 3 }} gap="6" w="100%">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
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
                borderColor: s.accent ? "brand.500" : "gray.100",
                bg: s.accent ? "brand.50" : "white",
                boxShadow: s.accent
                  ? "0 4px 24px token(colors.brand.500/0.12)"
                  : "0 2px 8px token(colors.gray.900/0.06)",
              })}
            >
              <Stack gap="4" p="6">
                {/* Icon */}
                <Center
                  py="1"
                  borderRadius="xl"
                  bg={s.accent ? "brand.500" : "brand.100"}
                  flexShrink={0}
                >
                  {s.icon && <s.icon />}
                </Center>

                {/* Title */}
                <Text
                  variant="section-heading-2"
                  weight="bold"
                  tone={s.accent ? "link" : "primary"}
                  textTransform="uppercase"
                >
                  {t(s.title)}
                </Text>

                {/* Green rule */}
                <Box
                  h="2px"
                  w="8"
                  borderRadius="full"
                  bg={s.accent ? "brand.500" : "brand.300"}
                />

                {/* Description */}
                <Text variant="paragraph-2" tone="secondary">
                  {t(s.desc)}
                </Text>

                {/* Read more */}
                <HStack gap="1" mt="auto" pt="2">
                  <Text variant="caption-1" weight="bold" tone="link">
                    {t("Xem thêm")}
                  </Text>
                  <ArrowRight tone="link" />
                </HStack>
              </Stack>
            </Link>
          ))}
        </Grid>
      </Box>
    </MainContentWrapper>
  );
}
