import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const GlassBottle: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M14 14.75V17.75H13V19.75H14C15.1046 19.75 16 18.8546 16 17.75V14.75H14Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.5 1.25C7.94772 1.25 7.5 1.69772 7.5 2.25V6.25H8V7.75H7C5.89543 7.75 5 8.64543 5 9.75V22.75H19V9.75C19 8.64543 18.1046 7.75 17 7.75H16V6.25H16.5V2.25C16.5 1.69772 16.0523 1.25 15.5 1.25H8.5ZM9.5 3.25V4.25H14.5V3.25H9.5ZM10 6.25H14V9.75H17V20.75H7V9.75H10V6.25Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default GlassBottle
