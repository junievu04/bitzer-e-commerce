"use client";
import Button from "@/components/button";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/layout/components/dynamic";
import { LayoutComponentDetail } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import { useMemo } from "react";

interface Props {
  detail: LayoutComponentDetail;
}

export default function CtaBanner({ detail }: Props) {
  const { t } = useIntl();
  const { title, subTitle, cta, theme } = detail;
  const {
    link: ctaLink,
    text: ctaText,
    position: ctaPosition = "right",
    variant: ctaVariant = "default",
  } = cta ?? {};

  const ctaRender = useMemo(() => {
    if (!ctaText || !ctaLink) return null;
    return (
      <Link href={ctaLink}>
        <Button
          variant={ctaVariant}
          size="lg"
          transition="all 0.2s"
          onDark={theme ? true : false}
          _hover={{
            bg: "brand.50",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          {t(ctaText)}
        </Button>
      </Link>
    );
  }, [ctaText, ctaLink, ctaVariant, t, theme]);

  return (
    <MainContentWrapper id="cta-banner">
      <Box
        py={{ base: "12", md: "16" }}
        px="5"
        position="relative"
        borderRadius="xl"
        overflow="hidden"
        style={{
          background: theme ? theme : "transparent",
        }}
      >
        {/* Subtle bg texture */}
        {theme && (
          <Box
            position="absolute"
            inset="0"
            opacity="0.03"
            pointerEvents="none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 20px)",
            }}
          />
        )}
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent={ctaPosition === "center" ? "center" : "space-between"}
          gap={ctaPosition === "center" ? undefined : "6"}
        >
          {ctaPosition === "left" && ctaRender}

          <Stack alignItems="center" gap="4" px="4" textAlign="center">
            {title && (
              <Text
                variant="page-heading-2"
                weight="bold"
                tone="inverse"
                textTransform="uppercase"
                className={css({
                  textAlign: { base: "center", md: "left" },
                })}
              >
                {t(title)}
              </Text>
            )}
            {subTitle && (
              <Text variant="metric-1" weight="bold" tone="inverse">
                {t(subTitle)}
              </Text>
            )}
            {ctaPosition === "center" && ctaRender}
          </Stack>

          {ctaPosition === "right" && ctaRender}
        </Flex>
      </Box>
    </MainContentWrapper>
  );
}
