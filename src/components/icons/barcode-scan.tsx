import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const BarcodeScan: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M16 3C16 3.55228 16.4477 4 17 4H19C19.5523 4 20 4.44771 20 5V7C20 7.55228 20.4477 8 21 8C21.5523 8 22 7.55228 22 7V5C22 3.34315 20.6569 2 19 2H17C16.4477 2 16 2.44772 16 3Z'
        fill='currentColor'
      />
      <path
        d='M7 4C7.55228 4 8 3.55228 8 3C8 2.44772 7.55228 2 7 2H5C3.34315 2 2 3.34315 2 5V7C2 7.55228 2.44772 8 3 8C3.55228 8 4 7.55228 4 7V5C4 4.44772 4.44771 4 5 4H7Z'
        fill='currentColor'
      />
      <path
        d='M4 17C4 16.4477 3.55228 16 3 16C2.44772 16 2 16.4477 2 17V19C2 20.6569 3.34315 22 5 22H7C7.55228 22 8 21.5523 8 21C8 20.4477 7.55228 20 7 20H5C4.44772 20 4 19.5523 4 19V17Z'
        fill='currentColor'
      />
      <path
        d='M17 20C16.4477 20 16 20.4477 16 21C16 21.5523 16.4477 22 17 22H19C20.6569 22 22 20.6569 22 19V17C22 16.4477 21.5523 16 21 16C20.4477 16 20 16.4477 20 17V19C20 19.5523 19.5523 20 19 20H17Z'
        fill='currentColor'
      />
      <path d='M9 7H6V17H9V7Z' fill='currentColor' />
      <path d='M11 17V7H13V17H11Z' fill='currentColor' />
      <path d='M15 17H18V7H15V17Z' fill='currentColor' />
    </BaseIcon>
  )
}

export default BarcodeScan
