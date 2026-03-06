import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CircleI: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M12 10.8462C12.5523 10.8462 13 11.2939 13 11.8462V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11.8462C11 11.2939 11.4477 10.8462 12 10.8462Z'
        fill='currentColor'
      />
      <path
        d='M12 9.76923C12.8284 9.76923 13.5 9.14932 13.5 8.38462C13.5 7.61991 12.8284 7 12 7C11.1716 7 10.5 7.61991 10.5 8.38462C10.5 9.14932 11.1716 9.76923 12 9.76923Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CircleI
