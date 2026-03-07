import { styled } from "@/vendors/styled-system/jsx";

const PaginationBullet = styled("button", {
  base: {
    flex: "0 0 8px",
    h: "2",
    bg: "gray.300",
    borderRadius: "full",
    border: "none",
    cursor: "pointer",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease-in-out",
    p: "0",
  },
  variants: {
    active: {
      true: {
        flex: "0 0 24px",
        bg: "brand.500",
      },
    },
  },
});

export default PaginationBullet;
