import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const BatteryLightning: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M13.8 9.59957C14.1314 9.15774 14.0418 8.53094 13.6 8.19957C13.1582 7.8682 12.5314 7.95774 12.2 8.39957L8 13.9996H12L10.2 16.3996C9.86863 16.8414 9.95817 17.4682 10.4 17.7996C10.8418 18.1309 11.4686 18.0414 11.8 17.5996L16 11.9996H12L13.8 9.59957Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 22.0005C5.89543 22.0005 5 21.1051 5 20.0005V7.00049C5 5.89592 5.89543 5.00049 7 5.00049L8 4.99951V3.99951C8 2.89494 8.89543 1.99951 10 1.99951H14C15.1046 1.99951 16 2.89494 16 3.99951V5.00049H17C18.1046 5.00049 19 5.89592 19 7.00049V20.0005C19 21.1051 18.1046 22.0005 17 22.0005H7ZM7 20.0005L7 7.00049H17V20.0005H7ZM10 4.99951V3.99951H14V4.99951H10Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default BatteryLightning
