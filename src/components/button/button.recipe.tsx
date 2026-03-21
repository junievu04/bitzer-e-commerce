import { cva } from "@/vendors/styled-system/css";

export const buttonRecipe = cva({
  base: {
    borderRadius: "full",
    border: "solid 1px transparent",
    transition: "all 0.3s ease-in-out",
    _disabled: {
      pointerEvents: "none",
    },
    WebkitTapHighlightColor: "transparent",
    "& .MuiCircularProgress-root": {
      color: "inherit",
    },
  },
  variants: {
    variant: {
      default: {
        bgColor: "brand.500",
        color: "white",
        _hover: {
          bgColor: { md: "brand.600" },
        },
        _active: {
          bgColor: "brand.600",
        },
        _disabled: {
          bgColor: "brand.200",
          color: "text.muted",
        },
      },
      secondary: {
        bgColor: "transparent",
        color: "text.primary",
        borderColor: "brand.500",
        _hover: {
          bgColor: { md: "brand.50" },
        },
        _active: {
          bgColor: "brand.50",
        },
        _disabled: {
          color: "text.muted",
          borderColor: "brand.200",
        },
      },
      highlight: {
        bgColor: "brand.100",
        color: "accent.default",
        borderColor: "brand.200",
        _hover: {
          bgColor: { md: "brand.200" },
        },
        _active: {
          bgColor: "brand.200",
        },
        _disabled: {
          color: "text.muted",
        },
      },
      "highlight-secondary": {
        bgColor: "accent.default",
        color: "white",
        borderColor: "accent.default",
        _hover: {
          bgColor: { md: "accent.hover" },
        },
        _active: {
          bgColor: "accent.hover",
        },
        _disabled: {
          bgColor: "brand.100",
          color: "text.muted",
          borderColor: "brand.200",
        },
      },
      "highlight-plain": {
        bgColor: "transparent",
        color: "accent.default",
        _hover: {
          bgColor: { md: "brand.50" },
        },
        _active: {
          bgColor: "brand.50",
        },
        _disabled: {
          color: "text.muted",
        },
      },
      plain: {
        bgColor: "transparent",
        color: "brand.500",
        _hover: {
          bgColor: { md: "gray.100" },
        },
        _active: {
          bgColor: "gray.100",
        },
        _disabled: {
          color: "text.muted",
        },
      },
      destructive: {
        bgColor: "danger.base",
        color: "white",
        _hover: {
          bgColor: { md: "danger.hover" },
        },
        _active: {
          bgColor: "danger.hover",
        },
        _disabled: {
          bgColor: "danger.light",
        },
      },
      none: {},
    },
    size: {
      sm: { minH: "7" }, //1.75rem
      md: { minH: "9" }, //2.25rem
      lg: { minH: "12" }, //3rem
    },
    iconOnly: {
      true: {},
      false: {},
    },
    fullWidth: {
      true: { width: "100%" },
      false: { width: "auto" },
    },
    onDark: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    // iconOnly: false (default button padding)
    {
      size: "sm",
      iconOnly: false,
      css: { p: "calc({spacing.1} - 1px) calc({spacing.3} - 1px)" },
    },
    {
      size: "md",
      iconOnly: false,
      css: { p: "calc({spacing.2} - 1px) calc({spacing.4} - 1px)" },
    },
    {
      size: "lg",
      iconOnly: false,
      css: { p: "calc({spacing.3} - 1px) calc({spacing.6} - 1px)" },
    },
    // iconOnly: true (square padding)
    {
      size: "sm",
      iconOnly: true,
      css: { p: "calc({spacing.1} - 1px)" },
    },
    {
      size: "md",
      iconOnly: true,
      css: { p: "calc({spacing.2} - 1px)" },
    },
    {
      size: "lg",
      iconOnly: true,
      css: { p: "calc({spacing.3} - 1px)" },
    },
    // onDark: true variants
    {
      variant: "default",
      onDark: true,
      css: {
        bgColor: "white",
        color: "text.primary",
        _hover: { bgColor: { md: "gray.100" } },
        _active: { bgColor: "gray.100" },
        _disabled: { bgColor: "gray.200" },
      },
    },
    {
      variant: "secondary",
      onDark: true,
      css: {
        color: "white",
        borderColor: "gray.400",
        _hover: { bgColor: { md: "gray.700" } },
        _active: { bgColor: "gray.700" },
        _disabled: { borderColor: "gray.600" },
      },
    },
    {
      variant: "highlight-plain",
      onDark: true,
      css: {
        color: "brand.300",
        _hover: { bgColor: { md: "gray.700" } },
        _active: { bgColor: "gray.700" },
      },
    },
    {
      variant: "plain",
      onDark: true,
      css: {
        color: "white",
        _hover: { bgColor: { md: "gray.700" } },
        _active: { bgColor: "gray.700" },
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    iconOnly: false,
    fullWidth: false,
    onDark: false,
  },
});
