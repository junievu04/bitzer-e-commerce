import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Battery: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path d='M7.99951 9H4.99951V15H7.99951V9Z' fill='currentColor' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.99951 5C2.89494 5 1.99951 5.89543 1.99951 7V17C1.99951 18.1046 2.89494 19 3.99951 19H16.9995C18.1041 19 18.9995 18.1046 18.9995 17V16H20.0005C21.1051 16 22.0005 15.1046 22.0005 14V10C22.0005 8.89543 21.1051 8 20.0005 8H19.0005L18.9995 7C18.9995 5.89543 18.1041 5 16.9995 5H3.99951ZM16.9995 7H3.99951L3.99951 17H16.9995V7ZM20.0005 10H19.0005V14H20.0005V10Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Battery
