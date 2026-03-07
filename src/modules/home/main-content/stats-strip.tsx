"use client";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/home/main-content/main-content-wrapper";
import { useIntl } from "@/utils/intl";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";

const STATS = [
  { num: "+27", label: "Dự án đã hoàn thành" },
  { num: "+15", label: "Năm kinh nghiệm tại Việt Nam" },
  { num: "+90", label: "Kỹ sư chuyên nghiệp" },
];

export function StatsStrip() {
  const { t } = useIntl();
  return (
    <MainContentWrapper>
      <Box
        bg="white"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="gray.100"
        py={{ base: "8", md: "12" }}
        borderRadius="xl"
      >
        <Flex
          justifyContent="center"
          alignItems="stretch"
          flexWrap="wrap"
          gap={{ base: "6", md: "0" }}
        >
          {STATS.map((s, i) => (
            <Flex key={s.num} alignItems="stretch">
              <Stack gap="3" alignItems="center" px={{ base: "6", md: "16" }}>
                {/* Fixed-height number box — numbers bottom-aligned = same baseline */}
                <Box
                  h="16"
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="center"
                >
                  <Text variant="metric-1" weight="bold" tone="link">
                    {s.num}
                  </Text>
                </Box>

                {/* Fixed-height label box — labels top-aligned = same top edge */}
                <Box
                  h="10"
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="center"
                >
                  <Text
                    variant="paragraph-2"
                    tone="secondary"
                    maxW={150}
                    textAlign="center"
                  >
                    {t(s.label)}
                  </Text>
                </Box>
              </Stack>

              {/* Vertical divider between items, hidden on mobile */}
              {i < STATS.length - 1 && (
                <Box
                  display={{ base: "none", md: "block" }}
                  w="1px"
                  alignSelf="stretch"
                  bg="gray.200"
                />
              )}
            </Flex>
          ))}
        </Flex>
      </Box>
    </MainContentWrapper>
  );
}
