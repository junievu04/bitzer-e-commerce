import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowDownMax: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M20 17.4999C20.5523 17.4999 21 17.9476 21 18.4999C21 19.0522 20.5523 19.4999 20 19.4999H4C3.44772 19.4999 3 19.0522 3 18.4999C3 17.9476 3.44772 17.4999 4 17.4999H20ZM19.293 4.79289C19.6835 4.40237 20.3165 4.40237 20.707 4.79289C21.0976 5.18342 21.0976 5.81643 20.707 6.20696L12 14.914L3.29297 6.20696C2.90244 5.81643 2.90244 5.18342 3.29297 4.79289C3.68349 4.40237 4.31651 4.40237 4.70703 4.79289L12 12.0859L19.293 4.79289Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowDownMax
