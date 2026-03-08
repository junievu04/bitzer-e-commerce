"use client";
import Button from "@/components/button";
import { Cart, Icon3Lines, MagnifyingGlass } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import TextField from "@/components/text-field/text-field";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, HStack, Stack } from "@/vendors/styled-system/jsx";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

const NAV_LINKS = {
  vi: [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/services", label: "Dịch vụ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/news", label: "Tin tức" },
    { href: "/contact", label: "Liên hệ" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Header() {
  const { lang, t } = useIntl();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const links = NAV_LINKS[lang];

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname],
  );

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/products?q=${encodeURIComponent(q)}`);
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex={1}
      bg="white"
      borderBottom="1px solid"
      borderColor={scrolled ? "border.default" : "transparent"}
      shadow={scrolled ? "md" : "none"}
      transition="all 0.3s ease"
    >
      {/* ── Main row ──────────────────────────────────────────────────────── */}
      <Flex
        w="100%"
        mx="auto"
        maxW={1280}
        px="3"
        h="16"
        alignItems="center"
        gap="5"
        justifyContent="space-between"
      >
        {/* Logo */}
        <Link href="/" display="flex" flexShrink={0}>
          <Text variant="metric-2" tone="success">
            BITZER
          </Text>
          <Text tone="neutral-light" variant="page-heading-2">
            shop
          </Text>
        </Link>

        {/* Desktop nav */}
        <HStack gap="5" display={{ base: "none", lg: "flex" }} flexShrink={0}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} transition="color 0.2s">
              <Text
                weight="medium"
                tone={isActive(l.href) ? "success" : "secondary"}
                className={css({
                  whiteSpace: "nowrap",
                  _hover: { color: "brand.600" },
                })}
              >
                {l.label}
              </Text>
            </Link>
          ))}
        </HStack>

        {/* ── Search bar ─────────────────────────────────────────────────── */}
        <Box
          as="form"
          flex="1"
          display={{ base: "none", md: "block" }}
          onSubmit={handleSearch}
        >
          <TextField
            value={query}
            placeholder={
              lang === "vi" ? "Tìm kiếm sản phẩm..." : "Search products..."
            }
            onChange={(e) => setQuery(e.target.value)}
            leftAdornment={MagnifyingGlass}
            action={
              <Button
                type="submit"
                h="full"
                px="4"
                bg="brand.500"
                color="white"
                fontSize="sm"
                fontWeight="600"
                border="none"
                cursor="pointer"
                flexShrink={0}
                transition="background 0.2s"
                className={css({
                  _hover: { bg: "brand.600" },
                  borderRadius: "0",
                })}
              >
                {t("Tìm")}
              </Button>
            }
          />
        </Box>

        {/* Right actions */}
        <HStack gap="3" flexShrink={0}>
          <LanguageSwitcher />
          <Link href="/cart">
            <Cart />
          </Link>
          <Button
            display={{ base: "flex", lg: "none" }}
            size="sm"
            bgColor="transparent"
            _active={{ bgColor: "transparent" }}
            _hover={{ bgColor: "transparent" }}
            p={0}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon3Lines />
          </Button>
        </HStack>
      </Flex>

      {/* ── Mobile search — below the header row ──────────────────────────── */}
      <Box
        as="form"
        display={{ base: "block", md: "none" }}
        mx="3"
        mb="3"
        onSubmit={handleSearch}
      >
        <TextField
          value={query}
          placeholder={t("Tìm kiếm sản phẩm...")}
          onChange={(e) => setQuery(e.target.value)}
          leftAdornment={MagnifyingGlass}
          action={
            <Button
              type="submit"
              h="full"
              px="4"
              bg="brand.500"
              color="white"
              fontSize="sm"
              fontWeight="600"
              border="none"
              cursor="pointer"
              className={css({
                _hover: { bg: "brand.600" },
                borderRadius: "0",
              })}
            >
              {t("Tìm")}
            </Button>
          }
        />
      </Box>

      {/* ── Mobile nav menu ───────────────────────────────────────────────── */}
      {menuOpen && (
        <Stack
          px="4"
          pb="4"
          gap="2"
          display={{ base: "flex", lg: "none" }}
          bg="white"
          borderTop="1px solid {colors.border.default}"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              py="2"
              fontWeight="medium"
              color={isActive(l.href) ? "brand.600" : "text.secondary"}
              className={css({ _hover: { color: "brand.600" } })}
            >
              {l.label}
            </Link>
          ))}
        </Stack>
      )}
    </Box>
  );
}
