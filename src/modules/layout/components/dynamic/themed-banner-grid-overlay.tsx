"use client";
import Text from "@/components/text";
import { LayoutComponentDetail } from "@/modules/layout";
import { useIntl } from "@/utils/intl";
import { Box, Stack } from "@/vendors/styled-system/jsx";

interface Props {
  detail: LayoutComponentDetail;
}

const theme = "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)";

export default function ThemedBannerGridOverlay({ detail }: Props) {
  const { t } = useIntl();
  const { title, subTitle } = detail;
  if (!title) return null;
  return (
    <Box
      position="relative"
      minH={{ base: "56", md: "72" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      background={theme}
    >
      {/* Grid overlay */}
      <Box
        position="absolute"
        inset="0"
        opacity="0.05"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 40px)",
        }}
      />

      <Stack
        gap="3"
        alignItems="center"
        textAlign="center"
        position="relative"
        zIndex="1"
        px="6"
      >
        <Text
          variant="page-heading-1"
          weight="bold"
          tone="inverse"
          textTransform="uppercase"
          letterSpacing="0.05em"
        >
          {t(title)}
        </Text>
        {subTitle && (
          <Text variant="paragraph-1" tone="trending" weight="medium">
            {t(subTitle)}
          </Text>
        )}
        <Box w="16" h="1" bg="brand.400" borderRadius="full" mt="2" />
      </Stack>
    </Box>
  );
}
