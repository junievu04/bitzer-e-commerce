import { Box } from "@/vendors/styled-system/jsx";
import { ReactNode } from "react";

export default function ModalBackdrop({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <Box
      position="fixed"
      inset="0"
      zIndex="modal"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="4"
      bg="gray.900/60"
      onClick={onClose}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        p={{ base: "5", md: "8" }}
        w="full"
        maxW="540px"
        maxH="90vh"
        overflow="auto"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        boxShadow="0 24px 64px {colors.gray.900/0.2}"
      >
        {children}
      </Box>
    </Box>
  );
}
