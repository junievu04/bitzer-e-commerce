import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const TallBars: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path d='M3 12H7V21H3V12Z' fill='currentColor' />
      <path d='M10 8H14V21H10V8Z' fill='currentColor' />
      <path d='M17 3H21V21H17V3Z' fill='currentColor' />
    </BaseIcon>
  )
}

export default TallBars
