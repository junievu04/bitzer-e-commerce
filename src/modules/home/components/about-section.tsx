"use client";
import Button from "@/components/button";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { DAITIN_IMAGE } from "@/constants";
import MainContentWrapper from "@/modules/home/components/main-content-wrapper";
import { LayoutComponentDetail } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { Box, Grid, Stack } from "@/vendors/styled-system/jsx";

interface Props {
  detail: LayoutComponentDetail;
}

const theme =
  "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 12px)";

export default function AboutSection({ detail }: Props) {
  const { t } = useIntl();

  if (!detail) return null;

  const { title, subTitle, description, image, ctaLink } = detail;

  return (
    <MainContentWrapper id="about-section">
      <Box
        py={{ base: "14", md: "20" }}
        px="5"
        bg="brand.700"
        position="relative"
        overflow="hidden"
        borderRadius="xl"
      >
        <Box
          position="absolute"
          inset="0"
          opacity="0.04"
          style={{
            backgroundImage: theme,
          }}
        />

        <Grid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: "10", lg: "16" }}
          alignItems="center"
          position="relative"
        >
          <Image
            src={image || DAITIN_IMAGE}
            alt="Hình ảnh công ty ĐẠI TÍN"
            aspectRatio="4/3"
            width="100%"
            objectFit="cover"
            borderRadius="2xl"
            fallback={DAITIN_IMAGE}
            wrapperProps={{
              boxShadow: "0 24px 64px {colors.brand.900/0.5}",
              minH: { base: "52", md: "72" },
            }}
          />
          <Stack gap="5">
            <Stack gap="1">
              {subTitle && (
                <Text
                  variant="caption-1"
                  weight="bold"
                  tone="inverse"
                  textTransform="uppercase"
                  opacity="0.7"
                >
                  {t(subTitle)}
                </Text>
              )}
              {title && (
                <Text
                  variant="page-heading-2"
                  weight="bold"
                  tone="inverse"
                  textTransform="uppercase"
                >
                  {t(title)}
                </Text>
              )}
              <Box w="10" h="3px" bg="white" mt="1" opacity="0.4" />
            </Stack>

            {description && (
              <Text variant="paragraph-1" tone="inverse" opacity="0.85">
                {t(description)}
              </Text>
            )}

            <Box pt="2">
              <Link href={ctaLink || "/about"}>
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
