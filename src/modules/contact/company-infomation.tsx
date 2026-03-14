"use client";
import { Envelope, Globe, Location, Phone } from "@/components/icons";
import Text from "@/components/text";
import { INFO_COMPANY } from "@/constants";
import { useIntl } from "@/utils/intl";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";

export const CompanyInfomation = () => {
  const { t } = useIntl();
  return (
    <Box
      bg="white"
      p="6"
      borderRadius="lg"
      border="1px solid {colors.gray.200}"
    >
      <Text variant="section-heading-2" weight="bold" tone="primary" mb="4">
        {t(INFO_COMPANY.fullName)}
      </Text>

      <Stack gap="4">
        <Flex gap="3" align="flex-start">
          <Box flexShrink={0} mt="2">
            <Location size="sm" tone="success" />
          </Box>
          <Box>
            <Text variant="caption-1" weight="bold" tone="secondary">
              {t("Địa chỉ")}:
            </Text>
            <Text variant="paragraph-2" tone="primary">
              {t(INFO_COMPANY.address1)}
            </Text>
          </Box>
        </Flex>

        <Flex gap="3" align="center">
          <Box flexShrink={0}>
            <Phone size="sm" tone="success" />
          </Box>
          <Text
            variant="paragraph-2"
            weight="bold"
            tone="link"
            cursor="pointer"
            onClick={() =>
              (window.location.href = `tel:${INFO_COMPANY.phone.replace(/\s/g, "")}`)
            }
          >
            {INFO_COMPANY.phone}
          </Text>
        </Flex>

        <Flex gap="3" align="center">
          <Box flexShrink={0}>
            <Envelope size="sm" tone="success" />
          </Box>
          <Text
            variant="paragraph-2"
            tone="link"
            cursor="pointer"
            onClick={() =>
              (window.location.href = `mailto:${INFO_COMPANY.email}`)
            }
          >
            {INFO_COMPANY.email}
          </Text>
        </Flex>

        <Flex gap="3" align="center">
          <Box flexShrink={0}>
            <Globe size="sm" tone="success" />
          </Box>
          <Text
            variant="paragraph-2"
            tone="link"
            cursor="pointer"
            onClick={() =>
              window.open(`https://${INFO_COMPANY.website}`, "_blank")
            }
          >
            {INFO_COMPANY.website}
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};
