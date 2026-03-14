import { css, cx } from "@/vendors/styled-system/css";
import { Box, BoxProps } from "@/vendors/styled-system/jsx";

export interface SkeletonProps extends BoxProps {
  duration?: number;
}

const Skeleton = ({ duration = 1600, className, ...rest }: SkeletonProps) => {
  return (
    <Box
      bg="gray.200"
      borderRadius="md"
      className={cx(
        css({ animation: "skeleton-pulse infinite ease-in-out" }),
        className,
      )}
      style={{ animationDuration: `${duration}ms` }}
      {...rest}
    />
  );
};

export default Skeleton;
