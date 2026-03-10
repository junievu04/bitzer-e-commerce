"use client";

import Text from "@/components/text";
import useCharacterCounter from "@/hooks/use-character-counter";
import {
  Box,
  Divider,
  Flex,
  HTMLStyledProps,
  styled,
} from "@/vendors/styled-system/jsx";
import { forwardRef, useCallback, useRef, useState } from "react";
import { ArrowDown, CircleCrossFilled } from "../icons";
import { BaseIconProps } from "../icons/base";
import { textRecipe } from "../text/text.recipe";
import { textFieldContainerRecipe } from "./text-field.recipe";

const Input = styled("input", {
  base: {
    flex: "1 0 0",
    outline: "none",
    bg: "transparent",
    _placeholder: {
      color: "text.accent.hover",
    },
    ...textRecipe.raw({ variant: "paragraph-2" }),
    color: "inherit",
  },
});

const SelectInput = styled("select", {
  base: {
    width: "100%",
    bg: "transparent",
    outlineOffset: 1,
    borderLeftRadius: "lg",
    appearance: "none",
    overflow: "hidden",
    cursor: "default",
    ...textRecipe.raw({ variant: "paragraph-2" }),
    color: "inherit",
    _disabled: {
      opacity: 1,
    },
    p: {
      base: "calc({spacing.1})",
      md: "calc({spacing.2})",
    },
  },
});

const Container = styled(Flex, textFieldContainerRecipe);

export interface PrefixDropdownOption {
  value: string;
  label: string;
}

export interface PrefixDropdownProps extends HTMLStyledProps<"select"> {
  options: PrefixDropdownOption[];
}
export interface TextFieldProps extends HTMLStyledProps<"input"> {
  label?: string;
  message?: string;
  error?: boolean;
  leftAdornment?: React.ComponentType<BaseIconProps>;
  rightAdornment?: React.ComponentType<BaseIconProps>;
  prefix?: string;
  suffix?: string;
  action?: React.ReactNode;
  prefixDropdown?: PrefixDropdownProps;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      name,
      maxLength,
      value,
      defaultValue,
      label,
      message,
      error = false,
      placeholder,
      disabled = false,
      leftAdornment: LeftAdornment,
      rightAdornment: RightAdornment,
      prefix,
      suffix,
      action,
      prefixDropdown,
      onChange,
      onBlur,
      onFocus,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setInputRef = useCallback(
      (element: HTMLInputElement | null) => {
        inputRef.current = element;
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref],
    );

    const [length, setLength] = useCharacterCounter(value, defaultValue);

    const inputId = name || id || "";
    const messageId = `${inputId}-message`;

    const {
      id: selectId,
      name: selectName,
      value: selectValue,
      defaultValue: selectDefaultValue,
      options = [],
      onChange: selectOnChange,
      onFocus: selectOnFocus,
      onBlur: selectOnBlur,
      ...selectRest
    } = prefixDropdown || {};

    const [prefixValue, setPrefixValue] = useState(selectDefaultValue);

    const prefixDropdownId =
      selectName || selectId || `${inputId}-prefix-dropdown`;

    const handleContainerClick = () => {
      if (disabled) return;
      setFocused(true);
      inputRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLength(e.target.value.length);
      onChange?.(e);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPrefixValue(e.target.value);
      selectOnChange?.(e);
    };

    const handleFocus = (
      e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      setFocused(true);
      if (e.target instanceof HTMLInputElement) {
        onFocus?.(e as React.FocusEvent<HTMLInputElement>);
      } else {
        selectOnFocus?.(e as React.FocusEvent<HTMLSelectElement>);
      }
    };

    const handleBlur = (
      e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      setFocused(false);
      if (e.target instanceof HTMLInputElement) {
        onBlur?.(e as React.FocusEvent<HTMLInputElement>);
      } else {
        selectOnBlur?.(e as React.FocusEvent<HTMLSelectElement>);
      }
    };

    const getContainerState = ():
      | "default"
      | "focused"
      | "error"
      | "disabled" => {
      if (disabled) return "disabled";
      if (error) return "error";
      if (focused) return "focused";
      return "default";
    };

    return (
      <Flex
        direction="column"
        gap={{
          base: "1",
          md: "2",
        }}
      >
        {(label || maxLength) && (
          <Flex align="center" justify="end" gap="2">
            {label && (
              <Text
                htmlTag="label"
                htmlFor={inputId}
                variant="paragraph-2"
                truncate={1}
                flexGrow={1}
              >
                {label}
              </Text>
            )}
            {maxLength && (
              <Text
                variant="caption-1"
                htmlTag="span"
                weight="medium"
                tone={error && length > maxLength ? "error" : "secondary"}
                aria-live="polite"
              >
                {`${length}/${maxLength}`}
              </Text>
            )}
          </Flex>
        )}
        <Container state={getContainerState()}>
          {prefixDropdown && (
            <>
              <Box position="relative">
                <SelectInput
                  id={prefixDropdownId}
                  name={prefixDropdownId}
                  value={selectValue}
                  defaultValue={selectDefaultValue}
                  disabled={disabled}
                  onChange={handleSelectChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-invalid={error}
                  aria-describedby={message ? messageId : undefined}
                  {...selectRest}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectInput>
                <ArrowDown
                  size="sm"
                  aria-hidden="true"
                  tone="primary"
                  position="absolute"
                  right={{
                    base: "2",
                    md: "3",
                  }}
                  top="50%"
                  transform="translateY(-50%)"
                  pointerEvents="none"
                />
              </Box>
              <Divider
                orientation="vertical"
                color="inherit"
                thickness="2px"
                height="auto"
                alignSelf="stretch"
              />
            </>
          )}
          <Flex
            align="center"
            flex="1 0 0"
            p={{
              base: "calc({spacing.1})",
              md: "calc({spacing.2})",
            }}
            pl={
              prefixDropdown
                ? {
                    base: "calc({spacing.1})",
                    md: "calc({spacing.2})",
                  }
                : undefined
            }
            gap="2"
            onClick={handleContainerClick}
          >
            {LeftAdornment && (
              <LeftAdornment
                aria-hidden="true"
                tone={focused ? "primary" : "placeholder"}
                transition="all 0.3s ease-in-out"
              />
            )}
            <Flex align="center" pt="0.5" pb="1" gap="2" flex="1 0 0">
              {prefix && (
                <Text variant="paragraph-2" htmlTag="span" tone="disabled">
                  {prefix}
                </Text>
              )}
              {disabled && prefixValue && (
                <Text variant="paragraph-2" htmlTag="span" tone="disabled">
                  {prefixValue}
                </Text>
              )}
              <Input
                id={inputId}
                name={inputId}
                maxLength={maxLength}
                value={value}
                defaultValue={defaultValue}
                size={1}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={setInputRef}
                aria-invalid={error}
                aria-describedby={message ? messageId : undefined}
                {...rest}
              />
              {suffix && (
                <Text variant="paragraph-2" htmlTag="span" tone="disabled">
                  {suffix}
                </Text>
              )}
            </Flex>
            {RightAdornment && (
              <RightAdornment
                aria-hidden="true"
                tone={focused ? "primary" : "placeholder"}
                transition="all 0.3s ease-in-out"
              />
            )}
            {action}
          </Flex>
        </Container>
        {message && (
          <Flex gap="1" id={messageId}>
            {error && (
              <CircleCrossFilled tone="error" size="sm" flexShrink={0} />
            )}
            <Text
              variant="caption-1"
              weight="medium"
              tone={error ? "error" : "secondary"}
            >
              {message}
            </Text>
          </Flex>
        )}
      </Flex>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
