"use client";
import {
  Envelope,
  Facebook,
  Location,
  Mail,
  Messenger,
  Phone,
  ShieldTick,
  StarTickFilled,
  Zalo,
} from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text/text";
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCT_LINKS = [
  { label: "Phụ tùng Bitzer", href: "/products?category=phu-tung-bitzer" },
  { label: "Dịch vụ sửa chữa", href: "/products?category=dich-vu" },
  { label: "Phụ tùng điện lạnh", href: "/products?category=dien-lanh" },
  { label: "Gas lạnh", href: "/products?category=gas-lanh" },
];

const INFO_LINKS = [
  { label: "Giới thiệu", href: "/about" },
  { label: "Tin tức kỹ thuật", href: "/news" },
  { label: "Liên hệ", href: "/contact" },
  { label: "Chính sách bảo hành", href: "/warranty" },
  { label: "Chính sách đổi trả", href: "/returns" },
];

const SOCIAL_LINKS = [
  {
    label: Facebook,
    href: "https://facebook.com/YOUR_PAGE",
    title: "Facebook",
  },
  {
    label: Zalo,
    href: "https://",
    title: "Zalo",
  },
  {
    label: Mail,
    href: "https://",
    title: "Mail",
  },
  {
    label: Messenger,
    href: "https://",
    title: "Messenger",
  },
];

const BOTTOM_LINKS = [
  { label: "Điều khoản", href: "/terms" },
  { label: "Bảo mật", href: "/privacy" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

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

// Contact links: trắng 70% → brand.400 on hover
const contactLinkCss = css({
  color: "white",
  opacity: "0.7",
  transition: "opacity 0.15s ease, color 0.15s ease",
  _hover: { opacity: "1", color: "brand.400", textDecoration: "none" },
});

// ─── ColHeading ───────────────────────────────────────────────────────────────

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <Box
      pb="2"
      mb="6"
      borderBottom="1px solid"
      borderColor="gray.700"
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

export function Footer() {
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
                <Center
                  w="10"
                  h="10"
                  borderRadius="lg"
                  bg="brand.700"
                  flexShrink={0}
                  border="1px solid"
                  borderColor="brand.600"
                >
                  <span style={{ fontSize: "20px", lineHeight: 1 }}>🔩</span>
                </Center>
                <Stack gap="0.5">
                  <Box lineHeight="1">
                    <Text
                      variant="paragraph-1"
                      weight="bold"
                      tone="inverse"
                      inline
                    >
                      BITZER
                    </Text>
                    <Text
                      variant="paragraph-1"
                      weight="bold"
                      inline
                      tone="trending"
                    >
                      shop
                    </Text>
                  </Box>
                  <Text
                    variant="caption-2"
                    tone="inverse"
                    opacity="0.8"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    {t("Điện Lạnh Đại Tín")}
                  </Text>
                </Stack>
              </Link>

              {/* Tên đầy đủ + MST */}
              <Stack gap="1.5">
                <Text weight="bold" tone="inverse" lineHeight="1.55">
                  {t("CÔNG TY TNHH TM VÀ DV CÔNG NGHỆ ĐIỆN LẠNH ĐẠI TÍN")}
                </Text>
                <Text variant="caption-1" tone="inverse" opacity="0.8">
                  MST: 0318617669
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

          {/* ── Col 2: Địa chỉ ───────────────────────────────────────────── */}
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
                    {t(
                      "Tầng 12 - Tháp A2, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, P. Hoà Hưng, TP. Hồ Chí Minh",
                    )}
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
                    {t("8A Hẻm F11, Vĩnh Lộc A, Bình Chánh, TP. Hồ Chí Minh")}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>

          {/* ── Col 3: Sản phẩm + Thông tin ─────────────────────────────── */}
          <Stack gap="0">
            <ColHeading>{t("Sản phẩm")}</ColHeading>
            <Stack gap="2.5" mb="7">
              {PRODUCT_LINKS.map((l) => (
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
                    {l.label}
                  </Text>
                </Link>
              ))}
            </Stack>

            {/* Sub-heading Thông tin */}
            <Box pb="3" mb="4" borderBottom="1px solid {colors.gray.700}">
              <Text variant="paragraph-2" weight="bold" tone="inverse">
                {t("Thông tin")}
              </Text>
            </Box>
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
                    {l.label}
                  </Text>
                </Link>
              ))}
            </Stack>
          </Stack>

          {/* ── Col 4: Liên Hệ + Social ──────────────────────────────────── */}
          <Stack gap="0">
            <ColHeading>{t("Liên Hệ")}</ColHeading>
            <Stack gap="4" mb="7">
              {/* Ms Vân */}
              <HStack gap="3" alignItems="flex-start">
                <Box pt="1" flexShrink={0}>
                  <Phone size="sm" tone="trending" />
                </Box>
                <Stack gap="0.5">
                  <Text variant="caption-1" weight="bold" tone="inverse">
                    {t("Ms. Vân (Kinh doanh)")}
                  </Text>
                  <Link
                    href="tel:0962884529"
                    tone="inverse"
                    hover="none"
                    className={contactLinkCss}
                  >
                    <Text variant="paragraph-2" inline tone="inverse">
                      0962 884 529
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
                    href="mailto:info.congnghedaitin@gmail.com"
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
                      info.congnghedaitin@gmail.com
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
                    href={s.href}
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
                    {s.label && <s.label />}
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
              Điện Lạnh Đại Tín
            </Text>
          </Text>
          <HStack gap="4">
            {BOTTOM_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                size="sm"
                tone="inverse"
                hover="none"
                className={css({
                  color: "white",
                  opacity: "0.8",
                  _hover: { opacity: "1", textDecoration: "underline" },
                  transition: "opacity 0.15s ease",
                })}
              >
                {label}
              </Link>
            ))}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
