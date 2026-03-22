"use client";
import Button from "@/components/button";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { DAITIN_IMAGE } from "@/constants";
import AboutHeader from "@/modules/about/about-header";
import { LayoutComponentDetail } from "@/modules/layout";
import { MainContentWrapper } from "@/modules/layout/components/dynamic";
import { useIntl } from "@/utils/intl";
import { Box, Grid, HStack, Stack } from "@/vendors/styled-system/jsx";
import { useMemo } from "react";

interface Props {
  detail: LayoutComponentDetail;
}

interface BulletPoint {
  id?: string;
  text?: string;
}

type ComponentItem = { contents: string[] } | { bulletPoints: BulletPoint[] };

const whiteGradient =
  "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 12px)";

export default function AboutSection({ detail }: Props) {
  const { t } = useIntl();

  const {
    title,
    subTitle,
    description,
    image,
    cta,
    label,
    theme,
    imagePosition = "left",
    components,
  } = detail;

  const firstComponent = components?.[0] as ComponentItem | undefined;

  const contents = useMemo(
    () =>
      firstComponent && "contents" in firstComponent
        ? firstComponent.contents
        : [],
    [firstComponent],
  );

  const bulletPoints = useMemo(
    () =>
      firstComponent && "bulletPoints" in firstComponent
        ? firstComponent.bulletPoints
        : [],
    [firstComponent],
  );

  const renderAboutHeader = useMemo(() => {
    if (label && title) {
      return <AboutHeader label={label} title={title} />;
    }
    if (bulletPoints.length > 0) {
      return (
        <>
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
        </>
      );
    }
    return (
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
    );
  }, [label, title, subTitle, bulletPoints, t]);

  if (!detail) return null;

  return (
    <MainContentWrapper id="about-section">
      <Box
        py={{ base: "14", md: "20" }}
        px="5"
        position="relative"
        overflow="hidden"
        borderRadius="xl"
        style={{
          background: theme ? theme : "transparent",
        }}
      >
        {theme && (
          <Box
            position="absolute"
            inset="0"
            opacity="0.04"
            pointerEvents="none"
            style={{
              backgroundImage: whiteGradient,
            }}
          />
        )}

        <Grid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: "10", lg: "16" }}
          alignItems="center"
          position="relative"
        >
          {imagePosition === "left" && (
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
          )}
          <Stack gap="5">
            {renderAboutHeader}

            <Stack gap="4">
              {description && (
                <Text
                  variant="paragraph-1"
                  tone={theme ? "inverse" : "primary"}
                >
                  {t(description)}
                </Text>
              )}
              {contents.map((content, index) => (
                <Text
                  key={index}
                  variant="paragraph-1"
                  tone={theme ? "inverse" : "primary"}
                  opacity="0.85"
                >
                  {t(content)}
                </Text>
              ))}

              {bulletPoints.map(
                (bp, i) =>
                  bp.text && (
                    <HStack key={bp.id ?? i} gap="3" alignItems="flex-start">
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

            {cta?.link && cta?.text && (
              <Box pt="2">
                <Link href={cta.link || "/about"}>
                  <Button
                    variant={theme ? "secondary" : "default"}
                    size="lg"
                    onDark={theme ? true : false}
                  >
                    {t(cta.text)}
                  </Button>
                </Link>
              </Box>
            )}
          </Stack>

          {imagePosition === "right" && (
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
          )}
        </Grid>
      </Box>
    </MainContentWrapper>
  );
}
