"use client";

import { cx } from "@/vendors/styled-system/css";
import { Box, type BoxProps } from "@/vendors/styled-system/jsx";
import { forwardRef } from "react";
import {
  spinnerCircleRecipe,
  spinnerContainerRecipe,
  spinnerSvgRecipe,
} from "./spinner.recipe";

export type SpinnerTone =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "link"
  | "link-disabled"
  | "disabled"
  | "warning"
  | "placeholder"
  | "inactive"
  | "error"
  | "inverse"
  | "trending"
  | "inherit";

export interface SpinnerProps extends BoxProps {
  /** @default 'default' */
  tone?: SpinnerTone;
  /** @default 3.6 */
  thickness?: number;
}

const MAX_DISTANCE = 22;
const DEFAULT_SIZE = 40;

// radius = maxDistance - (strokeWidth / 2) to fit circle within viewBox
const calculateRadius = (strokeWidth: number): number => {
  return MAX_DISTANCE - strokeWidth / 2;
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ tone = "default", thickness = 3.6, className, w, h, ...props }, ref) => {
    const radius = calculateRadius(thickness);

    return (
      <Box
        ref={ref}
        role="progressbar"
        aria-label="Loading"
        className={cx(spinnerContainerRecipe(), className)}
        w={w ?? DEFAULT_SIZE}
        h={h ?? DEFAULT_SIZE}
        {...props}
      >
        <svg className={spinnerSvgRecipe()} viewBox="22 22 44 44">
          <circle
            className={spinnerCircleRecipe({ tone })}
            cx="44"
            cy="44"
            r={radius}
            style={{ strokeWidth: thickness }}
          />
        </svg>
      </Box>
    );
  },
);

Spinner.displayName = "Spinner";

export default Spinner;
