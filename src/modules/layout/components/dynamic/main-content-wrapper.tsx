import { Box } from "@/vendors/styled-system/jsx";

interface MainContentWrapperProps {
  children: React.ReactNode;
  id?: string;
}

export default function MainContentWrapper({
  children,
  id,
}: MainContentWrapperProps) {
  return (
    <Box px="3" py="5" id={id}>
      {children}
    </Box>
  );
}
