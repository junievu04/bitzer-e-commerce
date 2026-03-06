import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Box: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M9.5 15C8.94772 15 8.5 15.4477 8.5 16C8.5 16.5523 8.94772 17 9.5 17H14.5C15.0523 17 15.5 16.5523 15.5 16C15.5 15.4477 15.0523 15 14.5 15H9.5Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 10H3V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H22V5C22 3.89543 21.1046 3 20 3H4C2.89543 3 2 3.89543 2 5V10ZM20 5H4V8H20V5ZM5 10H19V19H5V10Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Box
