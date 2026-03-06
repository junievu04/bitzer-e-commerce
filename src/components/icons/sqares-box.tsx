import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const SqaresBox: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M20 18V20H18V18H20ZM13 18V20H11V18H13ZM6 18V20H4V18H6ZM20 11V13H18V11H20ZM13 11V13H11V11H13ZM6 11V13H4V11H6ZM20 4V6H18V4H20ZM13 4V6H11V4H13ZM6 4V6H4V4H6Z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='2'
      />
    </BaseIcon>
  )
}

export default SqaresBox
