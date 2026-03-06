import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CrossStraight: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M11 21V12.5H3C2.44774 12.5 2.00004 12.0523 2 11.5C2 10.9477 2.44772 10.5 3 10.5H11V3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V10.5H21C21.5523 10.5 22 10.9477 22 11.5C22 12.0523 21.5523 12.5 21 12.5H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CrossStraight
