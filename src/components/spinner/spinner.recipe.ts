import { cva, type RecipeVariantProps } from "@/vendors/styled-system/css";

export const spinnerContainerRecipe = cva({
  base: {
    display: "inline-block",
    animation: "spin 1.4s linear infinite",
  },
});

export const spinnerSvgRecipe = cva({
  base: {
    w: "100%",
    h: "100%",
  },
});

export const spinnerCircleRecipe = cva({
  base: {
    strokeDasharray: "80px, 200px",
    strokeDashoffset: "0",
    animation: "spinner_dash 1.4s ease-in-out infinite",
    strokeLinecap: "round",
    fill: "none",
  },
  variants: {
    tone: {
      // "default" → primary brand green (closest to interaction default)
      default: { stroke: "{colors.brand.500}" },
      // "primary" → main text/icon color
      primary: { stroke: "{colors.text.primary}" },
      // "secondary" → secondary text
      secondary: { stroke: "{colors.text.secondary}" },
      // "success" → brand green (no dedicated success token, brand.500 is green)
      success: { stroke: "{colors.brand.600}" },
      // "link" → accent default (brand.500)
      link: { stroke: "{colors.accent.default}" },
      // "link-disabled" → muted text
      "link-disabled": { stroke: "{colors.text.muted}" },
      // "disabled" → muted text
      disabled: { stroke: "{colors.text.muted}" },
      // "warning" → warning default
      warning: { stroke: "{colors.warning}" },
      // "placeholder" → muted text
      placeholder: { stroke: "{colors.text.muted}" },
      // "inactive" → secondary text
      inactive: { stroke: "{colors.text.secondary}" },
      // "error" → danger default
      error: { stroke: "{colors.danger}" },
      // "inverse" → white (used on dark backgrounds)
      inverse: { stroke: "white" },
      // "trending" → brand.400 (vibrant highlight)
      trending: { stroke: "{colors.brand.400}" },
      // "inherit" → follow parent color
      inherit: { stroke: "currentColor" },
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

export type SpinnerCircleVariants = RecipeVariantProps<
  typeof spinnerCircleRecipe
>;
