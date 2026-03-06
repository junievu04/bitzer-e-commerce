import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ScanPay: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5H7C5.89543 5 5 5.89543 5 7V8C5 8.55228 4.55228 9 4 9C3.44772 9 3 8.55228 3 8V7C3 4.79086 4.79086 3 7 3H8Z'
        fill='currentColor'
      />
      <path
        d='M15 4C15 4.55228 15.4477 5 16 5H17C18.1046 5 19 5.89543 19 7V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8V7C21 4.79086 19.2091 3 17 3H16C15.4477 3 15 3.44772 15 4Z'
        fill='currentColor'
      />
      <path
        d='M16 19C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21H17C19.2091 21 21 19.2091 21 17V16C21 15.4477 20.5523 15 20 15C19.4477 15 19 15.4477 19 16V17C19 18.1046 18.1046 19 17 19H16Z'
        fill='currentColor'
      />
      <path
        d='M5 16C5 15.4477 4.55228 15 4 15C3.44772 15 3 15.4477 3 16V17C3 19.2091 4.79086 21 7 21H8C8.55228 21 9 20.5523 9 20C9 19.4477 8.55228 19 8 19H7C5.89543 19 5 18.1046 5 17V16Z'
        fill='currentColor'
      />
      <path
        d='M3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13L21 13C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11L3 11Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ScanPay
