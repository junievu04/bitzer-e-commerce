import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CircleSlash: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C10.1512 20 8.44895 19.3729 7.09425 18.3198L18.3198 7.09425C19.3729 8.44895 20 10.1512 20 12ZM5.68006 16.9055L16.9055 5.68006C15.5509 4.62705 13.8487 4 12 4C7.58172 4 4 7.58172 4 12C4 13.8487 4.62705 15.5509 5.68006 16.9055Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CircleSlash
