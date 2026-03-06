"use client";

import { useIntl } from "@/utils/intl";
import { Box, HStack } from "@/vendors/styled-system/jsx";

export function LanguageSwitcher() {
  const { lang, toggle } = useIntl();
  return (
    <HStack
      gap="0"
      borderRadius="full"
      border="1px solid"
      borderColor="border.default"
      overflow="hidden"
      fontSize="xs"
      fontWeight="700"
      cursor="pointer"
      onClick={toggle}
    >
      {(["vi", "en"] as const).map((l) => (
        <Box
          key={l}
          px="3"
          py="1.5"
          bg={lang === l ? "brand.500" : "transparent"}
          color={lang === l ? "white" : "text.secondary"}
          textTransform="uppercase"
          transition="all 0.2s"
        >
          {l}
        </Box>
      ))}
    </HStack>
  );
}
