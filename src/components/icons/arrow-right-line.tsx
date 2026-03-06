import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowRightLine: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M2.26709 11C1.71481 11 1.26709 11.4477 1.26709 12C1.26709 12.5523 1.71481 13 2.26709 13L18.729 13L13.0845 18.2685C12.6807 18.6453 12.6588 19.2788 13.0356 19.6826C13.4125 20.0863 14.046 20.1082 14.4497 19.7314L22.7329 12L14.4497 4.26852C14.046 3.89172 13.4125 3.91361 13.0356 4.31735C12.6588 4.7211 12.6807 5.35459 13.0845 5.73141L18.729 11L2.26709 11Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowRightLine
