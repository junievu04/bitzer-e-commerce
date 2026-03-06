import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Pen: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.6516 5.39857L18.6014 10.3483L20.7227 8.227C21.5037 7.44595 21.5037 6.17962 20.7227 5.39857L18.6014 3.27725C17.8203 2.49621 16.554 2.49621 15.7729 3.27725L13.6516 5.39857ZM16.48 5.39857L17.1872 4.69147L19.3085 6.81279L18.6014 7.5199L16.48 5.39857ZM17.5407 11.409L12.591 6.45923L3.04502 16.0052L2.69147 21.3085L7.99477 20.9549L17.5407 11.409ZM14.7123 11.409L7.11193 19.0093L4.83908 19.1609L4.9906 16.888L12.591 9.28766L14.7123 11.409Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Pen
