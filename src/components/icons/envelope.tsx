import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Envelope: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM20 8.45576V18H4L4 8.45576L12 14.2335L20 8.45576ZM19.9843 6H4.01566L12 11.7665L19.9843 6Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Envelope
