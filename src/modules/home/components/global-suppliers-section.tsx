"use client";

import Button from "@/components/button";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { DaiTinImage } from "@/constants";
import MainContentWrapper from "@/modules/home/components/main-content-wrapper";
import { LayoutComponentDetail } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { Box, Grid, HStack, Stack } from "@/vendors/styled-system/jsx";

interface Props {
  detail: LayoutComponentDetail;
}

interface BulletPoint {
  id?: string;
  text?: string;
}

export default function GlobalSupplierSection({ detail }: Props) {
  const { t } = useIntl();
  if (!detail) return null;
  const { title, subTitle, ctaLink, image } = detail;
  const bulletPoints =
    (detail.components?.[0] as { bulletPoints: BulletPoint[] })?.bulletPoints ??
    [];
  return (
    <MainContentWrapper id="global-suppliers-section">
      <Box py={{ base: "14", md: "20" }} bg="gray.50" px="5" borderRadius="xl">
        <Grid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: "10", lg: "16" }}
          alignItems="start"
        >
          <Stack gap="4">
            <Text variant="page-heading-1" weight="bold" tone="primary">
              {title && (
                <Text variant="page-heading-1" weight="bold" tone="link" inline>
                  {t(title)}
                  {" - "}
                </Text>
              )}{" "}
              {subTitle && t(subTitle)}
            </Text>

            <Box w="16" h="1" bg="warning.base" borderRadius="full" />

            {bulletPoints.length > 0 && (
              <Stack gap="4" pt="2">
                {bulletPoints.map(
                  (bp, i) =>
                    bp.text && (
                      <HStack
                        key={i}
                        gap="3"
                        alignItems="flex-start"
                        id={bp.id}
                      >
                        <Box
                          w="2"
                          h="2"
                          borderRadius="full"
                          bg="brand.500"
                          mt="2"
                          flexShrink={0}
                        />
                        <Text variant="paragraph-2" tone="secondary">
                          {t(bp.text)}
                        </Text>
                      </HStack>
                    ),
                )}
              </Stack>
            )}

            <Box pt="2">
              <Link href={ctaLink || "/about"}>
                <Button>{t("Tìm hiểu thêm")}</Button>
              </Link>
            </Box>
          </Stack>

          {/* Right — image placeholder */}
          <Image
            src={image || DaiTinImage}
            alt="title"
            aspectRatio="4/3"
            width="100%"
            objectFit="cover"
            borderRadius="2xl"
            fallback={DaiTinImage}
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
