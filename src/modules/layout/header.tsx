"use client";
import Button from "@/components/button";
import { Cart, Icon3Lines, MagnifyingGlass } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import TextField from "@/components/text-field/text-field";
import { useCart } from "@/hooks";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Center, Flex, HStack, Stack } from "@/vendors/styled-system/jsx";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/contact", label: "Liên hệ" },
];

export function Header() {
  const { t } = useIntl();
  const { totalItems } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const links = NAV_LINKS;

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
      zIndex="topmost"
      bg="white"
      shadow={scrolled ? "md" : "none"}
      transition="all 0.3s ease"
    >
      {/* ── Main row ──────────────────────────────────────────────────────── */}
      <Flex
        w="100%"
        mx="auto"
        maxW={1280}
        p="3"
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
                whiteSpace="nowrap"
                _hover={{ color: "brand.600" }}
              >
                {t(l.label)}
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
            placeholder={t("Tìm kiếm sản phẩm...")}
            onChange={(e) => setQuery(e.target.value)}
            leftAdornment={MagnifyingGlass}
            action={
              <Button type="submit" size="sm" flexShrink={0}>
                {t("Tìm")}
              </Button>
            }
          />
        </Box>

        {/* Right actions */}
        <HStack gap="3" flexShrink={0}>
          <LanguageSwitcher />
          <Link href="/cart" position="relative">
            <Cart />
            {totalItems > 0 && (
              <Center
                position="absolute"
                top="-2"
                right="-2"
                w="4"
                h="4"
                bg="red.500"
                borderRadius="full"
              >
                <Text variant="caption-2" tone="inverse" weight="bold">
                  {totalItems > 99 ? "99+" : totalItems}
                </Text>
              </Center>
            )}
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
            <Button type="submit" size="sm" flexShrink={0}>
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
