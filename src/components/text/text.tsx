import { css, cx } from "@/vendors/styled-system/css";
import { styled, type HTMLStyledProps } from "@/vendors/styled-system/jsx";
import React from "react";
import { textRecipe } from "./text.recipe";

type TextVariants =
  | "metric-1"
  | "metric-2"
  | "metric-3"
  | "page-heading-1"
  | "page-heading-2"
  | "section-heading-1"
  | "section-heading-2"
  | "paragraph-1"
  | "paragraph-2"
  | "caption-1"
  | "caption-2";

const TEXT_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "div",
  "label",
] as const;
type TextTags = (typeof TEXT_TAGS)[number];
const availableTags = new Set<string>(TEXT_TAGS);

type TextWeights = "light" | "normal" | "medium" | "bold";

type TextTones =
  | "primary"
  | "inverse"
  | "secondary"
  | "placeholder"
  | "inactive"
  | "disabled"
  | "link"
  | "link-disabled"
  | "success"
  | "warning"
  | "error"
  | "trending"
  | "neutral-light";

type TextDecorations = "overline" | "underline" | "line-through";

type TextAlignments = "left" | "center" | "right" | "justify";

const truncateMap = {
  2: { WebkitLineClamp: 2 },
  3: { WebkitLineClamp: 3 },
  4: { WebkitLineClamp: 4 },
} as const;

const variantMapping: Record<TextVariants, TextTags> = {
  "metric-1": "span",
  "metric-2": "span",
  "metric-3": "span",
  "page-heading-1": "h1",
  "page-heading-2": "h2",
  "section-heading-1": "h3",
  "section-heading-2": "h4",
  "paragraph-1": "p",
  "paragraph-2": "p",
  "caption-1": "span",
  "caption-2": "span",
};

// ✅ Single styled component using 'span' as base — rendered tag is
// controlled entirely by the `as` prop, avoiding the union-of-refs problem.
const StyledText = styled("span", textRecipe);

const isValidTag = (tag: unknown): tag is TextTags =>
  typeof tag === "string" && availableTags.has(tag);

const getTruncateClass = (truncate?: 1 | 2 | 3 | 4) => {
  if (!truncate) return "";
  if (truncate === 1) {
    return css({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "block",
    });
  }
  return css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    // @ts-expect-error - WebkitBoxOrient is not a valid CSS property in TS
    WebkitBoxOrient: "vertical",
    ...truncateMap[truncate],
  });
};

type BaseTextProps = {
  variant?: TextVariants;
  weight?: TextWeights;
  tone?: TextTones;
  align?: TextAlignments;
  decoration?: TextDecorations;
  truncate?: 1 | 2 | 3 | 4;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  htmlTag?: TextTags;
};

// ✅ Props are grounded to HTMLStyledProps<'span'> — a single concrete type,
// no more generic E causing the "too complex union" error.
// Include htmlFor for label support.
type TextProps = BaseTextProps &
  Omit<HTMLStyledProps<"span">, keyof BaseTextProps> & {
    htmlFor?: string;
  };

const Text = ({
  htmlTag,
  variant = "paragraph-2",
  weight = "normal",
  tone = "primary",
  align = "left",
  decoration,
  truncate,
  inline,
  className,
  children,
  ...rest
}: TextProps) => {
  const mappedTag = variantMapping[variant];
  const requestedTag = htmlTag ?? mappedTag;
  const element: TextTags = isValidTag(requestedTag) ? requestedTag : "p";

  return (
    <StyledText
      as={element}
      weight={weight}
      variant={variant}
      tone={tone}
      align={align}
      decoration={decoration}
      inline={inline}
      className={cx(getTruncateClass(truncate), className)}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

export type {
  TextAlignments,
  TextDecorations,
  TextProps,
  TextTags,
  TextTones,
  TextVariants,
  TextWeights,
};
export default Text;
