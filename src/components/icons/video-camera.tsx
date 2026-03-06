import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const VideoCamera: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.75 6C1.75 4.89543 2.64543 4 3.75 4H15.75C16.8546 4 17.75 4.89543 17.75 6V8.07739L22.25 6V18L17.75 15.9226V18C17.75 19.1046 16.8546 20 15.75 20H3.75C2.64543 20 1.75 19.1046 1.75 18V6ZM3.75 6H15.75V18H3.75V6ZM17.7515 13.7205V10.2795L20.25 9.12611V14.8739L17.7515 13.7205Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default VideoCamera
