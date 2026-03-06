import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const HeartFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M11.9993 21.5L3.29907 12.8902C0.899375 10.5124 0.90031 6.65976 3.30188 4.28315C5.70344 1.90654 9.59657 1.90562 11.9993 4.28038C14.402 1.90562 18.2952 1.90654 20.6967 4.28315C23.0983 6.65976 23.102 10.5152 20.7023 12.893L11.9993 21.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default HeartFilled
