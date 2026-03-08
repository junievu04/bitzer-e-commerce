import { cva } from "@/vendors/styled-system/css";

export const textFieldContainerRecipe = cva({
  base: {
    color: "text.primary",
    display: "flex",
    alignItems: "center",
    border: "1.5px solid",
    borderRadius: "full",
    transition: "all 0.2s ease",
    cursor: "text",
    position: "relative",
    overflow: "hidden",
    bg: "gray.50",
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
        boxShadow: "0 0 0 3px token(colors.brand.500/0.15)",
      },
      error: {
        borderColor: "danger.DEFAULT",
        bg: "white",
      },
      disabled: {
        borderColor: "border.default",
        color: "text.muted",
        bg: "gray.100",
        cursor: "not-allowed",
        opacity: "0.6",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});
