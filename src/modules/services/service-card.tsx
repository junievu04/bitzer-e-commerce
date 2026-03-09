"use client";

import Link from "@/components/link";
import Text from "@/components/text";
import { css } from "@/vendors/styled-system/css";
import { Box, Stack } from "@/vendors/styled-system/jsx";
import Image from "next/image";
import { useState } from "react";
import { Service } from "./types";

const PLACEHOLDER_IMAGE = "/file.svg";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [imgSrc, setImgSrc] = useState(service.image || PLACEHOLDER_IMAGE);
  const serviceUrl = `/services/${service.slug}`;

  return (
    <Link
      href={serviceUrl}
      hover="none"
      display="block"
      textDecoration="none"
      h="full"
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
              src={imgSrc}
              alt={service.name}
              fill
              style={{ objectFit: "cover" }}
              onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
            />
          </Box>

          {/* Category pill */}
          <Box
            position="absolute"
            top="3"
            left="3"
            bg="brand.600"
            px="2.5"
            py="0.5"
            borderRadius="full"
          >
            <Text variant="caption-2" weight="bold" tone="inverse" inline>
              Dịch vụ
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
            {service.shortName || service.name}
          </Text>

          {service.description && (
            <Text
              variant="paragraph-2"
              tone="secondary"
              className={css({ lineHeight: "1.6" })}
            >
              {service.description}
            </Text>
          )}

          <Box display="flex" alignItems="center" gap="1" pt="1">
            <Text variant="caption-1" weight="bold" tone="link" inline>
              Xem chi tiết
            </Text>
            <Text variant="caption-1" tone="link" inline>
              →
            </Text>
          </Box>
        </Stack>
      </Box>
    </Link>
  );
}
