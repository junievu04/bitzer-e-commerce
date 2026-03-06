import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Note: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H8Z'
        fill='currentColor'
      />
      <path
        d='M7 12C7 11.4477 7.44772 11 8 11H13C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H8C7.44772 13 7 12.5523 7 12Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17 22H4C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V17L17 22ZM4 20V4L20 4V14H16C14.8954 14 14 14.8954 14 16V20H4ZM20 16V16.1716L16.1716 20H16V16H20Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Note
