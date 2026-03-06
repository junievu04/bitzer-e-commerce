import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowDown: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 16 16' {...props}>
      <path
        d='M12.2929 4.58586C12.6834 4.19534 13.3164 4.19534 13.707 4.58586C14.0975 4.97639 14.0975 5.6094 13.707 5.99992L7.99992 11.707L2.29289 5.99992C1.90237 5.6094 1.90237 4.97639 2.29289 4.58586C2.68342 4.19534 3.31643 4.19534 3.70696 4.58586L7.99992 8.87883L12.2929 4.58586Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowDown
