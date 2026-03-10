"use client";

import useCharacterCounter from "@/hooks/use-character-counter";
import { Flex, HTMLStyledProps, styled } from "@/vendors/styled-system/jsx";
import {
  ComponentProps,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { CircleCrossFilled } from "../icons";
import Text from "../text";
import { textRecipe } from "../text/text.recipe";

const TextAreaInput = styled("textarea", {
  base: {
    resize: "none",
    flex: "1 0 0",
    outline: "none",
    bg: "transparent",
    _placeholder: {
      color: "text.accent.hover",
    },
    ...textRecipe.raw({ variant: "paragraph-2" }),
  },
});

const Container = styled(Flex, {
  base: {
    border: "2px solid",
    borderRadius: "lg",
    transition: "all 0.3s ease-in-out",
    p: {
      base: "calc({spacing.2} - 2px)",
      md: "calc({spacing.3} - 2px)",
    },
    cursor: "text",
  },
  variants: {
    state: {
      default: {
        borderColor: "border.default",
        bg: "gray.50",
        _hover: {
          borderColor: "gray.300",
        },
      },
      focused: {
        borderColor: "brand.500",
        bg: "white",
      },
      error: {
        borderColor: "danger.base",
        bg: "white",
      },
      disabled: {
        borderColor: "border.default",
        bg: "gray.100",
        cursor: "default",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export interface TextAreaProps extends HTMLStyledProps<"textarea"> {
  label?: string;
  message?: string;
  error?: boolean;
  labelProps?: ComponentProps<typeof Text>;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      maxLength,
      rows = 4,
      value,
      defaultValue,
      label,
      message,
      error = false,
      placeholder,
      disabled = false,
      onChange,
      onBlur,
      onFocus,
      labelProps,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const setInputRef = useCallback(
      (element: HTMLTextAreaElement | null) => {
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

    const handleContainerClick = () => {
      if (disabled) return;
      setFocused(true);
      inputRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLength(e.target.value.length);
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e);
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
                {...labelProps}
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
        <Container state={getContainerState()} onClick={handleContainerClick}>
          <Flex pt="0.5" pb="1" flex="1 0 0">
            <TextAreaInput
              id={inputId}
              name={inputId}
              maxLength={maxLength}
              rows={rows}
              value={value}
              defaultValue={defaultValue}
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

TextArea.displayName = "TextArea";

export default TextArea;
