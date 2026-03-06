import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CircleSmile: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M12 18C9.02705 18 6.55909 15.8377 6.08301 13H8.12607C8.57011 14.7252 10.1362 16 12 16C13.8639 16 15.43 14.7252 15.874 13H17.9171C17.441 15.8377 14.973 18 12 18Z'
        fill='currentColor'
      />
      <path
        d='M10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8C9.32843 8 10 8.67157 10 9.5Z'
        fill='currentColor'
      />
      <path
        d='M15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11Z'
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

export default CircleSmile
