import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CircleTick: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.13604 11.9497C7.52656 11.5592 8.15973 11.5592 8.55025 11.9497L10.6716 14.0711L15.6213 9.12132C16.0118 8.7308 16.645 8.7308 17.0355 9.12132C17.4261 9.51185 17.4261 10.145 17.0355 10.5355L11.3787 16.1924C10.9882 16.5829 10.355 16.5829 9.96447 16.1924L7.13604 13.364C6.74551 12.9734 6.74551 12.3403 7.13604 11.9497ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CircleTick
