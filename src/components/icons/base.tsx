import { cva, type RecipeVariantProps } from "@/vendors/styled-system/css";
import { HTMLStyledProps, styled } from "@/vendors/styled-system/jsx";
import { FC } from "react";

// ─── Icon recipe ──────────────────────────────────────────────────────────────
// Size tokens → spacing scale from panda.config.ts
//   xs → 5  = 1.25rem
//   sm → 7  ≈ 1.75rem  (no 7 in config, use w/h directly)
//   md → 10 = 2.5rem
//   lg → 12 = 3rem
//
// Tone tokens → semantic + raw tokens from panda.config.ts

const iconStyle = cva({
  base: {},
  variants: {
    size: {
      xs: { width: "3", height: "3" }, // 0.75rem
      sm: { width: "4", height: "4" }, // 1rem (Panda generates from spacing scale)
      md: { width: "6", height: "6" }, // 1.5rem
      lg: { width: "8", height: "8" }, // 2rem
    },
    tone: {
      // text.primary   → gray.900
      default: { color: "text.primary" },
      primary: { color: "text.primary" },

      // text.secondary → gray.600
      secondary: { color: "text.secondary" },

      // brand.500 (accent.default)
      link: { color: "accent.default" },

      // brand.600 (accent.hover) — darker, for hover/active states
      "link-disabled": { color: "text.muted" },

      // text.muted → gray.400
      disabled: { color: "text.muted" },
      placeholder: { color: "text.muted" },
      inactive: { color: "text.muted" },

      // brand.500 — same as link (success icons are brand green)
      success: { color: "accent.default" },

      // warning.DEFAULT → #f59e0b
      warning: { color: "warning.DEFAULT" },

      // danger.DEFAULT → #ef4444
      error: { color: "danger.DEFAULT" },

      // white — for icons on dark/colored backgrounds
      inverse: { color: "white" },

      // brand.400 — slightly lighter green for "trending/highlight"
      trending: { color: "brand.400" },

      // inherit from parent — useful when Button controls color via its own recipe
      inherit: { color: "inherit" },
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

type IconVariants = RecipeVariantProps<typeof iconStyle>;

export type BaseIconProps = HTMLStyledProps<typeof Component> & IconVariants;

// ─── Styled component — outside render (Panda rule) ───────────────────────────

const Component = styled("svg", iconStyle);

// ─── BaseIcon ─────────────────────────────────────────────────────────────────

const BaseIcon: FC<BaseIconProps> = ({
  children,
  viewBox,
  size,
  tone,
  ...props
}) => {
  return (
    <Component
      size={size}
      tone={tone}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ?? "0 0 24 24"}
      fill="none"
      {...props}
    >
      {children}
    </Component>
  );
};

export default BaseIcon;
