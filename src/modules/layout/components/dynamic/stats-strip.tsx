"use client";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/layout/components/dynamic";
import { LayoutComponentDetail } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";

interface Props {
  detail: LayoutComponentDetail;
}

interface Stats {
  id?: string;
  type?: "increase" | "decrease";
  number?: string;
  label?: string;
}

export default function StatsStrip({ detail }: Props) {
  const { t } = useIntl();
  if (!detail) return null;
  const { components } = detail;
  if (!components) return null;
  const stats = (components as Stats[]) ?? [];
  return (
    <MainContentWrapper id="stats-strip">
      <Box
        bg="white"
        border="1px solid {colors.gray.200}"
        py={{ base: "8", md: "12" }}
        borderRadius="xl"
      >
        <Flex
          justifyContent="center"
          alignItems="stretch"
          flexWrap="wrap"
          gap={{ base: "6", md: "0" }}
        >
          {stats.map((s, i) => (
            <Flex key={s.id} alignItems="stretch">
              <Stack gap="3" alignItems="center" px={{ base: "6", md: "16" }}>
                {s.number && (
                  <Box
                    h="16"
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="center"
                  >
                    <Text variant="metric-1" weight="bold" tone="link">
                      {s.type === "increase" ? "+" : "-"}
                      {s.number}
                    </Text>
                  </Box>
                )}

                {s.label && (
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
                )}
              </Stack>

              {i < stats.length - 1 && (
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
