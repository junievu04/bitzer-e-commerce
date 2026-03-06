"use client";
import { Cart } from "@/components/icons";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, HStack, Stack } from "@/vendors/styled-system/jsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/products", labelKey: "nav.products" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/news", labelKey: "nav.news" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

export function Header() {
  const { t } = useIntl();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = NAV_LINKS.map((l) => ({ ...l, label: t(l.labelKey) }));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="white"
      borderBottom="1px solid"
      borderColor={scrolled ? "border.default" : "transparent"}
      shadow={scrolled ? "md" : "none"}
      transition="all 0.3s ease"
    >
      <Flex
        maxW="1280px"
        mx="auto"
        px={{ base: "4", md: "8" }}
        h="16"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <Link href="/">
          <Box
            fontFamily="heading"
            fontSize="2xl"
            fontWeight="900"
            color="brand.600"
          >
            BITZER
            <Box as="span" color="gray.400">
              shop
            </Box>
          </Box>
        </Link>

        {/* Nav desktop */}
        <HStack gap="6" display={{ base: "none", md: "flex" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={css({
                fontSize: "sm",
                fontWeight: "500",
                color: "text.secondary",
                _hover: { color: "brand.600" },
                transition: "color 0.2s",
              })}
            >
              {l.label}
            </Link>
          ))}
        </HStack>

        {/* Right actions */}
        <HStack gap="3">
          <LanguageSwitcher />
          <Cart />
          {/* Mobile menu toggle */}
          <Box
            display={{ base: "flex", md: "none" }}
            cursor="pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </Box>
        </HStack>
      </Flex>

      {/* Mobile menu */}
      {menuOpen && (
        <Stack
          px="4"
          pb="4"
          gap="2"
          display={{ base: "flex", md: "none" }}
          bg="white"
          borderTop="1px solid"
          borderColor="border.default"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={css({
                py: "2",
                fontSize: "sm",
                color: "text.secondary",
                _hover: { color: "brand.600" },
              })}
            >
              {l.label}
            </Link>
          ))}
        </Stack>
      )}
    </Box>
  );
}
