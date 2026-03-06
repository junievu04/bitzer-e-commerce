import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Rectangles: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M19 4H7C7 2.89543 7.89543 2 9 2H19C20.1046 2 21 2.89543 21 4V16C21 17.1046 20.1046 18 19 18V4Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 8C3 6.89543 3.89543 6 5 6H15C16.1046 6 17 6.89543 17 8V20C17 21.1046 16.1046 22 15 22H5C3.89543 22 3 21.1046 3 20V8ZM5 8H15V20H5L5 8Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Rectangles
