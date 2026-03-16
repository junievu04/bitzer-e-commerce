"use client";
import { Image } from "@/components/image";
import Text from "@/components/text/text";
import { DAITIN_IMAGE } from "@/constants";
import { useIntl } from "@/utils/intl";
import { Box, HStack, Stack, VStack } from "@/vendors/styled-system/jsx";
import { AboutCardProps } from "../home/components/dynamic-cards-about-section";

export default function AboutCard({
  id,
  displayInRow = false,
  imageWidth,
  imageHeight,
  titleVariant = "paragraph-1",
  backgroundImage,
  title,
  description,
  image,
  minWidthCard,
}: AboutCardProps) {
  const { t } = useIntl();
  const CoverContent = displayInRow ? HStack : VStack;
  return (
    <Box
      key={id}
      bg="white"
      borderRadius="xl"
      border="1px solid {colors.gray.200}"
      p="6"
      transition="all 0.25s ease"
      minW={minWidthCard ?? undefined}
      _hover={{
        borderColor: "brand.200",
        boxShadow: "0 8px 24px token(colors.brand.500/0.1)",
        transform: "translateY(-2px)",
      }}
    >
      <CoverContent gap="4" alignItems={displayInRow ? "flex-start" : "center"}>
        {image &&
          (imageWidth || imageHeight ? (
            <Box
              w={imageWidth}
              h={imageHeight}
              p="2"
              borderRadius="xl"
              bg={backgroundImage || "transparent"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Image
                src={image}
                alt={title || "image-about-icon"}
                aspectRatio="1/1"
                width="100%"
                objectFit="cover"
              />
            </Box>
          ) : (
            <Image
              src={image}
              alt={title || "about-image"}
              aspectRatio="4/3"
              width="100%"
              objectFit="cover"
              borderRadius="0"
              fallback={DAITIN_IMAGE}
            />
          ))}

        <Stack gap="2">
          {title && (
            <Text variant={titleVariant} weight="bold" tone="primary">
              {t(title)}
            </Text>
          )}
          {description && (
            <Text variant="paragraph-2" tone="secondary">
              {t(description)}
            </Text>
          )}
        </Stack>
      </CoverContent>
    </Box>
  );
}
