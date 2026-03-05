import { defineConfig } from "@pandacss/dev";
import lineHeights from "./src/vendors/tokens/line-height.json";
import opacity from "./src/vendors/tokens/opacity.json";
import shadows from "./src/vendors/tokens/shadows.json";
import zIndex from "./src/vendors/tokens/zIndex.json";

export default defineConfig({
  preflight: true,
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/modules/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],
  exclude: [],

  theme: {
    extend: {
      tokens: {
        colors: {
          // Brand colors
          brand: {
            50: { value: "#f0fdf4" },
            100: { value: "#dcfce7" },
            200: { value: "#bbf7d0" },
            300: { value: "#86efac" },
            400: { value: "#4ade80" },
            500: { value: "#22c55e" }, // ← Primary green
            600: { value: "#16a34a" }, // ← Hover
            700: { value: "#15803d" },
            800: { value: "#166534" },
            900: { value: "#14532d" },
          },
          gray: {
            50: { value: "#f9fafb" },
            100: { value: "#f3f4f6" },
            200: { value: "#e5e7eb" },
            300: { value: "#d1d5db" },
            400: { value: "#9ca3af" },
            500: { value: "#6b7280" },
            600: { value: "#4b5563" },
            700: { value: "#374151" },
            800: { value: "#1f2937" },
            900: { value: "#111827" },
          },
          danger: {
            DEFAULT: { value: "#ef4444" },
            light: { value: "#fee2e2" },
          },
          warning: {
            DEFAULT: { value: "#f59e0b" },
            light: { value: "#fef3c7" },
          },
        },
        fonts: {
          heading: { value: "'Be Vietnam Pro', sans-serif" },
          body: { value: "'Inter', sans-serif" },
          mono: { value: "'JetBrains Mono', monospace" },
        },
        fontSizes: {
          xs: { value: "0.75rem" },
          sm: { value: "0.875rem" },
          md: { value: "1rem" },
          lg: { value: "1.125rem" },
          xl: { value: "1.25rem" },
          "2xl": { value: "1.5rem" },
          "3xl": { value: "1.875rem" },
          "4xl": { value: "2.25rem" },
          "5xl": { value: "3rem" },
        },
        spacing: {
          px: { value: "1px" },
          0: { value: "0" },
          1: { value: "0.25rem" },
          2: { value: "0.5rem" },
          3: { value: "0.75rem" },
          4: { value: "1rem" },
          5: { value: "1.25rem" },
          6: { value: "1.5rem" },
          8: { value: "2rem" },
          10: { value: "2.5rem" },
          12: { value: "3rem" },
          16: { value: "4rem" },
          20: { value: "5rem" },
          24: { value: "6rem" },
        },
        radii: {
          sm: { value: "0.25rem" },
          md: { value: "0.5rem" },
          lg: { value: "0.75rem" },
          xl: { value: "1rem" },
          "2xl": { value: "1.5rem" },
          full: { value: "9999px" },
        },
        zIndex,
        opacity,
        lineHeights,
        shadows,
      },

      semanticTokens: {
        colors: {
          // Semantic aliases
          "bg.default": { value: "{colors.gray.50}" },
          "bg.subtle": { value: "{colors.gray.100}" },
          "bg.card": { value: "white" },
          "text.primary": { value: "{colors.gray.900}" },
          "text.secondary": { value: "{colors.gray.600}" },
          "text.muted": { value: "{colors.gray.400}" },
          "border.default": { value: "{colors.gray.200}" },
          "accent.default": { value: "{colors.brand.500}" },
          "accent.hover": { value: "{colors.brand.600}" },
        },
      },

      recipes: {
        button: {
          className: "button",
          base: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "heading",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderRadius: "md",
            gap: "2",
            border: "none",
            outline: "none",
          },
          variants: {
            variant: {
              primary: {
                bg: "brand.500",
                color: "white",
                _hover: { bg: "brand.600", shadow: "brand" },
              },
              secondary: {
                bg: "gray.100",
                color: "gray.800",
                _hover: { bg: "gray.200" },
              },
              outline: {
                bg: "transparent",
                color: "brand.600",
                border: "1px solid",
                borderColor: "brand.500",
                _hover: { bg: "brand.50" },
              },
              ghost: {
                bg: "transparent",
                color: "gray.700",
                _hover: { bg: "gray.100" },
              },
              danger: {
                bg: "danger",
                color: "white",
                _hover: { opacity: "0.9" },
              },
            },
            size: {
              sm: { h: "8", px: "3", fontSize: "sm" },
              md: { h: "10", px: "4", fontSize: "md" },
              lg: { h: "12", px: "6", fontSize: "lg" },
            },
          },
          defaultVariants: {
            variant: "primary",
            size: "md",
          },
        },

        card: {
          className: "card",
          base: {
            bg: "bg.card",
            borderRadius: "xl",
            border: "1px solid",
            borderColor: "border.default",
            overflow: "hidden",
            transition: "all 0.2s ease",
          },
          variants: {
            variant: {
              elevated: {
                shadow: "lg",
                _hover: { shadow: "xl", transform: "translateY(-2px)" },
              },
              flat: { shadow: "sm" },
              ghost: { border: "none", shadow: "none", bg: "bg.subtle" },
            },
          },
          defaultVariants: { variant: "elevated" },
        },

        badge: {
          className: "badge",
          base: {
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "full",
            fontWeight: "600",
            fontSize: "xs",
            px: "2",
            py: "0.5",
          },
          variants: {
            colorScheme: {
              green: { bg: "brand.100", color: "brand.800" },
              gray: { bg: "gray.100", color: "gray.700" },
              red: { bg: "danger.light", color: "danger" },
              yellow: { bg: "warning.light", color: "warning" },
            },
          },
          defaultVariants: { colorScheme: "green" },
        },

        input: {
          className: "input",
          base: {
            width: "full",
            borderRadius: "md",
            border: "1px solid",
            borderColor: "border.default",
            px: "3",
            py: "2",
            fontSize: "md",
            fontFamily: "body",
            outline: "none",
            transition: "border-color 0.2s",
            _focus: {
              borderColor: "brand.500",
              ring: "2px",
              ringColor: "brand.200",
            },
            _placeholder: { color: "text.muted" },
          },
          variants: {
            size: {
              sm: { h: "8", fontSize: "sm" },
              md: { h: "10" },
              lg: { h: "12", fontSize: "lg" },
            },
          },
          defaultVariants: { size: "md" },
        },
      },
    },
  },

  jsxFramework: "react",
  outdir: "./src/vendors/styled-system",
  importMap: "@/vendors/styled-system",
});
