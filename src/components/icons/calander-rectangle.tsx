import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CalanderRectangle: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path d='M18 18V15H14V18H18Z' fill='currentColor' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 2C8.55228 2 9 2.44772 9 3V5H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V5H20C21.1046 5 22 5.89543 22 7V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V7C2 5.89543 2.89543 5 4 5H7V3C7 2.44772 7.44772 2 8 2ZM20 7H4V10H20V7ZM4 20V12H20V20H4Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CalanderRectangle
