import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowUpLine: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M10.9999 21.207C10.9999 21.7593 11.4476 22.207 11.9999 22.207C12.5522 22.207 12.9999 21.7593 12.9999 21.207L12.9999 5.62109L19.2929 11.9141C19.6834 12.3046 20.3164 12.3046 20.707 11.9141C21.0975 11.5235 21.0975 10.8905 20.707 10.5L11.9999 1.79297L3.29289 10.5C2.90237 10.8905 2.90237 11.5235 3.29289 11.9141C3.68342 12.3046 4.31643 12.3046 4.70696 11.9141L10.9999 5.62109L10.9999 21.207Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowUpLine
