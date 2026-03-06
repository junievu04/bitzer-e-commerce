import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Camera: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17ZM12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z'
        fill='currentColor'
      />
      <path
        d='M18 11C18.5523 11 19 10.5523 19 10C19 9.44772 18.5523 9 18 9C17.4477 9 17 9.44772 17 10C17 10.5523 17.4477 11 18 11Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.54415 4.36754C7.81638 3.55086 8.58066 3 9.44152 3H14.5585C15.4193 3 16.1836 3.55086 16.4558 4.36754L17 6H20C21.1046 6 22 6.89543 22 8V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V8C2 6.89543 2.89543 6 4 6H7L7.54415 4.36754ZM8.44152 8H4V19H20V8H15.5585L14.5585 5L9.44152 5L8.44152 8Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Camera
