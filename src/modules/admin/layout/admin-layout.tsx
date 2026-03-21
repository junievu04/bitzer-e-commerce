"use client";

import Button from "@/components/button";
import { Boxes, ClipboardPaper, Gear, ThumbsUp } from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import { INFO_COMPANY, LOGO_IMAGE } from "@/constants";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Tổng quan", icon: ClipboardPaper },
  { href: "/admin/products", label: "Sản phẩm", icon: Gear },
  { href: "/admin/categories", label: "Danh mục", icon: Boxes },
  { href: "/admin/services", label: "Dịch vụ", icon: ThumbsUp },
];

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { t } = useIntl();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Sidebar */}
      <Box
        w="240px"
        bg="gray.900"
        display={{ base: "none", lg: "flex" }}
        flexDirection="column"
        flexShrink={0}
        position="sticky"
        top="0"
        h="100vh"
        overflow="auto"
      >
        {/* Logo */}
        <Box px="5" py="6" borderBottom="1px solid {colors.gray.700}">
          <Flex alignItems="center" gap="2">
            <Box
              w="8"
              h="8"
              borderRadius="lg"
              bg="brand.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={LOGO_IMAGE}
                alt={INFO_COMPANY.shortName}
                width="10"
                height="10"
                borderRadius="lg"
              />
            </Box>
            <Stack gap="0">
              <Text variant="paragraph-2" weight="bold" tone="inverse">
                BITZERshop
              </Text>
              <Text
                variant="caption-2"
                tone="inverse"
                className={css({ opacity: "0.5" })}
              >
                Admin Panel
              </Text>
            </Stack>
          </Flex>
        </Box>

        {/* Nav */}
        <Stack gap="1" p="3" flex="1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} display="block">
                <Flex
                  alignItems="center"
                  gap="3"
                  px="3"
                  py="2.5"
                  borderRadius="lg"
                  bg={isActive ? "brand.600" : "transparent"}
                  className={css({
                    transition: "all 0.15s",
                    _hover: { bg: isActive ? "brand.600" : "gray.700" },
                  })}
                >
                  <item.icon size="md" tone="inverse" />
                  <Text
                    variant="paragraph-2"
                    weight={isActive ? "bold" : "medium"}
                    tone="inverse"
                    className={css({ opacity: isActive ? "1" : "0.7" })}
                  >
                    {t(item.label)}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </Stack>

        {/* User + logout */}
        <Box px="3" py="4" borderTop="1px solid {colors.gray.700}">
          <Stack gap="2">
            <Flex alignItems="center" gap="2" px="2">
              <Box
                w="7"
                h="7"
                borderRadius="full"
                bg="brand.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Text variant="caption-2" weight="bold" tone="inverse">
                  A
                </Text>
              </Box>
              <Text
                variant="caption-1"
                tone="inverse"
                className={css({ opacity: "0.8" })}
              >
                {session?.user?.name ?? "Admin"}
              </Text>
            </Flex>
            <Button
              size="sm"
              fullWidth
              onClick={() => signOut({ callbackUrl: "/admin-login" })}
            >
              {t("Đăng xuất")}
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Main */}
      <Box flex="1" overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}
