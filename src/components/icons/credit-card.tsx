import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CreditCard: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M15 15C15 14.4477 15.4477 14 16 14H17.5C18.0523 14 18.5 14.4477 18.5 15C18.5 15.5523 18.0523 16 17.5 16H16C15.4477 16 15 15.5523 15 15Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 4C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4H3ZM21 6H3V9H21V6ZM21 11H3L3 18H21V11Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CreditCard
