import Spinner from "@/components/spinner";
import { HTMLStyledProps, styled } from "@/vendors/styled-system/jsx";
import { forwardRef } from "react";
import { BaseIconProps } from "../icons/base";
import { TextVariants } from "../text/text";
import { textRecipe } from "../text/text.recipe";
import { buttonRecipe } from "./button.recipe";

export type ButtonVariants =
  | "default"
  | "secondary"
  | "highlight"
  | "highlight-secondary"
  | "highlight-plain"
  | "plain"
  | "destructive"
  | "none";

export type ButtonSizes = "sm" | "md" | "lg";

const textVariantMapping: Record<ButtonSizes, TextVariants> = {
  sm: "paragraph-2",
  md: "paragraph-2",
  lg: "paragraph-1",
};

const StyledButton = styled("button", buttonRecipe);
const TextContainer = styled("div", textRecipe);

export interface ButtonProps extends HTMLStyledProps<"button"> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  fullWidth?: boolean;
  onDark?: boolean;
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  iconOnly?: React.ComponentType<BaseIconProps>;
  leftIcon?: React.ComponentType<BaseIconProps>;
  rightIcon?: React.ComponentType<BaseIconProps>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      fullWidth = false,
      onDark = false,
      isLoading = false,
      loadingText,
      iconOnly: Icon,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    if (Icon) {
      return (
        <StyledButton
          ref={ref}
          variant={variant}
          size={size}
          iconOnly
          fullWidth={fullWidth}
          onDark={onDark}
          {...props}
        >
          <Icon size="sm" color="inherit" />
        </StyledButton>
      );
    }
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        iconOnly={false}
        fullWidth={fullWidth}
        onDark={onDark}
        {...props}
      >
        <TextContainer
          variant={textVariantMapping[size]}
          weight="bold"
          color="inherit"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="sbds-dimension-space-size-xs"
        >
          {isLoading ? (
            <>
              <Spinner
                w="sbds-dimension-size-7"
                h="sbds-dimension-size-7"
                tone="inherit"
              />
              {loadingText}
            </>
          ) : (
            <>
              {LeftIcon && <LeftIcon size="sm" color="inherit" />}
              {children}
              {RightIcon && <RightIcon size="sm" color="inherit" />}
            </>
          )}
        </TextContainer>
      </StyledButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
