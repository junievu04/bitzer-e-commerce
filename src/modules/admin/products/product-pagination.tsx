"use client";

import Button from "@/components/button";
import Text from "@/components/text";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex } from "@/vendors/styled-system/jsx";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  page,
  totalPages,
  total,
  pageSize,
  hasNext,
  hasPrev,
  onPageChange,
}: Props) {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  // Build page numbers — show max 5 pages around current
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap="3"
      pt="2"
    >
      {/* Info */}
      <Text variant="caption-1" tone="secondary">
        {from}–{to} / {total} sản phẩm
      </Text>

      {/* Page numbers */}
      <Flex gap="1" alignItems="center">
        {/* Prev */}
        <Button
          variant="plain"
          size="sm"
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
          className={css({ color: hasPrev ? "gray.700" : "gray.300" })}
        >
          ←
        </Button>

        {pages.map((p, i) =>
          p === "..." ? (
            <Box key={`ellipsis-${i}`} px="2">
              <Text variant="caption-1" tone="secondary">
                …
              </Text>
            </Box>
          ) : (
            <Button
              key={p}
              variant={p === page ? "default" : "plain"}
              size="sm"
              disabled={totalPages <= 1}
              onClick={() => onPageChange(p as number)}
              className={css({
                minW: "8",
                h: "8",
                borderRadius: "md",
                fontWeight: p === page ? "bold" : "normal",
              })}
            >
              {p}
            </Button>
          ),
        )}

        {/* Next */}
        <Button
          variant="plain"
          size="sm"
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
          className={css({ color: hasNext ? "gray.700" : "gray.300" })}
        >
          →
        </Button>
      </Flex>
    </Flex>
  );
}
