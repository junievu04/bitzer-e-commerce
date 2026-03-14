"use client";

import Button from "@/components/button";
import {
  ArrowLeft,
  ArrowRight,
  DoubleArrowLeft,
  DoubleArrowRight,
} from "@/components/icons";
import Text from "@/components/text";
import { Center, Flex } from "@/vendors/styled-system/jsx";
import { PaginationState } from "./types";

interface ProductPaginationProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  pagination,
  onPageChange,
}: ProductPaginationProps) {
  const { currentPage, totalPages } = pagination;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Flex justify="center" align="center" gap="1" mt="8" flexWrap="wrap">
      <Button
        variant="secondary"
        size="sm"
        iconOnly={DoubleArrowLeft}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      />

      <Button
        variant="secondary"
        size="sm"
        iconOnly={ArrowLeft}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      />

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "secondary"}
            size="sm"
            onClick={() => onPageChange(page)}
            minW="40px"
          >
            {page}
          </Button>
        ) : (
          <Center key={index} w="32px" h="32px">
            <Text variant="paragraph-2" tone="secondary">
              {page}
            </Text>
          </Center>
        ),
      )}

      <Button
        variant="secondary"
        size="sm"
        iconOnly={ArrowRight}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      />

      <Button
        variant="secondary"
        size="sm"
        iconOnly={DoubleArrowRight}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      />
    </Flex>
  );
}
