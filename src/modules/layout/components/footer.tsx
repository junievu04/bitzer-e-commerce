"use client";
import {
  Envelope,
  Location,
  Phone,
  ShieldTick,
  StarTickFilled,
} from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { INFO_COMPANY, LOGO_IMAGE } from "@/constants";
import { INFO_LINKS, SOCIAL_LINKS } from "@/constants/layout-links";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import {
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  Stack,
} from "@/vendors/styled-system/jsx";

// Nav links: trắng 70% → trắng 100% on hover
const navLinkCss = css({
  display: "flex",
  alignItems: "center",
  gap: "2.5",
  color: "white",
  opacity: "0.7",
  transition: "opacity 0.15s ease",
  _hover: { opacity: "1", textDecoration: "none" },
});

const contactLinkCss = css({
  color: "white",
  opacity: "0.7",
  transition: "opacity 0.15s ease, color 0.15s ease",
  _hover: { opacity: "1", color: "brand.400", textDecoration: "none" },
});

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <Box
      pb="2"
      mb="6"
      borderBottom="1px solid {colors.gray.700}"
      h="12"
      display="flex"
      alignItems="flex-end"
    >
      <Text variant="paragraph-1" weight="bold" tone="inverse">
        {children}
      </Text>
    </Box>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const { t } = useIntl();
  return (
    <Box as="footer" style={{ backgroundColor: "#03070f" }}>
      <Box maxW="7xl" m="auto" px="4" py="10">
        <Grid
          columns={{ base: 1, sm: 2, lg: 4 }}
          gap="10"
          mb="10"
          alignItems="start"
        >
          {/* ── Col 1: Về chúng tôi ──────────────────────────────────────── */}
          <Stack gap="0">
            <ColHeading>{t("Về chúng tôi")}</ColHeading>
            <Stack gap="4">
              {/* Logo + wordmark */}
              <Link
                href="/"
                tone="inverse"
                hover="none"
                display="inline-flex"
                alignItems="center"
                gap="2.5"
              >
                {/* <Center
                  w="10"
                  h="10"
                  borderRadius="lg"
                  bg="brand.700"
                  flexShrink={0}
                  border="1px solid"
                  borderColor="brand.600"
                >
                  <span style={{ fontSize: "20px", lineHeight: 1 }}>🔩</span>
                </Center> */}
                <Image
                  src={LOGO_IMAGE}
                  alt={INFO_COMPANY.shortName}
                  width="10"
                  height="10"
                  borderRadius="lg"
                />
                <Stack gap="0.5">
                  <Text
                    variant="paragraph-1"
                    weight="bold"
                    tone="inverse"
                    inline
                    lineHeight="1"
                  >
                    {t(INFO_COMPANY.shortName)}
                  </Text>
                  <Text
                    variant="caption-2"
                    tone="inverse"
                    opacity="0.8"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    {t("Máy nén Bitzer chính hãng")}
                  </Text>
                </Stack>
              </Link>

              {/* Tên đầy đủ + MST */}
              <Stack gap="1.5">
                <Text weight="bold" tone="inverse" lineHeight="1.55">
                  {t(INFO_COMPANY.fullName)}
                </Text>
                <Text variant="caption-1" tone="inverse" opacity="0.8">
                  {t("MST")}: {INFO_COMPANY.taxCode}
                </Text>
              </Stack>

              {/* Trust tags */}
              <Flex gap="2" flexWrap="wrap">
                {[
                  { icon: StarTickFilled, label: t("Chính hãng") },
                  { icon: ShieldTick, label: t("BH 12 tháng") },
                ].map((b) => (
                  <HStack
                    key={b.label}
                    gap="1.5"
                    px="2.5"
                    py="1"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="gray.700"
                    bgColor="white/5"
                  >
                    {b.icon && <b.icon size="sm" tone="trending" />}
                    <Text
                      variant="caption-2"
                      weight="medium"
                      tone="inverse"
                      inline
                    >
                      {b.label}
                    </Text>
                  </HStack>
                ))}
              </Flex>
            </Stack>
          </Stack>

          <Stack gap="0">
            <ColHeading>{t("Địa chỉ")}</ColHeading>
            <Stack gap="6">
              {/* Văn phòng */}
              <Stack gap="2">
                <Text
                  variant="caption-1"
                  weight="bold"
                  tone="trending"
                  textTransform="uppercase"
                  letterSpacing="0.07em"
                >
                  {t("Văn phòng")}
                </Text>
                <HStack gap="3" alignItems="flex-start">
                  <Center pt="1" flexShrink={0}>
                    <Location tone="trending" />
                  </Center>
                  <Text
                    variant="paragraph-2"
                    tone="inverse"
                    lineHeight="1.7"
                    opacity="0.8"
                  >
                    {t(INFO_COMPANY.address1)}
                  </Text>
                </HStack>
              </Stack>

              {/* Kho nhận hàng */}
              <Stack gap="2">
                <Text
                  variant="caption-1"
                  weight="bold"
                  tone="trending"
                  textTransform="uppercase"
                  letterSpacing="0.07em"
                >
                  {t("Kho nhận hàng")}
                </Text>
                <HStack gap="3" alignItems="flex-start">
                  <Center pt="1" flexShrink={0}>
                    <Location tone="trending" />
                  </Center>
                  <Text
                    variant="paragraph-2"
                    tone="inverse"
                    lineHeight="1.7"
                    opacity="0.8"
                  >
                    {t(INFO_COMPANY.address2)}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>

          {/* ── Col 3: Sản phẩm + Thông tin ─────────────────────────────── */}
          <Stack gap="0">
            <ColHeading>{t("Thông tin")}</ColHeading>
            <Stack gap="2.5">
              {INFO_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  tone="inverse"
                  hover="none"
                  className={navLinkCss}
                >
                  <Box
                    w="1.5"
                    h="1.5"
                    borderRadius="full"
                    bg="brand.600"
                    flexShrink={0}
                  />
                  <Text variant="paragraph-2" inline tone="inverse">
                    {t(l.label)}
                  </Text>
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack gap="0">
            <ColHeading>{t("Liên hệ")}</ColHeading>
            <Stack gap="4" mb="7">
              {/* Ms Vân */}
              <HStack gap="3" alignItems="flex-start">
                <Box pt="1" flexShrink={0}>
                  <Phone size="sm" tone="trending" />
                </Box>
                <Stack gap="0.5">
                  <Text variant="caption-1" weight="bold" tone="inverse">
                    {t(INFO_COMPANY.admin)}
                  </Text>
                  <Link
                    href={`tel:${INFO_COMPANY.phone.replace(/\s/g, "")}`}
                    tone="inverse"
                    hover="none"
                    className={contactLinkCss}
                  >
                    <Text variant="paragraph-2" inline tone="inverse">
                      {INFO_COMPANY.phone}
                    </Text>
                  </Link>
                </Stack>
              </HStack>

              {/* Email */}
              <HStack gap="3" alignItems="flex-start">
                <Box pt="1" flexShrink={0}>
                  <Envelope size="sm" tone="trending" />
                </Box>
                <Stack gap="0.5">
                  <Text variant="caption-1" weight="bold" tone="inverse">
                    Email
                  </Text>
                  <Link
                    href={`mailto:${INFO_COMPANY.email}`}
                    tone="inverse"
                    hover="none"
                    className={contactLinkCss}
                  >
                    <Text
                      variant="paragraph-2"
                      inline
                      tone="inverse"
                      wordBreak="break-all"
                    >
                      {INFO_COMPANY.email}
                    </Text>
                  </Link>
                </Stack>
              </HStack>
            </Stack>

            {/* Social */}
            <Stack gap="3">
              <Text
                variant="caption-1"
                weight="bold"
                tone="inverse"
                opacity="0.8"
                letterSpacing="0.07em"
                textTransform="uppercase"
              >
                {t("Mạng xã hội")}
              </Text>
              <HStack gap="2.5">
                {SOCIAL_LINKS.map((s) => (
                  <Link
                    key={s.title}
                    href={s.url}
                    target={s.url.startsWith("tel") ? "_self" : "_blank"}
                    tone="inverse"
                    hover="none"
                    title={s.title}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="10"
                    h="10"
                    borderRadius="full"
                    fontWeight="800"
                    fontSize="sm"
                    transition="transform 0.2s ease"
                    _hover={{
                      transform: "translateY(-3px)",
                    }}
                  >
                    {s.icon && <s.icon />}
                  </Link>
                ))}
              </HStack>
            </Stack>
          </Stack>
        </Grid>

        {/* Divider — xám */}
        <Box borderTop="1px solid" borderColor="gray.700" />
      </Box>

      {/* ── Copyright bar — brand.600 bg, chữ trắng ───────────────────────── */}
      <Box py="3.5" px={{ base: "4", md: "8" }} bg="brand.600">
        <Flex
          maxW="7xl"
          mx="auto"
          align="center"
          justify="space-between"
          flexWrap="wrap"
          gap="3"
        >
          <Text variant="caption-1" tone="inverse">
            Copyright {new Date().getFullYear()} ©{" "}
            <Text variant="caption-1" weight="bold" tone="inverse" inline>
              {t(INFO_COMPANY.bio)}
            </Text>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
