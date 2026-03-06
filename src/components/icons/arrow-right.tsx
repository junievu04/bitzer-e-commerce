import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowRight: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 16 16' {...props}>
      <path
        d='M4.58586 3.70698C4.19534 3.31646 4.19534 2.68345 4.58586 2.29292C4.97639 1.9024 5.6094 1.9024 5.99992 2.29292L11.707 7.99995L5.99992 13.707C5.6094 14.0975 4.97639 14.0975 4.58586 13.707C4.19534 13.3165 4.19534 12.6834 4.58586 12.2929L8.87883 7.99995L4.58586 3.70698Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowRight
