import { Box } from "@/vendors/styled-system/jsx";

interface MainContentWrapperProps {
  children: React.ReactNode;
}

export function MainContentWrapper({ children }: MainContentWrapperProps) {
  return (
    <Box px="3" py="5">
      {children}
    </Box>
  );
}
