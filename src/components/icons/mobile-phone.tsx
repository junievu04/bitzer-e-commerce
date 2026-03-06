import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const MobilePhone: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 18.5V4.7C4 4.63283 4.00207 4.56614 4.00615 4.5H4C4 3.73165 4.28885 3.03076 4.76389 2.5C5.31321 1.88625 6.1115 1.5 7 1.5H17C17.8885 1.5 18.6868 1.88625 19.2361 2.5C19.7111 3.03076 20 3.73165 20 4.5H19.9939C19.9979 4.56614 20 4.63283 20 4.7V19.3C20 19.7244 19.9174 20.1294 19.7674 20.5C19.7612 20.5153 19.7549 20.5304 19.7485 20.5456C19.2627 21.6941 18.1255 22.5 16.8 22.5H7.2C5.85706 22.5 4.70733 21.6727 4.23261 20.5M6.00049 4.5H18.0005L18 18.5H6L6.00049 4.5Z'
        fill='currentColor'
      />
      <path
        d='M4.19418 20.4003C4.06856 20.0572 4 19.6866 4 19.3V18.5'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default MobilePhone
