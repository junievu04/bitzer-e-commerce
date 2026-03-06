import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowLeftLine: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M21.7329 13C22.2852 13 22.7329 12.5523 22.7329 12C22.7329 11.4477 22.2852 11 21.7329 11L5.271 11L10.9155 5.73148C11.3193 5.35465 11.3412 4.72117 10.9644 4.31742C10.5875 3.91368 9.95405 3.89179 9.55029 4.26859L1.26709 12L9.55029 19.7315C9.95405 20.1083 10.5875 20.0864 10.9644 19.6826C11.3412 19.2789 11.3193 18.6454 10.9155 18.2686L5.271 13L21.7329 13Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowLeftLine
