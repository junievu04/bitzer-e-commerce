import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowDownDrop: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M22.4999 12.5C22.4999 11.9477 22.0522 11.5 21.4999 11.5C20.9476 11.5 20.4999 11.9477 20.4999 12.5V15.4854L13.0663 7.61328L9.04485 11.1318L3.20696 5.29297C2.81643 4.90244 2.18342 4.90244 1.79289 5.29297C1.40237 5.68349 1.40237 6.31651 1.79289 6.70703L8.95403 13.8682L12.9335 10.3867L19.1806 17H15.9999C15.4476 17 14.9999 17.4477 14.9999 18C14.9999 18.5523 15.4476 19 15.9999 19H22.4999V12.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowDownDrop
