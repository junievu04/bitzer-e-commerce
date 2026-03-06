import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ThumbsUp: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.1893 9.5H19.8126C21.053 9.5 21.9942 10.6174 21.7835 11.8398L20.4042 19.8398C20.2388 20.7991 19.4067 21.5 18.4332 21.5H2.18689V10.5H7.52022L9.73104 3.86754C10.0033 3.05086 10.7675 2.5 11.6284 2.5H13.1893C14.2939 2.5 15.1893 3.39543 15.1893 4.5V9.5ZM9.18689 11.8246V19.5H18.4332L19.8126 11.5L13.1893 11.5V4.5L11.6284 4.5L9.18689 11.8246ZM7.18689 12.5H4.18689V19.5H7.18689L7.18689 12.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ThumbsUp
