import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Tick: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M19.7783 5.08496C20.1605 4.68661 20.7938 4.67366 21.1924 5.05566C21.5908 5.43783 21.6037 6.07112 21.2217 6.46973L9.00003 19.2227L2.77835 12.7305C2.39633 12.3318 2.40923 11.6986 2.80765 11.3164C3.20639 10.9343 3.83958 10.9479 4.22171 11.3467L8.99905 16.3311L19.7783 5.08496Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Tick
