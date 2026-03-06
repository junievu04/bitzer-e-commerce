import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowUp: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M19.293 16.9141C19.6835 17.3047 20.3166 17.3047 20.7071 16.9141C21.0976 16.5236 21.0976 15.8906 20.7071 15.5001L12 6.79304L3.29302 15.5001C2.90249 15.8906 2.90249 16.5236 3.29302 16.9141C3.68354 17.3047 4.31655 17.3047 4.70708 16.9141L12 9.62117L19.293 16.9141Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowUp
