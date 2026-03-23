"use client";

import Button from "@/components/button";
import Text from "@/components/text";
import TextField from "@/components/text-field";
import type { ProductSpecification } from "@/modules/products";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";

interface Props {
  value: ProductSpecification[];
  onChange: (specs: ProductSpecification[]) => void;
}

export default function SpecificationFields({ value, onChange }: Props) {
  function addRow() {
    onChange([...value, { label: "", value: "" }]);
  }

  function removeRow(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function updateRow(
    index: number,
    key: keyof ProductSpecification,
    val: string,
  ) {
    onChange(
      value.map((row, i) => (i === index ? { ...row, [key]: val } : row)),
    );
  }

  return (
    <Stack gap="2">
      <Text htmlTag="label" truncate={1} flexGrow={1}>
        Thông số kỹ thuật
      </Text>

      {value.length > 0 && (
        <Stack gap="2">
          {/* Header */}
          <Flex gap="2" display={{ base: "none", md: "flex" }}>
            <Box flex="1">
              <Text variant="caption-1" weight="medium" tone="secondary">
                Tên thông số
              </Text>
            </Box>
            <Box flex="1">
              <Text variant="caption-1" weight="medium" tone="secondary">
                Giá trị
              </Text>
            </Box>
            <Box w="8" />
          </Flex>

          {/* Rows */}
          {value.map((spec, i) => (
            <Flex key={i} gap="2" alignItems="center">
              <Box flex="1">
                <TextField
                  placeholder="Ví dụ: Công suất"
                  value={spec.label}
                  onChange={(e) => updateRow(i, "label", e.target.value)}
                />
              </Box>
              <Box flex="1">
                <TextField
                  placeholder="Ví dụ: 5.2 kW"
                  value={spec.value}
                  onChange={(e) => updateRow(i, "value", e.target.value)}
                />
              </Box>
              <Button
                variant="plain"
                size="sm"
                onClick={() => removeRow(i)}
                className={css({
                  w: "8",
                  h: "8",
                  p: "0",
                  flexShrink: 0,
                  color: "danger.base",
                  _hover: { bg: "danger.light" },
                  borderRadius: "md",
                })}
              >
                ✕
              </Button>
            </Flex>
          ))}
        </Stack>
      )}

      <Button
        variant="secondary"
        size="sm"
        onClick={addRow}
        className={css({ alignSelf: "flex-start" })}
      >
        + Thêm thông số
      </Button>
    </Stack>
  );
}
