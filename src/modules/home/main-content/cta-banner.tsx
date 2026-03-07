"use client";
import Button from "@/components/button";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/home/main-content/main-content-wrapper";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex } from "@/vendors/styled-system/jsx";

export function CtaBanner() {
  const { t } = useIntl();
  return (
    <MainContentWrapper>
      <Box
        py={{ base: "12", md: "16" }}
        px="5"
        bg="gray.800"
        position="relative"
        borderRadius="xl"
        overflow="hidden"
      >
        {/* Subtle bg texture */}
        <Box
          position="absolute"
          inset="0"
          opacity="0.03"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 20px)",
          }}
        />

        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap="6"
          position="relative"
        >
          <Text
            variant="page-heading-2"
            weight="bold"
            tone="inverse"
            textTransform="uppercase"
            className={css({
              textAlign: { base: "center", md: "left" },
            })}
          >
            {t("Liên hệ ngay")}
          </Text>

          <Link href="/contact">
            <Button variant="default" size="lg">
              {t("Gửi yêu cầu tư vấn")}
            </Button>
          </Link>
        </Flex>
      </Box>
    </MainContentWrapper>
  );
}
