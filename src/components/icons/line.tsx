import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Line: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M21 13C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H21Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Line
