"use client";

import Button from "@/components/button";
import Link from "@/components/link";
import Text from "@/components/text";
import { DashboardStats } from "@/lib/admin/manage/dashboard";
import { css } from "@/vendors/styled-system/css";
import { Box, Grid, Stack } from "@/vendors/styled-system/jsx";
import { QUICK_LINKS } from "./constant";

const STAT_CARDS = (stats: DashboardStats) => [
  { label: "Tổng sản phẩm", value: stats.products, color: "brand.500" },
  { label: "Danh mục", value: stats.categories, color: "brand.600" },
  { label: "Dịch vụ", value: stats.services, color: "brand.700" },
  { label: "Hết hàng", value: stats.outOfStock, color: "danger.base" },
];

interface Props {
  stats: DashboardStats;
}

export default function DashboardClient({ stats }: Props) {
  return (
    <Box p={{ base: "4", md: "8" }}>
      <Stack gap="8">
        <Stack gap="1">
          <Text variant="section-heading-1" weight="bold" tone="primary">
            Tổng quan
          </Text>
          <Text variant="paragraph-2" tone="secondary">
            Chào mừng trở lại, Administrator
          </Text>
        </Stack>

        {/* Stat cards */}
        <Grid columns={{ base: 2, md: 4 }} gap="4">
          {STAT_CARDS(stats).map((card) => (
            <Box
              key={card.label}
              bg="white"
              borderRadius="xl"
              border="1px solid {colors.gray.200}"
              p="5"
              className={css({
                transition: "all 0.2s",
                _hover: {
                  borderColor: "brand.200",
                  transform: "translateY(-2px)",
                },
              })}
            >
              <Stack gap="2">
                <Text variant="caption-1" tone="secondary">
                  {card.label}
                </Text>
                <Text
                  variant="metric-1"
                  weight="bold"
                  className={css({ color: card.color })}
                >
                  {card.value}
                </Text>
              </Stack>
            </Box>
          ))}
        </Grid>

        {/* Quick links */}
        <Stack gap="4">
          <Text variant="paragraph-1" weight="bold" tone="primary">
            Truy cập nhanh
          </Text>
          <Grid columns={{ base: 1, md: 3 }} gap="4">
            {QUICK_LINKS.map((item) => (
              <Box
                key={item.href}
                bg="white"
                borderRadius="xl"
                border="1px solid {colors.gray.200}"
                p="5"
                className={css({
                  transition: "all 0.2s",
                  _hover: {
                    borderColor: "brand.300",
                    boxShadow: "0 4px 16px token(colors.brand.500/0.1)",
                  },
                })}
              >
                <Stack gap="3">
                  <item.icon size="lg" />
                  <Text variant="paragraph-1" weight="bold" tone="primary">
                    {item.label}
                  </Text>
                  <Link href={item.href}>
                    <Button variant="secondary" size="sm">
                      Mở →
                    </Button>
                  </Link>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
