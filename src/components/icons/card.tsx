import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Card: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M5.33301 14H18.667C19.9554 14.0002 20.9998 15.0446 21 16.333V18.167C20.9998 19.4554 19.9554 20.4998 18.667 20.5H5.33301C4.0446 20.4998 3.00018 19.4554 3 18.167V16.333C3.00018 15.0446 4.0446 14.0002 5.33301 14ZM5.33301 3.5H18.667C19.9554 3.50018 20.9998 4.5446 21 5.83301V7.66699C20.9998 8.9554 19.9554 9.99982 18.667 10H5.33301C4.0446 9.99982 3.00018 8.9554 3 7.66699V5.83301L3.01172 5.59473C3.1312 4.41824 4.12503 3.50017 5.33301 3.5Z'
        stroke='currentColor'
        strokeWidth='2'
      />
    </BaseIcon>
  )
}

export default Card
