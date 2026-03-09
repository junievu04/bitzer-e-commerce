import type { FC } from "react";
import BaseIcon, { type BaseIconProps } from "./base";

const Minus: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </BaseIcon>
  );
};

export default Minus;
