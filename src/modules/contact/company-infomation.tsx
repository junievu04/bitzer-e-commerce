"use client";
import { Envelope, Globe, Location, Phone } from "@/components/icons";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";

const COMPANY_INFO = {
  name: "CÔNG TY TNHH TM VÀ DV CÔNG NGHỆ ĐIỆN LẠNH ĐẠI TÍN",
  address:
    "Tầng 12 - Tháp A2, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, P. Hoà Hưng, TP. Hồ Chí Minh",
  phone: "0962 884 529",
  email: "bitzerecommerce@gmail.com",
  website: "www.congnghedaitin.com",
};

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
        {COMPANY_INFO.name}
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
              {COMPANY_INFO.address}
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
              (window.location.href = `tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`)
            }
          >
            {COMPANY_INFO.phone}
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
              (window.location.href = `mailto:${COMPANY_INFO.email}`)
            }
          >
            {COMPANY_INFO.email}
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
              window.open(`https://${COMPANY_INFO.website}`, "_blank")
            }
          >
            {COMPANY_INFO.website}
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};
