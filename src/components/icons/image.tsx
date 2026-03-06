import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Image: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M18 8.5C18 9.88071 16.8807 11 15.5 11C14.1193 11 13 9.88071 13 8.5C13 7.11929 14.1193 6 15.5 6C16.8807 6 18 7.11929 18 8.5Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.8232 21.8233C21.5172 21.5094 22 20.8111 22 20V4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22.0001 4 22.0001H20C20.2935 22.0001 20.5721 21.9368 20.8232 21.8233ZM20 4H4V11L7 8.00003L19 20H20V4ZM16.1715 20L7 10.8285L4 13.8285V20H16.1715Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Image
