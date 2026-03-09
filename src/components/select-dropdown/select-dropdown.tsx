"use client";

import Button from "@/components/button";
import { ButtonVariants } from "@/components/button/button";
import { ArrowDown } from "@/components/icons";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { Box } from "@/vendors/styled-system/jsx";
import { useState } from "react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

type DropdownPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface SelectDropdownProps<T extends string = string> {
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  width?: string;
  dropdownWidth?: string;
  dropdownPosition?: DropdownPosition;
  variant?: ButtonVariants;
}

const getDropdownPositionStyles = (position: DropdownPosition) => {
  switch (position) {
    case "top-left":
      return { bottom: "100%", left: "0", mb: "1" };
    case "top-right":
      return { bottom: "100%", right: "0", mb: "1" };
    case "bottom-right":
      return { top: "100%", right: "0", mt: "1" };
    case "bottom-left":
    default:
      return { top: "100%", left: "0", mt: "1" };
  }
};

export function SelectDropdown<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  width = "220px",
  dropdownWidth = "280px",
  dropdownPosition = "bottom-left",
  variant = "default",
}: SelectDropdownProps<T>) {
  const { t } = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const positionStyles = getDropdownPositionStyles(dropdownPosition);

  return (
    <Box position="relative" w={{ base: "full", md: width }}>
      <Button
        variant={variant}
        rightIcon={ArrowDown}
        onClick={() => setIsOpen(!isOpen)}
        w="full"
        justifyContent="space-between"
        borderRadius={variant === "secondary" ? "sm" : "full"}
      >
        <Text
          truncate={1}
          fontWeight={variant === "secondary" ? "normal" : "bold"}
          color="inherit"
        >
          {t(selectedOption?.label || placeholder)}
        </Text>
      </Button>

      {isOpen && (
        <>
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex="10"
            onClick={() => setIsOpen(false)}
          />
          <Box
            position="absolute"
            {...positionStyles}
            bg="white"
            borderRadius="md"
            boxShadow="0 4px 20px token(colors.gray.900/0.15)"
            zIndex="20"
            w={dropdownWidth}
            border="1px solid"
            borderColor="gray.200"
          >
            {options.map((option) => (
              <Box
                key={option.value}
                as="button"
                display="block"
                w="full"
                textAlign="left"
                px="4"
                py="3"
                cursor="pointer"
                transition="all 0.15s ease"
                bg={value === option.value ? "brand.50" : "transparent"}
                _hover={{ bg: "gray.50" }}
                onClick={() => handleSelect(option.value)}
              >
                <Text
                  variant="paragraph-2"
                  weight={value === option.value ? "bold" : "normal"}
                  tone={value === option.value ? "link" : "primary"}
                >
                  {t(option.label)}
                </Text>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
