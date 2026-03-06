import { cva } from "@/vendors/styled-system/css";

export const textRecipe = cva({
  base: {
    lineHeight: "normal",
  },
  variants: {
    variant: {
      "metric-1": {
        fontSize: { base: "4xl", md: "5xl" },
        letterSpacing: "0.0125rem",
        fontWeight: "bold",
      },
      "metric-2": {
        fontSize: { base: "xl", md: "2xl" },
        letterSpacing: "0.0125rem",
        fontWeight: "bold",
      },
      "metric-3": {
        fontSize: { base: "sm", md: "md" },
        letterSpacing: "0.0125rem",
        fontWeight: "bold",
      },
      "page-heading-1": {
        fontSize: { base: "3xl", md: "4xl" },
        letterSpacing: "0.0125rem",
        fontWeight: "bold",
      },
      "page-heading-2": {
        fontSize: { base: "lg", md: "2xl" },
        letterSpacing: "0.0125rem",
        fontWeight: "bold",
      },
      "section-heading-1": {
        fontSize: { base: "2xl", md: "3xl" },
        letterSpacing: "0.0125rem",
        fontWeight: "bold",
      },
      "section-heading-2": {
        fontSize: { base: "lg", md: "2xl" },
        letterSpacing: "0.0125rem",
        fontWeight: "bold",
      },
      "paragraph-1": {
        fontSize: { base: "md", md: "xl" },
      },
      "paragraph-2": {
        fontSize: { base: "sm", md: "md" },
      },
      "caption-1": {
        fontSize: { base: "xs", md: "sm" },
      },
      "caption-2": {
        fontSize: { base: "xs", md: "xs" },
      },
    },
    weight: {
      light: { fontWeight: "lighter" },
      normal: {},
      medium: { fontWeight: "500" },
      bold: { fontWeight: "bold" },
    },
    tone: {
      primary: { color: "text.primary" },
      inverse: { color: "white" },
      secondary: { color: "text.secondary" },
      placeholder: { color: "text.muted" },
      inactive: { color: "text.muted" },
      disabled: { color: "text.muted" },
      link: { color: "accent.default" },
      "link-disabled": { color: "text.muted" },
      success: { color: "brand.600" },
      warning: { color: "warning" },
      error: { color: "danger" },
      trending: { color: "brand.400" },
      "neutral-light": { color: "gray.300" },
    },
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
      justify: { textAlign: "justify" },
    },
    decoration: {
      overline: { textDecoration: "overline" },
      "line-through": { textDecoration: "line-through" },
      underline: { textDecoration: "underline" },
    },
    inline: {
      true: { display: "inline" },
    },
  },
  defaultVariants: {
    variant: "paragraph-2",
    weight: "normal",
    tone: "primary",
    align: "left",
    inline: false,
  },
});
