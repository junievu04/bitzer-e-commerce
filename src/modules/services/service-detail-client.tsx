"use client";

import Button from "@/components/button";
import { ArrowLeft, Paperplane } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import { DAITIN_IMAGE } from "@/constants";
import { ServiceDetail } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Grid, Stack } from "@/vendors/styled-system/jsx";
import { HeaderTitleWrapper } from "../layout/components/header-title-wrapper";

interface Props {
  data: ServiceDetail | null;
}

export default function ServiceDetailClient({ data }: Props) {
  const { t } = useIntl();

  if (!data) {
    return (
      <Box py="10" px="3">
        <Text variant="section-heading-1" tone="primary">
          {t("Không tìm thấy dịch vụ")}
        </Text>
        <Box mt="4">
          <Link href="/services" tone="link">
            <Text tone="success" display="flex" alignItems="center" gap="1">
              <ArrowLeft tone="success" /> {t("Quay lại danh sách dịch vụ")}
            </Text>
          </Link>
        </Box>
      </Box>
    );
  }

  const { name, slug, thumbnail, brief, description, features, images } = data;

  const handleRegister = () => {
    if (typeof window === "undefined") return;
    window.location.href = `/contact?service=${encodeURIComponent(slug)}`;
  };

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: t("Dịch vụ"), href: "/services" },
    { label: t(name) },
  ];

  return (
    <HeaderTitleWrapper breadcrumbItems={breadcrumbItems}>
      {/* Hero Section */}
      <Box
        position="relative"
        w="full"
        h={{ base: "250px", md: "400px" }}
        borderRadius="lg"
        overflow="hidden"
        mb="8"
        className={css({ aspectRatio: { base: "16/9", md: "21/9" } })}
      >
        <Image
          width="100%"
          height="100%"
          objectFit="cover"
          borderRadius="lg"
          src={thumbnail || DAITIN_IMAGE}
          alt={name}
        />
        <Box position="absolute" inset="0" bg="gray.900" opacity="0.4" />
        <Box position="absolute" bottom="0" left="0" right="0" p="6">
          <Text
            variant="page-heading-1"
            weight="bold"
            tone="inverse"
            textShadow="0 2px 4px rgba(0,0,0,0.5)"
          >
            {t(name)}
          </Text>
        </Box>
      </Box>

      {/* Content */}
      <Box maxW="900px" mx="auto">
        <Stack gap="8">
          {/* Intro */}
          {brief && (
            <Text variant="paragraph-1" tone="secondary">
              {t(brief)}
            </Text>
          )}

          {/* Detailed section with image */}
          {description && (
            <Grid columns={{ base: 1, md: 2 }} gap="6">
              <Box
                position="relative"
                aspectRatio="4/3"
                borderRadius="lg"
                overflow="hidden"
                bg="gray.100"
              >
                <Image
                  aspectRatio="4/3"
                  width="100%"
                  objectFit="cover"
                  borderRadius="lg"
                  src={images?.[0] || DAITIN_IMAGE}
                  alt={name}
                />
              </Box>
              {description && (
                <Stack gap="3">
                  {description.map((item, index) => (
                    <Text
                      key={index}
                      variant="paragraph-1"
                      tone="secondary"
                      whiteSpace="pre-wrap"
                    >
                      {t(item)}
                    </Text>
                  ))}
                </Stack>
              )}
            </Grid>
          )}

          {/* Features */}
          {features && features.length > 0 && (
            <Box
              p="6"
              bg="gray.50"
              borderRadius="lg"
              border="1px solid {colors.gray.200}"
            >
              <Text
                variant="section-heading-2"
                weight="bold"
                tone="primary"
                mb="4"
              >
                {t("Điểm nổi bật")}
              </Text>
              <Stack gap="3">
                {features.map((feature, index) => (
                  <Flex key={index} gap="3" align="flex-start">
                    <Text tone="success" fontWeight="bold">
                      {"/"}
                      {"/"}
                    </Text>
                    <Text variant="paragraph-2" tone="primary">
                      {t(feature)}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Box>
          )}

          {/* Register CTA */}
          <Box
            p="6"
            bg="brand.50"
            borderRadius="lg"
            border="1px solid {colors.gray.200}"
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "stretch", md: "center" }}
              gap="4"
            >
              <Box>
                <Text variant="section-heading-2" weight="bold" tone="primary">
                  {t("Đăng ký dịch vụ")}
                </Text>
                <Text variant="paragraph-2" tone="secondary" mt="1">
                  {t(
                    "Liên hệ ngay để được tư vấn và đăng ký gói dịch vụ phù hợp",
                  )}
                </Text>
              </Box>
              <Button
                variant="highlight"
                size="lg"
                leftIcon={Paperplane}
                onClick={handleRegister}
              >
                {t("Đăng ký ngay")}
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Box>
    </HeaderTitleWrapper>
  );
}
