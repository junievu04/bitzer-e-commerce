"use client";
import Button from "@/components/button";
import { Cart, Icon3Lines, MagnifyingGlass } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import TextField from "@/components/text-field/text-field";
import { INFO_COMPANY, LOGO_FULLNAME_IMAGE } from "@/constants";
import { NAV_LINKS } from "@/constants/layout-links";
import { useCart } from "@/hooks";
import { useIntl } from "@/utils/intl";
import { Box, Center, Flex, HStack, Stack } from "@/vendors/styled-system/jsx";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LanguageSwitcher from "./language-switcher";

export default function Header() {
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
    if (!q || q === " ") router.push(`/products`);
    else router.push(`/products?text=${encodeURIComponent(q)}`);
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
        <Link
          href="/"
          display="flex"
          flexShrink={0}
          alignItems="center"
          gap="1"
        >
          <Image
            src={LOGO_FULLNAME_IMAGE}
            alt={INFO_COMPANY.shortName}
            width={150}
            height="12"
            borderRadius="lg"
          />
        </Link>

        <HStack gap="5" display={{ base: "none", lg: "flex" }} flexShrink={0}>
          {links.map((l) => (
            <Link key={l.pathname} href={l.pathname} transition="color 0.2s">
              <Text
                weight="medium"
                tone={isActive(l.pathname) ? "success" : "secondary"}
                whiteSpace="nowrap"
                _hover={{ color: "brand.600" }}
              >
                {t(l.label)}
              </Text>
            </Link>
          ))}
        </HStack>

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
              key={l.pathname}
              href={l.pathname}
              onClick={() => setMenuOpen(false)}
              py="2"
              fontWeight="medium"
              color={isActive(l.pathname) ? "brand.600" : "text.secondary"}
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
