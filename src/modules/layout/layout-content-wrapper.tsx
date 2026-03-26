import { Flex } from "@/vendors/styled-system/jsx";
import { ReactNode, Suspense } from "react";

interface LayoutContentWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function LayoutContentWrapper({
  children,
  fallback = null,
}: LayoutContentWrapperProps) {
  return (
    <Flex direction="column" maxW={1304} mx="auto" w="full" py="1">
      <Suspense fallback={fallback}>{children}</Suspense>
    </Flex>
  );
}
