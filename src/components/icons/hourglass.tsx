import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Hourglass: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3C20 3.55228 19.5523 4 19 4H18V7.5L13 12L18 16.5L18 20H19C19.5523 20 20 20.4477 20 21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21C4 20.4477 4.44772 20 5 20L6 20V16.5L11 12L6 7.5V4H5C4.44772 4 4 3.55228 4 3ZM8 20L16 20L16 17.3907L12 13.7907L8 17.3907L8 20ZM8 4H16V6.60927L12 10.2093L8 6.60927V4Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Hourglass
