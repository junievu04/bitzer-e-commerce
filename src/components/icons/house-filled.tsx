import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const HouseFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M20 10.8557V19.9641C19.9997 20.24 19.776 20.4641 19.5 20.4641H14V15.4641H10V20.4641H4.5C4.22402 20.4641 4.00026 20.24 4 19.9641V10.9153L12.002 3.86646L20 10.8557Z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='2'
      />
    </BaseIcon>
  )
}

export default HouseFilled
