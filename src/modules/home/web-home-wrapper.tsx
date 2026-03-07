import { Flex } from "@/vendors/styled-system/jsx";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <Flex direction="column" maxW={1304} mx="auto" w="full">
      {children}
    </Flex>
  );
}
