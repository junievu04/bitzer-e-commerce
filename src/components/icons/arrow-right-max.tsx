import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowRightMax: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M4.79295 3.29297C5.18348 2.90244 5.81649 2.90244 6.20702 3.29297L14.914 12L6.20702 20.707C5.81649 21.0976 5.18348 21.0976 4.79295 20.707C4.40243 20.3165 4.40243 19.6835 4.79295 19.293L12.0859 12L4.79295 4.70703C4.40243 4.31651 4.40243 3.68349 4.79295 3.29297ZM17.5 20V4C17.5 3.44772 17.9477 3 18.5 3C19.0523 3 19.5 3.44772 19.5 4V20C19.5 20.5523 19.0523 21 18.5 21C17.9477 21 17.5 20.5523 17.5 20Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowRightMax
