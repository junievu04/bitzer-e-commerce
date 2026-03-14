"use client";
import Button from "@/components/button";
import Link from "@/components/link";
import Text from "@/components/text";
import MainContentWrapper from "@/modules/home/components/main-content-wrapper";
import { useIntl } from "@/utils/intl";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";

export default function HeroBanner() {
  const { t } = useIntl();
  return (
    <MainContentWrapper>
      <Box
        position="relative"
        bg="gray.900"
        minH={{ base: "60vh", md: "80vh" }}
        overflow="hidden"
      >
        {/* Background gradient */}
        <Box
          position="absolute"
          inset="0"
          bgGradient="to-br"
          gradientFrom="gray.900"
          gradientVia="gray.800"
          gradientTo="brand.900"
          opacity="0.95"
        />

        <Flex
          position="relative"
          w="100%"
          mx="auto"
          px={{ base: "4", md: "8" }}
          h="full"
          minH={{ base: "60vh", md: "80vh" }}
          alignItems="center"
        >
          <Stack gap="6" maxW="600px">
            <Box
              fontSize={{ base: "3xl", md: "5xl" }}
              fontFamily="heading"
              fontWeight="900"
              color="white"
              lineHeight="tight"
            >
              {t("Phụ tùng máy nén")}
              <Text tone="trending" variant="metric-1" px={4}>
                {t("Bitzer")}
              </Text>
              {t("chính hãng")}
            </Box>

            <Box lineHeight="relaxed">
              <Text tone="neutral-light">
                {t(
                  "Hơn 500 sản phẩm phụ tùng, linh kiện điện lạnh. Giao hàng nhanh toàn quốc. Tư vấn kỹ thuật 24/7.",
                )}
              </Text>
            </Box>

            <Flex gap="4" flexWrap="wrap">
              <Link href="/products">
                <Button size="lg">{t("Xem sản phẩm")}</Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  border="1px solid {colors.brand.500}"
                  color="white"
                  bgColor="transparent"
                  _hover={{ bgColor: "brand.900" }}
                >
                  {t("Tư vấn ngay")}
                </Button>
              </Link>
            </Flex>

            {/* Stats */}
            <Flex gap="8" mt="4" flexWrap="wrap">
              {[
                { num: "500+", label: "Sản phẩm" },
                { num: "10+", label: "Năm kinh nghiệm" },
                { num: "24/7", label: "Hỗ trợ" },
              ].map((stat) => (
                <Stack key={stat.num} gap="4" alignItems="flex-start">
                  <Text variant="metric-2" tone="trending">
                    {stat.num}
                  </Text>
                  <Text variant="caption-1" tone="neutral-light">
                    {t(stat.num)}
                  </Text>
                </Stack>
              ))}
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </MainContentWrapper>
  );
}
