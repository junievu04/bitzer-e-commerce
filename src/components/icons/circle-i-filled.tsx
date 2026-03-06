import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CircleIFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.5 8.38462C13.5 9.14932 12.8284 9.76923 12 9.76923C11.1716 9.76923 10.5 9.14932 10.5 8.38462C10.5 7.61991 11.1716 7 12 7C12.8284 7 13.5 7.61991 13.5 8.38462ZM12 10.8462C12.5523 10.8462 13 11.2939 13 11.8462V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11.8462C11 11.2939 11.4477 10.8462 12 10.8462Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CircleIFilled
