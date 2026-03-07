"use client";
import Button from "@/components/button";
import { Cart, Icon3Lines } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { Box, Flex, HStack, Stack } from "@/vendors/styled-system/jsx";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

const NAV_LINKS = {
  vi: [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/news", label: "Tin tức" },
    { href: "/contact", label: "Liên hệ" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Header() {
  const { lang } = useIntl();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = NAV_LINKS[lang];
  const pathname = usePathname();

  const isActive = useCallback(
    (href: string) => {
      return pathname.startsWith(href);
    },
    [pathname],
  );

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
      <Flex
        w="100%"
        mx="auto"
        maxW={1280}
        px="3"
        h="16"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <Link href="/" display="flex">
          <Text variant="metric-2" tone="success">
            BITZER
          </Text>
          <Text tone="neutral-light" variant="page-heading-2">
            shop
          </Text>
        </Link>

        {/* Nav desktop */}
        <HStack gap="6" display={{ base: "none", md: "flex" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} transition="color 0.2s">
              <Text
                weight="medium"
                tone={isActive(l.href) ? "success" : "secondary"}
                _hover={{ color: "brand.600" }}
              >
                {l.label}
              </Text>
            </Link>
          ))}
        </HStack>

        {/* Right actions */}
        <HStack gap="3">
          <LanguageSwitcher />
          <Link href="/cart">
            <Cart />
          </Link>
          {/* Mobile menu toggle */}
          <Button
            display={{ base: "flex", md: "none" }}
            size="sm"
            bgColor="transparent"
            _active={{ bgColor: "transparent" }}
            alignItems="center"
            p={0}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon3Lines />
          </Button>
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
              py="2"
              fontSize="sm"
              color="text.secondary"
              _hover={{ color: "brand.600" }}
            >
              {l.label}
            </Link>
          ))}
        </Stack>
      )}
    </Box>
  );
}
