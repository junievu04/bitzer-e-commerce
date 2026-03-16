"use client";
import { Carousel } from "@/components/carousel";
import { ArrowRight, BoxesLines } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/layout/components/dynamic";
import { LayoutComponentDetail } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, HStack, Stack } from "@/vendors/styled-system/jsx";

interface Props {
  detail: LayoutComponentDetail;
}
interface NewsItem {
  id?: string;
  title?: string;
  date?: string;
  category?: string;
  link?: string;
  image?: string;
}

export default function NewsSection({ detail }: Props) {
  const { t } = useIntl();
  if (!detail) return null;
  const { title, cta, components } = detail;
  const { link: ctaLink, text: ctaText } = cta ?? {};

  const newsItems = components as NewsItem[];

  if (!newsItems || newsItems.length === 0) return null;

  return (
    <MainContentWrapper id="news-section">
      <Box py={{ base: "12", md: "18" }} bg="white" px="5" borderRadius="xl">
        <Stack gap="8">
          <HStack justifyContent="space-between" alignItems="center">
            <Stack gap="2">
              {title && (
                <Text
                  variant="page-heading-2"
                  weight="bold"
                  tone="primary"
                  textTransform="uppercase"
                >
                  {t(title)}
                </Text>
              )}
              <Box w="12" h="3px" bg="brand.500" borderRadius="full" />
            </Stack>

            {ctaText && ctaLink && (
              <Link href={ctaLink} tone="link" hover="none">
                <HStack gap="1" alignItems="center">
                  <Text variant="caption-1" weight="bold" tone="link">
                    {t(ctaText)}
                  </Text>
                  <ArrowRight size="xs" tone="link" />
                </HStack>
              </Link>
            )}
          </HStack>

          <Carousel variant="three" navigation pagination gap={20}>
            {newsItems.map((item) => (
              <Link
                key={item.id ?? ""}
                href={item.link ?? "/"}
                tone="primary"
                hover="none"
                className={css({
                  display: "block",
                  textDecoration: "none",
                  borderRadius: "xl",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "gray.100",
                  bg: "white",
                  boxShadow: "0 2px 12px token(colors.gray.900/0.06)",
                  transition: "all 0.25s ease",
                  _hover: {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px token(colors.gray.900/0.12)",
                    borderColor: "brand.200",
                  },
                })}
              >
                <Center
                  h="44"
                  bg="brand.100"
                  position="relative"
                  overflow="hidden"
                >
                  <BoxesLines size="lg" />
                  {item.category && (
                    <Box
                      position="absolute"
                      top="3"
                      left="3"
                      bg="brand.600"
                      px="2.5"
                      pb="1"
                      borderRadius="full"
                    >
                      <Text variant="caption-2" weight="bold" tone="inverse">
                        {t(item.category)}
                      </Text>
                    </Box>
                  )}
                </Center>

                <Stack gap="3" p="5">
                  {item.date && (
                    <Text variant="caption-1" tone="secondary" opacity="0.6">
                      {item.date}
                    </Text>
                  )}
                  {item.title && (
                    <Text
                      variant="paragraph-1"
                      weight="bold"
                      tone="primary"
                      className={css({ lineHeight: "1.5" })}
                    >
                      {t(item.title)}
                    </Text>
                  )}
                  {item.link && (
                    <HStack gap="1" pt="1">
                      <Text variant="caption-1" weight="bold" tone="link">
                        {t("Đọc thêm")}
                      </Text>
                      <ArrowRight size="xs" tone="link" />
                    </HStack>
                  )}
                </Stack>
              </Link>
            ))}
          </Carousel>
        </Stack>
      </Box>
    </MainContentWrapper>
  );
}
