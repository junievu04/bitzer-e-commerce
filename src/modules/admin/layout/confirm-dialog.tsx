"use client";

import Button from "@/components/button";
import { CircleQuestionFilled, Dustbin } from "@/components/icons";
import Text from "@/components/text";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Xác nhận",
  cancelLabel = "Huỷ",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Focus confirm + ESC/Enter keyboard support
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onCancel, onConfirm]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <Box
        position="fixed"
        inset="0"
        zIndex="overlay"
        bg="gray.900/60"
        className={css({ backdropFilter: "blur(2px)" })}
        onClick={onCancel}
      />

      {/* Dialog */}
      <Box
        position="fixed"
        zIndex="modal"
        left="50%"
        top="50%"
        w="min(340px, 90vw)"
        className={css({ transform: "translate(-50%, -50%)" })}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <Box
          bg="white"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="0 20px 60px {colors.gray.900/0.18}"
        >
          {/* Icon + content */}
          <Stack
            gap="3"
            alignItems="center"
            justifyContent="center"
            px="6"
            pt="7"
            pb="5"
          >
            {/* Icon circle */}
            <Box
              w="14"
              h="14"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={danger ? "danger.light" : "brand.100"}
            >
              <Box fontSize="2xl">
                {danger ? <Dustbin /> : <CircleQuestionFilled />}
              </Box>
            </Box>

            <Text
              id="confirm-dialog-title"
              variant="paragraph-1"
              weight="bold"
              align="center"
              tone="primary"
            >
              {title}
            </Text>

            {description && (
              <Text
                variant="caption-1"
                tone="secondary"
                align="center"
                className={css({ lineHeight: "1.6" })}
              >
                {description}
              </Text>
            )}
          </Stack>

          {/* Divider */}
          <Box h="1px" bg="gray.200" />

          {/* Actions */}
          <Flex>
            {/* Cancel */}
            <Button
              variant="plain"
              fullWidth
              autoFocus
              borderRadius="0"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>

            {/* Vertical divider */}
            <Box w="1px" bg="gray.200" />

            {/* Confirm */}
            <Button
              fullWidth
              variant="destructive"
              autoFocus
              borderRadius="0"
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </Flex>
        </Box>
      </Box>
    </>,
    document.body,
  );
}

export default ConfirmDialog;
