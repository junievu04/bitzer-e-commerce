import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ThumbsDown: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.4797 13.5L14.2689 20.1325C13.9967 20.9491 13.2324 21.5 12.3716 21.5H10.816C9.71144 21.5 8.81601 20.6046 8.81601 19.5V14.5H4.18742C2.94701 14.5 2.00574 13.3826 2.21649 12.1602L3.59581 4.16018C3.7612 3.20088 4.59327 2.5 5.56673 2.5H21.8131V13.5H16.4797ZM14.8131 12.1754V4.5L5.56673 4.5L4.18742 12.5L10.816 12.5V19.5L12.3716 19.5L14.8131 12.1754ZM16.8157 11.5H19.8131V4.5H16.8137L16.8157 11.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ThumbsDown
