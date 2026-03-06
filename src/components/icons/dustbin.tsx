import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Dustbin: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4L20 4C20.5523 4 21 4.44772 21 5C21 5.55229 20.5523 6 20 6L4 6C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4L9 4V3Z'
        fill='currentColor'
      />
      <path
        d='M5 20V8H7V20H17V8H19V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20Z'
        fill='currentColor'
      />
      <path
        d='M10 10C10.5523 10 11 10.4477 11 11V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V11C9 10.4477 9.44772 10 10 10Z'
        fill='currentColor'
      />
      <path
        d='M15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11V15C13 15.5523 13.4477 16 14 16C14.5523 16 15 15.5523 15 15V11Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Dustbin
