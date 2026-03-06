import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const FolderArrowUp: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M12 9.58579L8.79289 12.7929C8.40237 13.1834 8.40237 13.8166 8.79289 14.2071C9.18342 14.5976 9.81658 14.5976 10.2071 14.2071L11 13.4142V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V13.4142L13.7929 14.2071C14.1834 14.5976 14.8166 14.5976 15.2071 14.2071C15.5976 13.8166 15.5976 13.1834 15.2071 12.7929L12 9.58579Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.1364 7L11.5 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H13.1364ZM11.9491 9H19V18H5V6H10.3127L11.9491 9Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default FolderArrowUp
