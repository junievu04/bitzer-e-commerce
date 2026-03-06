import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const LinesDotsGap: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M12 7C12 8.933 10.433 10.5 8.5 10.5C6.91449 10.5 5.57521 9.44574 5.14494 8H3.5C2.94772 8 2.5 7.55228 2.5 7C2.5 6.44772 2.94772 6 3.5 6H5.14494C5.57521 4.55426 6.91449 3.5 8.5 3.5C10.433 3.5 12 5.067 12 7Z'
        fill='currentColor'
      />
      <path
        d='M15 6C14.4477 6 14 6.44772 14 7C14 7.55228 14.4477 8 15 8H20.5C21.0523 8 21.5 7.55228 21.5 7C21.5 6.44772 21.0523 6 20.5 6H15Z'
        fill='currentColor'
      />
      <path
        d='M3 16C2.44772 16 2 16.4477 2 17C2 17.5523 2.44772 18 3 18H8.5C9.05228 18 9.5 17.5523 9.5 17C9.5 16.4477 9.05228 16 8.5 16H3Z'
        fill='currentColor'
      />
      <path
        d='M18.8551 18C18.4248 19.4457 17.0855 20.5 15.5 20.5C13.567 20.5 12 18.933 12 17C12 15.067 13.567 13.5 15.5 13.5C17.0855 13.5 18.4248 14.5543 18.8551 16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H18.8551Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default LinesDotsGap
