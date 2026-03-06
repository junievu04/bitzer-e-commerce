import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CouponStar: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M20 12C20 10.5135 21.0811 9.27952 22.5 9.04148V5.5C22.5 4.67157 21.8284 4 21 4H3C2.17157 4 1.5 4.67157 1.5 5.5V9.04148C2.91886 9.27952 4 10.5135 4 12C4 13.4865 2.91886 14.7205 1.5 14.9585V18.5C1.5 19.3284 2.17157 20 3 20H21C21.8284 20 22.5 19.3284 22.5 18.5V14.9585C21.0811 14.7205 20 13.4865 20 12ZM3.5 7.66947V6H20.5V7.66947C19.0054 8.53378 18 10.1484 18 12C18 13.8516 19.0054 15.4662 20.5 16.3305V18H3.5V16.3305C4.99462 15.4662 6 13.8516 6 12C6 10.1484 4.99462 8.53378 3.5 7.66947Z'
        fill='currentColor'
      />
      <path
        d='M12 8L13.2728 10.7272L16 12L13.2728 13.2728L12 16L10.7272 13.2728L8 12L10.7272 10.7272L12 8Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CouponStar
