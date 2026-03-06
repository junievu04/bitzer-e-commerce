import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Browser: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.00049 4H18.9995C20.1041 4 21.0005 4.89543 21.0005 6L20.9995 18C20.9995 19.1046 20.1041 20 18.9995 20H4.99951C3.89494 20 2.99951 19.1046 2.99951 18V6C2.99951 4.89543 3.89592 4 5.00049 4ZM18.9995 8H4.99951L4.99951 18H18.9995V8Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Browser
