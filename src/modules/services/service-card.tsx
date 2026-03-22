"use client";

import { ArrowRight } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import { DAITIN_IMAGE } from "@/constants";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Stack } from "@/vendors/styled-system/jsx";
import type { Service } from "./services.d";
interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useIntl();
  const { slug, name, thumbnail, brief } = service;
  return (
    <Link
      href={`/services/${slug}`}
      hover="none"
      display="block"
      textDecoration="none"
      h="full"
      maxW={{ base: "100%", md: "380px" }}
    >
      <Box
        h="full"
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        border="1px solid {colors.gray.100}"
        className={css({
          transition: "all 0.3s ease",
          _hover: {
            transform: "translateY(-5px)",
            boxShadow: "0 16px 40px token(colors.gray.900/0.1)",
            borderColor: "brand.200",
            "& .img-zoom": { transform: "scale(1.05)" },
            "& .service-title": { color: "brand.600" },
          },
        })}
      >
        {/* Image */}
        <Box
          position="relative"
          overflow="hidden"
          bg="gray.100"
          className={css({ aspectRatio: "4/3" })}
        >
          <Box
            className={`img-zoom ${css({ transition: "transform 0.4s ease" })}`}
            position="absolute"
            inset="0"
          >
            <Image
              src={thumbnail || DAITIN_IMAGE}
              alt={service.name}
              aspectRatio="1/1"
              width="100%"
              objectFit="cover"
              borderRadius="0"
            />
          </Box>

          {/* Category pill */}
          <Box
            position="absolute"
            top="3"
            left="3"
            bg="brand.600"
            px="2.5"
            pb="1"
            borderRadius="full"
          >
            <Text variant="caption-2" weight="bold" tone="inverse" inline>
              {t("Dịch vụ")}
            </Text>
          </Box>
        </Box>

        {/* Content */}
        <Stack gap="3" p="5">
          <Box w="8" h="3px" bg="brand.500" borderRadius="full" />

          <Text
            variant="section-heading-2"
            weight="bold"
            tone="primary"
            className={`service-title ${css({ transition: "color 0.2s ease", lineHeight: "1.3" })}`}
          >
            {t(name)}
          </Text>

          {brief && (
            <Text variant="paragraph-2" tone="secondary">
              {t(brief)}
            </Text>
          )}

          <Box display="flex" alignItems="center" gap="1" pt="1">
            <Text variant="caption-1" weight="bold" tone="link" inline>
              {t("Xem chi tiết")}
            </Text>
            <ArrowRight size="xs" tone="link" />
          </Box>
        </Stack>
      </Box>
    </Link>
  );
}
