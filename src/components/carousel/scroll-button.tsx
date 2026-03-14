import { styled } from "@/vendors/styled-system/jsx";
import { ButtonHTMLAttributes } from "react";

type Direction = "prev" | "next";

type ScrollButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: Direction;
};

const StyledButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    w: "10",
    h: "10",
    borderRadius: "full",
    bg: "brand.500",
    border: "none",
    cursor: "pointer",
    flexShrink: "0",
    transitionDuration: "200ms",
    _hover: { bg: "brand.600" },
    _disabled: {
      bg: "gray.100",
      borderColor: "gray.200",
      cursor: "not-allowed",
      "& path": { stroke: "gray.400" },
    },
  },
  variants: {
    direction: {
      prev: {
        "& svg": { transform: "rotate(180deg)" },
      },
      next: {},
    },
  },
});

export default function ScrollButton({
  direction,
  ...props
}: ScrollButtonProps) {
  return (
    <StyledButton direction={direction} aria-label={direction} {...props}>
      <svg
        width={8}
        height={14}
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L7 7L1 13"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StyledButton>
  );
}
