import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const DoubleLine: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M20 13C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14C3 13.4477 3.44772 13 4 13H20ZM20 9C20.5523 9 21 9.44772 21 10C21 10.5523 20.5523 11 20 11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9H20Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default DoubleLine
