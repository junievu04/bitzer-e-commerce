import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowRightBox: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M5 3H11V5H5L5 19H19V13H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z'
        fill='currentColor'
      />
      <path
        d='M14 3C13.4477 3 13 3.44772 13 4C13 4.55228 13.4477 5 14 5H17.5858L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L19 6.41421V10C19 10.5523 19.4477 11 20 11C20.5523 11 21 10.5523 21 10V3H14Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowRightBox
