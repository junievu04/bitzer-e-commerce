"use client";

import { ArrowDown, CircleCrossFilled } from "@/components/icons";
import { BaseIconProps } from "@/components/icons/base";
import Text from "@/components/text/text";
import { css } from "@/vendors/styled-system/css";
import {
  Box,
  Divider,
  Flex,
  HTMLStyledProps,
  styled,
} from "@/vendors/styled-system/jsx";
import { forwardRef, useCallback, useRef, useState } from "react";
import { textFieldContainerRecipe } from "./text-field.recipe";

// ─── Styled primitives ────────────────────────────────────────────────────────

const Input = styled("input", {
  base: {
    flex: "1 0 0",
    outline: "none",
    bg: "transparent",
    border: "none",
    fontSize: "sm",
    fontFamily: "body",
    color: "inherit",
    _placeholder: { color: "text.muted" },
    _focus: { outline: "none", boxShadow: "none" },
    _disabled: { cursor: "not-allowed" },
  },
});

const SelectInput = styled("select", {
  base: {
    bg: "transparent",
    outline: "none",
    border: "none",
    appearance: "none",
    cursor: "default",
    fontSize: "sm",
    fontFamily: "body",
    color: "inherit",
    px: "3",
    pr: "8",
    py: "2",
    _disabled: { opacity: 1 },
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PrefixDropdownOption {
  value: string;
  label: string;
}

export interface PrefixDropdownProps extends HTMLStyledProps<"select"> {
  options: PrefixDropdownOption[];
}

export interface TextFieldProps extends Omit<HTMLStyledProps<"input">, "size"> {
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

// ─── Component ────────────────────────────────────────────────────────────────

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
    const [length, setLength] = useState(
      () => String(value ?? defaultValue ?? "").length,
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setInputRef = useCallback(
      (element: HTMLInputElement | null) => {
        inputRef.current = element;
        if (typeof ref === "function") ref(element);
        else if (ref) ref.current = element;
      },
      [ref],
    );

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

    const prefixDropdownId =
      selectName || selectId || `${inputId}-prefix-dropdown`;

    const getState = (): "default" | "focused" | "error" | "disabled" => {
      if (disabled) return "disabled";
      if (error) return "error";
      if (focused) return "focused";
      return "default";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLength(e.target.value.length);
      onChange?.(e);
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

    return (
      <Flex direction="column" gap="1">
        {/* ── Label row ──────────────────────────────────────────────────── */}
        {(label || maxLength) && (
          <Flex align="center" justify="end" gap="2">
            {label && (
              <Text
                htmlTag="label"
                htmlFor={inputId}
                variant="paragraph-2"
                weight="medium"
                tone="primary"
                style={{ flexGrow: 1 }}
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

        {/* ── Input container ────────────────────────────────────────────── */}
        <Box
          className={textFieldContainerRecipe({ state: getState() })}
          onClick={() => !disabled && inputRef.current?.focus()}
        >
          {/* Prefix dropdown */}
          {prefixDropdown && (
            <>
              <Box position="relative" flexShrink={0}>
                <SelectInput
                  id={prefixDropdownId}
                  name={prefixDropdownId}
                  value={selectValue}
                  defaultValue={selectDefaultValue}
                  disabled={disabled}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    selectOnChange?.(e);
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-invalid={error}
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
                  right="2"
                  top="50%"
                  transform="translateY(-50%)"
                  pointerEvents="none"
                />
              </Box>
              <Divider
                orientation="vertical"
                color="border.default"
                thickness="1.5px"
                height="auto"
                alignSelf="stretch"
              />
            </>
          )}

          {/* Left adornment */}
          {LeftAdornment && (
            <Box display="flex" alignItems="center" pl="3" flexShrink={0}>
              <LeftAdornment
                aria-hidden="true"
                tone={focused ? "link" : "secondary"}
                className={css({ transition: "color 0.2s" })}
              />
            </Box>
          )}

          {/* Inner: prefix · input · suffix */}
          <Flex align="center" flex="1 0 0" px="3" py="2" gap="2">
            {prefix && (
              <Text variant="paragraph-1" htmlTag="span" tone="secondary">
                {prefix}
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
              <Text variant="paragraph-1" htmlTag="span" tone="secondary">
                {suffix}
              </Text>
            )}
          </Flex>

          {/* Right adornment */}
          {RightAdornment && (
            <Box display="flex" alignItems="center" pr="3" flexShrink={0}>
              <RightAdornment
                aria-hidden="true"
                tone={focused ? "link" : "secondary"}
                className={css({ transition: "color 0.2s" })}
              />
            </Box>
          )}

          {/* Action slot (e.g. submit button) */}
          {action && (
            <Box display="flex" alignItems="stretch" flexShrink={0}>
              {action}
            </Box>
          )}
        </Box>

        {/* ── Message / error ────────────────────────────────────────────── */}
        {message && (
          <Flex gap="1" id={messageId}>
            {error && (
              <CircleCrossFilled
                tone="error"
                size="sm"
                style={{ flexShrink: 0 }}
              />
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
