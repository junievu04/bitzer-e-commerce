import Text from "@/components/text";
import { Box } from "@/vendors/styled-system/jsx";

export default function ErrorBox({ message }: { message: string }) {
  return (
    <Box
      bg="danger.light"
      borderRadius="md"
      px="3"
      py="2"
      border="1px solid {colors.danger.base}"
    >
      <Text variant="caption-1" tone="error">
        {message}
      </Text>
    </Box>
  );
}
