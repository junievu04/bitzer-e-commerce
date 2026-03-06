import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const DoubleFolder: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.2 5L14 3H8C6.89543 3 6 3.89543 6 5V15C6 16.1046 6.89543 17 8 17H20C21.1046 17 22 16.1046 22 15V7C22 5.89543 21.1046 5 20 5H15.2ZM14.0676 7H20V15H8V5L12.8676 5L14.0676 7Z'
        fill='currentColor'
      />
      <path
        d='M2 8.5C2 7.39543 2.89543 6.5 4 6.5V19H19C19 20.1046 18.1046 21 17 21H4C2.89543 21 2 20.1046 2 19V8.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default DoubleFolder
