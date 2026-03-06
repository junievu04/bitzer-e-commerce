import React, {FC} from 'react'
import {
  cva,
  type RecipeVariantProps,
} from '@/vendors/panda-css/styled-system/css'
import {HTMLStyledProps, styled} from '@/vendors/panda-css/styled-system/jsx'

const iconStyle = cva({
  base: {},
  variants: {
    size: {
      xs: {
        width: 'sbds-dimension-size-5',
        height: 'sbds-dimension-size-5',
      },
      sm: {
        width: 'sbds-dimension-size-7',
        height: 'sbds-dimension-size-7',
      },
      md: {
        width: 'sbds-dimension-size-10',
        height: 'sbds-dimension-size-10',
      },
      lg: {
        width: 'sbds-dimension-size-12',
        height: 'sbds-dimension-size-12',
      },
    },
    tone: {
      default: {
        color: 'sbds-interaction-color-default',
      },
      primary: {
        color: 'sbds-icon-color-primary',
      },
      secondary: {
        color: 'sbds-icon-color-secondary',
      },
      success: {
        color: 'sbds-icon-color-success',
      },
      link: {
        color: 'sbds-icon-color-link',
      },
      'link-disabled': {
        color: 'sbds-icon-color-link-disabled',
      },
      disabled: {
        color: 'sbds-icon-color-disabled',
      },
      warning: {
        color: 'sbds-global-color-yellow-30',
      },
      placeholder: {
        color: 'sbds-icon-color-placeholder',
      },
      inactive: {
        color: 'sbds-icon-color-inactive',
      },
      error: {
        color: 'sbds-icon-color-error',
      },
      inverse: {
        color: 'sbds-icon-color-inverse',
      },
      trending: {
        color: 'sbds-icon-color-trending',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'default',
  },
})

type IconVariants = RecipeVariantProps<typeof iconStyle>

export type BaseIconProps = HTMLStyledProps<typeof Component> & IconVariants

const Component = styled('svg', iconStyle)

const BaseIcon: FC<BaseIconProps> = ({
  children,
  viewBox,
  size,
  tone,
  ...props
}) => {
  return (
    <Component
      size={size}
      tone={tone}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox ?? '0 0 24 24'}
      fill='none'
      {...props}
    >
      {children}
    </Component>
  )
}

export default BaseIcon
