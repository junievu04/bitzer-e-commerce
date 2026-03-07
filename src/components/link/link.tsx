import { HTMLStyledProps, styled } from "@/vendors/styled-system/jsx";
import NLink from "next/link";
import { forwardRef } from "react";
import { TextVariants, TextWeights } from "../text/text";
import { textRecipe } from "../text/text.recipe";

export type LinkSizes = "sm" | "md" | "lg";

export type LinkTones = "link" | "primary" | "inverse";

const textVariantMapping: Record<LinkSizes, TextVariants> = {
  lg: "paragraph-1",
  md: "paragraph-2",
  sm: "caption-1",
};

const textWeightMapping: Record<LinkSizes, TextWeights> = {
  lg: "normal",
  md: "normal",
  sm: "medium",
};

const prefixes = ["http", "/", "#", "mailto:", "tel:"];

const needsPrefix = (href: string) => {
  return !prefixes.some((prefix) => href.startsWith(prefix));
};

// ─── Styled component ──────────────────────────────────────────────────────

const Component = styled(NLink, {
  base: {
    cursor: "pointer",
    textDecoration: "none",
    textUnderlinePosition: "from-font",
    transition: "color 0.15s ease",
  },
  variants: {
    underline: {
      true: { textDecoration: "underline" },
      false: {},
    },
    hover: {
      underline: { _hover: { textDecoration: "underline" } },
      changeColor: { _hover: { color: "accent.default" } },
      none: {},
    },
  },
  defaultVariants: {
    underline: false,
    hover: "none",
  },
});

interface LinkProps extends HTMLStyledProps<typeof Component> {
  size?: LinkSizes;
  tone?: LinkTones;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      size = "md",
      tone = "link",
      href: originalHref,
      prefetch = false,
      children,
      ...props
    },
    ref,
  ) => {
    let href = originalHref?.toString() || "";
    if (needsPrefix(href)) {
      href = `/${href}`;
    }

    return (
      <Component
        ref={ref}
        href={href}
        prefetch={prefetch}
        {...textRecipe.raw({
          variant: textVariantMapping[size],
          weight: textWeightMapping[size],
          tone: tone,
        })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Link.displayName = "Link";

export default Link;
