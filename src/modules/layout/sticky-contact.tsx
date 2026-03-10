"use client";

import Button from "@/components/button/button";
import Link from "@/components/link/link";
import Text from "@/components/text/text";
import { css } from "@/vendors/styled-system/css";
import { Box, Stack } from "@/vendors/styled-system/jsx";
import { useState } from "react";

const ZALO_NUMBER = process.env.NEXT_PUBLIC_ZALO_NUMBER ?? "0909123456";
const MESSENGER_URL =
  process.env.NEXT_PUBLIC_MESSENGER_URL ?? "https://m.me/YOUR_PAGE_ID";
const HOTLINE = "0909123456";

export function StickyContact() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Stack
      position="fixed"
      right="5"
      bottom="6"
      zIndex="sticky"
      align="flex-end"
      gap="2.5"
    >
      {expanded && (
        <>
          {/* Hotline pill */}
          <Link
            href={`tel:${HOTLINE}`}
            tone="primary"
            hover="none"
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "2",
              bg: "white",
              px: "4",
              py: "2",
              borderRadius: "full",
              border: "1.5px solid",
              borderColor: "border.default",
              boxShadow: "lg",
              whiteSpace: "nowrap",
              animation: "slide-up 0.25s ease backwards",
              _hover: { boxShadow: "xl", textDecoration: "none" },
            })}
          >
            <Text variant="paragraph-2" weight="bold" tone="primary">
              📞 {HOTLINE}
            </Text>
          </Link>

          {/* Zalo */}
          <Link
            href={`https://zalo.me/${ZALO_NUMBER}`}
            tone="inverse"
            hover="none"
            className={css({
              w: "11",
              h: "11",
              borderRadius: "full",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "slide-up 0.2s 0.04s ease backwards",
              _hover: { transform: "scale(1.08)", textDecoration: "none" },
              transition: "transform 0.2s ease",
            })}
            style={{
              background: "#0068FF",
              boxShadow: "0 4px 14px rgba(0,104,255,.45)",
            }}
          >
            <Text variant="paragraph-1" weight="bold" tone="inverse" inline>
              Z
            </Text>
          </Link>

          {/* Messenger */}
          <Link
            href={MESSENGER_URL}
            tone="inverse"
            hover="none"
            className={css({
              w: "11",
              h: "11",
              borderRadius: "full",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "slide-up 0.2s 0.08s ease backwards",
              _hover: { transform: "scale(1.08)", textDecoration: "none" },
              transition: "transform 0.2s ease",
            })}
            style={{
              background: "linear-gradient(135deg,#0099FF,#a033ff)",
              boxShadow: "0 4px 14px rgba(160,51,255,.4)",
            }}
          >
            <MessengerIcon />
          </Link>
        </>
      )}

      {/* Toggle */}
      <Box position="relative" display="inline-flex">
        <Button
          variant={expanded ? "destructive" : "default"}
          size="lg"
          onClick={() => setExpanded((p) => !p)}
          aria-label={expanded ? "Đóng" : "Liên hệ nhanh"}
          className={css({
            w: "13",
            minH: "13",
            px: "0",
            borderRadius: "full",
            fontSize: "xl",
            transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
          })}
        >
          {expanded ? "✕" : "💬"}
        </Button>

        {!expanded && (
          <Box
            position="absolute"
            inset="0"
            borderRadius="full"
            border="2px solid"
            borderColor="brand.500"
            pointerEvents="none"
            className={css({ animation: "pulse-ring 2s ease-in-out infinite" })}
          />
        )}
      </Box>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(12px) scale(.88); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: .8; }
          70%  { transform: scale(1.4); opacity: 0;  }
          100% { transform: scale(1.4); opacity: 0;  }
        }
      `}</style>
    </Stack>
  );
}

function MessengerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.726 7.21V21l3.405-1.869c.91.252 1.875.388 2.869.388 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm1.008 12.474l-2.548-2.718-4.972 2.718 5.472-5.812 2.608 2.718 4.912-2.718-5.472 5.812z" />
    </svg>
  );
}
