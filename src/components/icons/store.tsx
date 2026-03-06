import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Store: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.00002 2.5L2.86216 8.18929C2.41615 10.4194 4.12186 12.5 6.3961 12.5C7.47896 12.5 8.45027 12.0224 9.1109 11.2664C9.83903 12.0266 10.8642 12.5 12 12.5C13.1358 12.5 14.161 12.0266 14.8891 11.2664C15.5498 12.0224 16.5211 12.5 17.6039 12.5C19.8782 12.5 21.5839 10.4194 21.1379 8.18929L20 2.5H4.00002ZM5.63963 4.5L4.82333 8.58152C4.62483 9.57402 5.38395 10.5 6.3961 10.5C7.28192 10.5 8.00002 9.7819 8.00002 8.89608V4.5H5.63963ZM14 4.5V8.5C14 9.60457 13.1046 10.5 12 10.5C10.8955 10.5 10 9.60457 10 8.5V4.5H14ZM16 4.5H18.3604L19.1767 8.58152C19.3752 9.57402 18.6161 10.5 17.6039 10.5C16.7181 10.5 16 9.7819 16 8.89608V4.5Z'
        fill='currentColor'
      />
      <path
        d='M4.00002 14.5H6.00002V19.5H18V14.5H20V21.5H4.00002V14.5Z'
        fill='currentColor'
      />
      <path d='M14 14.5V17.5H16V14.5H14Z' fill='currentColor' />
    </BaseIcon>
  )
}

export default Store
