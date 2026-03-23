"use client";

import Text from "@/components/text";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex } from "@/vendors/styled-system/jsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error";

export interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number; // ms, default 3000
  onClose: () => void;
}

export function Toast({ type, message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const closeTimer = setTimeout(onClose, duration);
    return () => {
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const isSuccess = type === "success";

  if (typeof document === "undefined") return null;

  return createPortal(
    <Box
      position="fixed"
      top="6"
      left="50%"
      zIndex="topmost"
      className={css({
        transform: "translateX(-50%)",
        animation: "animate-slide-up 0.3s ease forwards",
        pointerEvents: "none",
      })}
    >
      <Flex
        alignItems="center"
        gap="3"
        bg="white"
        borderRadius="xl"
        px="4"
        py="3"
        boxShadow="0 8px 32px {colors.gray.900/0.15}"
        border="1px solid"
        borderColor={isSuccess ? "brand.200" : "danger.base"}
        minW="280px"
        maxW="420px"
      >
        {/* Icon */}
        <Box
          w="8"
          h="8"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          bg={isSuccess ? "brand.100" : "danger.light"}
          fontSize="md"
        >
          {isSuccess ? "✓" : "✕"}
        </Box>

        {/* Message */}
        <Text
          variant="paragraph-2"
          weight="medium"
          tone={isSuccess ? "success" : "error"}
          className={css({ flex: 1 })}
        >
          {message}
        </Text>
      </Flex>
    </Box>,
    document.body,
  );
}
