import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Folder: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M19 18V20H5V18H19ZM3 18V6C3 4.89543 3.89543 4 5 4H11.5L13 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20V9H11.7637L10.2637 6H5V20L4.7959 19.9893C3.78722 19.887 3 19.0357 3 18Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Folder
