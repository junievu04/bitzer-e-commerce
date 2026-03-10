import type { FC } from "react";
import BaseIcon, { type BaseIconProps } from "./base";

const TravelHotel: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.669 3.05703C20.035 2.92016 20.4475 3.009 20.7246 3.28457C21.0017 3.56025 21.093 3.97245 20.958 4.33925L15.0635 20.3519C14.9207 20.7399 14.554 20.9999 14.1406 21.0062C13.7274 21.0126 13.3531 20.7644 13.1983 20.3812L10.4502 13.5717L3.61916 10.9232C3.23239 10.7732 2.97812 10.3996 2.98049 9.98476C2.98302 9.56995 3.24145 9.19954 3.6299 9.0541L19.669 3.05703ZM6.79006 10.0072L11.5772 11.8646L11.6719 11.9066C11.8849 12.0157 12.0531 12.1983 12.1436 12.4223L14.082 17.2269L18.3272 5.69277L6.79006 10.0072Z"
        fill="currentColor"
      ></path>
    </BaseIcon>
  );
};

export default TravelHotel;
