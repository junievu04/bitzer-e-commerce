import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const RectangleSpeechBubble: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.75 14.5H5.25007L1.75 18.5V4.5C1.75 3.39543 2.64543 2.5 3.75 2.5H16.75C17.8546 2.5 18.75 3.39543 18.75 4.5V12.5C18.75 13.6046 17.8546 14.5 16.75 14.5ZM4.34255 12.5L3.75 13.1772V4.5H16.75V12.5H4.34255Z'
        fill='currentColor'
      />
      <path
        d='M7.25 17.5C6.14543 17.5 5.25 16.6046 5.25 15.5H19.0784L20.2501 16.6716L20.25 5.5C21.3545 5.5 22.2501 6.39543 22.2501 7.5V21.5L18.25 17.5H7.25Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default RectangleSpeechBubble
