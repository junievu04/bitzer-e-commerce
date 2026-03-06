import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const House: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M20 10.4534V20.4641C19.9997 20.74 19.776 20.9641 19.5 20.9641H14V14.9641H10V20.9641H4.5C4.22402 20.9641 4.00026 20.74 4 20.4641V10.4534L12 3.37231L20 10.4534Z'
        stroke='currentColor'
        strokeWidth='2'
      />
    </BaseIcon>
  )
}

export default House
