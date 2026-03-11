"use client";

import Button from "@/components/button";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/home/main-content/main-content-wrapper";
import { useIntl } from "@/utils/intl";
import { Box, Grid, HStack, Stack } from "@/vendors/styled-system/jsx";

const BULLET_POINTS = [
  "Thương hiệu BITZER được biên rộng từ chất lượng và chuyên môn, được ứng dụng rộng rãi các dịch vụ. Các mạng lưới điểm và của mạng lưới nhau mạnh.",
  "Nhóm và Green Point thực hiện các việc liên tổ chức với các phát triển thị trường của máy nén BITZER, cùng như của những nhà sản xuất khác.",
  "Về vấn đề, Chúng tôi sở hữu cùng mỗi ưu hội của mạng lưới Green Point Competence Centre ở Pháp. Trung tâm này lý do giải và cơ cấu các khách hàng như nhân viên đội nhóm.",
];

export function GlobalSupplierSection() {
  const { t } = useIntl();
  return (
    <MainContentWrapper>
      <Box py={{ base: "14", md: "20" }} bg="gray.50" px="5" borderRadius="xl">
        <Grid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: "10", lg: "16" }}
          alignItems="start"
        >
          {/* Left — heading */}
          <Stack gap="4">
            <Text variant="page-heading-1" weight="bold" tone="primary">
              <Text variant="page-heading-1" weight="bold" tone="link" inline>
                {t("BITZER")}
                {" - "}
              </Text>{" "}
              {t("NHÀ CUNG CẤP DỊCH VỤ TOÀN CẦU")}
            </Text>

            {/* Yellow accent rule (as in reference) */}
            <Box w="16" h="1" bg="warning.base" borderRadius="full" />

            {/* Bullet list */}
            <Stack gap="4" pt="2">
              {BULLET_POINTS.map((bp, i) => (
                <HStack key={i} gap="3" alignItems="flex-start">
                  <Box
                    w="2"
                    h="2"
                    borderRadius="full"
                    bg="brand.500"
                    mt="2"
                    flexShrink={0}
                  />
                  <Text variant="paragraph-2" tone="secondary">
                    {t(bp)}
                  </Text>
                </HStack>
              ))}
            </Stack>

            <Box pt="2">
              <Link href="/about">
                <Button>{t("Tìm hiểu thêm")}</Button>
              </Link>
            </Box>
          </Stack>

          {/* Right — image placeholder */}
          <Image
            src="https://res.cloudinary.com/dsw4o0hjl/image/upload/cld-sample-4.jpg"
            alt="Hình ảnh nhà máy / showroom"
            aspectRatio="4/3"
            width="100%"
            objectFit="cover"
            borderRadius="2xl"
            fallback="https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/cup-on-a-table.jpg"
            wrapperProps={{
              border: "1px solid {colors.gray.200}",
              minH: { base: "52", md: "80" },
            }}
          />
        </Grid>
      </Box>
    </MainContentWrapper>
  );
}
