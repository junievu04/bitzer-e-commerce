import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ShoppingBag: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.5 6.5C9.5 5.11929 10.6193 4 12 4C13.3807 4 14.5 5.11929 14.5 6.5V7H9.5V6.5ZM7.5 9V11C7.5 11.5523 7.94772 12 8.5 12C9.05228 12 9.5 11.5523 9.5 11V9H14.5V11C14.5 11.5523 14.9477 12 15.5 12C16.0523 12 16.5 11.5523 16.5 11V9H19V20H5L5 9H7.5ZM7.5 7V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V7H19C20.1046 7 21 7.89543 21 9V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V9C3 7.89543 3.89543 7 5 7H7.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ShoppingBag
