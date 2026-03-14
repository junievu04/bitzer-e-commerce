"use client";

import Button from "@/components/button";
import { CrossDiagonal, Headset, Phone } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { INFO_COMPANY, SOCIAL_LINKS } from "@/constants";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex } from "@/vendors/styled-system/jsx";
import React, { useState } from "react";

const CONTACTS = [
  ...SOCIAL_LINKS.slice(0, 2),
  {
    icon: <Phone tone="inverse" />,
    url: `tel:${INFO_COMPANY.phone.replace(/\s/g, "")}`,
    title: "Hotline",
  },
];

export default function ContactButtons() {
  const [open, setOpen] = useState(false);

  return (
    <Box position="fixed" bottom="12" left="6" zIndex="topmost">
      <Flex direction="column" alignItems="flex-start" gap="2">
        {/* Sub-buttons — slide up when open */}
        {CONTACTS.map((c, i) => (
          <Flex
            key={c.title}
            alignItems="center"
            gap="2"
            transition="opacity 0.2s ease, transform 0.25s ease"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)",
              pointerEvents: open ? "auto" : "none",
              transitionDelay: open
                ? `${(CONTACTS.length - 1 - i) * 0.06}s`
                : "0s",
            }}
          >
            {/* Label */}
            <Box
              bg="brand.100"
              px="3"
              py="1"
              borderRadius="full"
              boxShadow="0 2px 8px {colors.gray.900/0.15}"
            >
              <Text
                variant="caption-1"
                weight="medium"
                color="{colors.gray.800}"
              >
                {c.title}
              </Text>
            </Box>

            {/* Icon circle */}
            <Link
              href={c.url}
              target={c.url.startsWith("tel") ? "_self" : "_blank"}
              rel="noreferrer"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p="2"
              borderRadius="full"
              flexShrink="0"
              transition="transform 0.2s ease"
              _hover={{ transform: "scale(1.12)" }}
              boxShadow="0 4px 14px {colors.gray.900/0.22}"
              bg={c.url.startsWith("tel") ? "brand.500" : undefined}
            >
              {c.icon &&
                (React.isValidElement(c.icon)
                  ? c.icon
                  : (() => {
                      const Icon = c.icon as React.ComponentType;
                      return <Icon />;
                    })())}
            </Link>
          </Flex>
        ))}

        {/* Main toggle button — wrapped for ripple rings */}
        <Box
          position="relative"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Ripple rings — only shown when closed */}
          {!open && (
            <>
              <Box className="ripple-ring" />
              <Box className="ripple-ring ripple-ring-2" />
            </>
          )}

          <Button
            onClick={() => setOpen((v) => !v)}
            transition="all 0.25s ease"
            boxShadow="0 8px 24px {colors.gray.900/0.3}"
            _hover={{ transform: "scale(1.08)" }}
            minH="0"
            aria-label="Liên hệ trực tiếp"
            className={css({
              backgroundColor: open ? "gray.800" : "brand.500",
              p: open ? "2" : "4",
            })}
          >
            <Headset
              tone="inverse"
              transition="transform 0.3s ease, opacity 0.2s ease"
              style={{
                opacity: open ? 0 : 1,
                transform: open
                  ? "rotate(90deg) scale(0.5)"
                  : "rotate(0deg) scale(1)",
              }}
            />
            <CrossDiagonal
              tone="inverse"
              transition="transform 0.3s ease, opacity 0.2s ease"
              size="sm"
              style={{
                opacity: open ? 1 : 0,
                transform: open
                  ? "rotate(0deg) scale(1)"
                  : "rotate(-90deg) scale(0.5)",
                position: "absolute",
              }}
            />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
