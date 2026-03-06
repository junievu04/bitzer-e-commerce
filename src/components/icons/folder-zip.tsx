import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const FolderZip: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path d='M15 13H13V11H15V13Z' fill='currentColor' />
      <path d='M15 15H17V13H15V15Z' fill='currentColor' />
      <path d='M15 15V17H13V15H15Z' fill='currentColor' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.5 4L13.1364 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H11.5ZM11.9491 9L10.3127 6H5V18H19V9H17V11H15V9H11.9491Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default FolderZip
