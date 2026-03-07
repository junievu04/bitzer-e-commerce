"use client";
import Button from "@/components/button";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/home/main-content/main-content-wrapper";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, Grid, Stack } from "@/vendors/styled-system/jsx";

export function AboutSection() {
  const { t } = useIntl();
  return (
    <MainContentWrapper>
      <Box
        py={{ base: "14", md: "20" }}
        px="5"
        bg="brand.700"
        position="relative"
        overflow="hidden"
        borderRadius="xl"
      >
        {/* Subtle pattern overlay */}
        <Box
          position="absolute"
          inset="0"
          opacity="0.04"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 12px)",
          }}
        />

        <Grid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: "10", lg: "16" }}
          alignItems="center"
          position="relative"
        >
          {/* Image / placeholder left */}
          <Center
            borderRadius="2xl"
            overflow="hidden"
            bg="brand.900"
            minH={{ base: "52", md: "72" }}
            position="relative"
            boxShadow="0 24px 64px {colors.brand.900/0.5}"
          >
            <Box
              position="absolute"
              inset="0"
              opacity="0.06"
              backgroundImage="repeating-linear-gradient(45deg, #22c55e 0, #22c55e 1px, transparent 0, transparent 8px)"
            />
            <Stack gap="3" alignItems="center" position="relative">
              <Box fontSize="5xl">🔩</Box>
              <Text variant="caption-1" tone="inverse" opacity="0.4">
                {t("Hình ảnh công ty")}
              </Text>
            </Stack>

            {/* Bottom badge */}
            <Box
              position="absolute"
              bottom="4"
              right="4"
              bg="brand.600"
              px="4"
              py="2"
              borderRadius="lg"
            >
              <Text
                variant="caption-1"
                weight="bold"
                tone="inverse"
                inline
                display="block"
              >
                GREEN POINT
              </Text>
              <Text
                variant="caption-2"
                tone="inverse"
                className={css({ opacity: "0.7" })}
              >
                A SERVICE BY BITZER GROUP
              </Text>
            </Box>
          </Center>

          {/* Text content right */}
          <Stack gap="5">
            <Stack gap="1">
              <Text
                variant="caption-1"
                weight="bold"
                tone="inverse"
                textTransform="uppercase"
                opacity="0.7"
              >
                {t("Về chúng tôi")}
              </Text>
              <Text
                variant="page-heading-2"
                weight="bold"
                tone="inverse"
                textTransform="uppercase"
              >
                {t("Dịch vụ Green Point")}
              </Text>
              <Box w="10" h="3px" bg="white" mt="1" opacity="0.4" />
            </Stack>

            <Stack gap="4">
              <Text variant="paragraph-1" tone="inverse" opacity="0.85">
                {t(
                  "Mạng lưới Green Point chủa yếu để đây ứng đến tất cả người tiêu dùng khách hàng. Không tin vào hơn 50 trong tiêu chỉ của mạng lưới đó là khách hàng hiện diện ở đây. Dịch vụ của chuyên gia Green Point cung cấp tất cả đa dạng, để kỹ sư đến kỹ thuật. Để đáp ứng những thông tiếp theo từ tay của khách hàng.",
                )}
              </Text>
              <Text variant="paragraph-1" tone="inverse" opacity="0.85">
                {t(
                  "Tùa nhân ngày nào và đa trì phía trong của phần dịch vụ, thông minh và chủ động — đó là những điểm đặc trưng của dịch vụ Green Point. Chúng tôi không bao giờ đá thúc hiệp vì chất lượng và tốt, dẫu chỉ mọi người nhìn, bỏ xuôi.",
                )}
              </Text>
            </Stack>

            <Box pt="2">
              <Link href="/about">
                <Button variant="secondary" size="lg" onDark>
                  {t("Tìm hiểu thêm")}
                </Button>
              </Link>
            </Box>
          </Stack>
        </Grid>
      </Box>
    </MainContentWrapper>
  );
}
