import Skeleton from "@/components/skeleton";
import { Flex, Stack } from "@/vendors/styled-system/jsx";

const SkeletonRows = ({ count = 5 }: { count?: number }) => (
  <Stack gap="0">
    {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
      <Flex
        key={i}
        px="4"
        py="4"
        gap="4"
        alignItems="center"
        borderBottom="1px solid {colors.gray.100}"
      >
        <Skeleton flex="2" h="20px" />
        <Skeleton flex="1" h="16px" />
        <Skeleton flex="1" h="16px" />
        <Skeleton w="60px" h="16px" />
        <Skeleton w="110px" h="32px" borderRadius="md" />
      </Flex>
    ))}
  </Stack>
);
export default SkeletonRows;
