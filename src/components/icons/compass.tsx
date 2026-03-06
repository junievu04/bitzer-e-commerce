import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Compass: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.9498 7.05029L10.5858 10.5858L7.05029 16.9498L13.4143 13.4143L16.9498 7.05029ZM12.9999 12.0001C12.9999 12.5524 12.5522 13.0001 11.9999 13.0001C11.4476 13.0001 10.9999 12.5524 10.9999 12.0001C10.9999 11.4478 11.4476 11.0001 11.9999 11.0001C12.5522 11.0001 12.9999 11.4478 12.9999 12.0001Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Compass
