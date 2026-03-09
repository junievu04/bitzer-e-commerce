import type { FC } from "react";
import BaseIcon, { type BaseIconProps } from "./base";

const HeartFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M11.9994 4.28037C14.4021 1.90568 18.2951 1.90688 20.6967 4.2833C23.098 6.65971 23.1016 10.5139 20.7025 12.8917L20.475 12.6632L20.7016 12.8927H20.7025L11.9994 21.5001L3.29921 12.8907C0.899542 10.513 0.900659 6.65992 3.30214 4.2833V4.28232C5.70368 1.90618 9.5968 1.90593 11.9994 4.28037Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
};

export default HeartFilled;
