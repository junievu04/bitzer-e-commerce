import { Flex } from "@/vendors/styled-system/jsx";

interface LayoutContentWrapperProps {
  children: React.ReactNode;
}

export default function LayoutContentWrapper({
  children,
}: LayoutContentWrapperProps) {
  return (
    <Flex direction="column" maxW={1304} mx="auto" w="full" py="1">
      {children}
    </Flex>
  );
}
