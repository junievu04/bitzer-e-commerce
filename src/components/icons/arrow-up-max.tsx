import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowUpMax: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M20.707 17.793C21.0976 18.1835 21.0976 18.8165 20.707 19.207C20.3165 19.5976 19.6835 19.5976 19.293 19.207L12 11.9141L4.70703 19.207C4.31651 19.5976 3.68349 19.5976 3.29297 19.207C2.90244 18.8165 2.90244 18.1835 3.29297 17.793L12 9.08594L20.707 17.793ZM20 4.5C20.5523 4.5 21 4.94772 21 5.5C21 6.05228 20.5523 6.5 20 6.5H4C3.44772 6.5 3 6.05228 3 5.5C3 4.94772 3.44772 4.5 4 4.5H20Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowUpMax
