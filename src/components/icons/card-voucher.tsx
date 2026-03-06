import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CardVoucher: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.5 4C2.39543 4 1.5 4.89543 1.5 6V18C1.5 19.1046 2.39543 20 3.5 20H20.5C21.6046 20 22.5 19.1046 22.5 18V6C22.5 4.89543 21.6046 4 20.5 4H3.5ZM20.5 6H3.5V11H5.12602C5.57006 9.27477 7.13616 8 9 8C10.8638 8 12.4299 9.27477 12.874 11H20.5V6ZM20.5 13H12.874C12.4299 14.7252 10.8638 16 9 16C7.13616 16 5.57006 14.7252 5.12602 13H3.5V18H20.5V13ZM7 12C7 13.1046 7.89543 14 9 14C10.1046 14 11 13.1046 11 12C11 10.8954 10.1046 10 9 10C7.89543 10 7 10.8954 7 12Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CardVoucher
