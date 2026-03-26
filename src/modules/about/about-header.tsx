import Text from "@/components/text/text";
import { css } from "@/vendors/styled-system/css";
import { Box, HStack, Stack } from "@/vendors/styled-system/jsx";

export default function AboutHeader({
  label,
  title,
  center = false,
}: {
  label?: string;
  title: string;
  center?: boolean;
}) {
  return (
    <Stack
      gap="3"
      alignItems={center ? "center" : "flex-start"}
      textAlign={center ? "center" : "left"}
    >
      {label && (
        <HStack gap="2" alignItems="center">
          <Box w="8" h="3px" bg="brand.500" borderRadius="full" />
          <Text
            variant="caption-1"
            weight="bold"
            tone="link"
            className={css({
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            })}
          >
            {label}
          </Text>
        </HStack>
      )}
      <Text
        variant="page-heading-2"
        weight="bold"
        tone="primary"
        className={css({ textTransform: "uppercase" })}
      >
        {title}
      </Text>
      <Box w="12" h="3px" bg="brand.500" borderRadius="full" />
    </Stack>
  );
}
