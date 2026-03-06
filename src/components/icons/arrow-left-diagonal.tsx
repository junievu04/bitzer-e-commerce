import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowLeftDiagonal: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M4 15V4H15C15.5523 4 16 4.44772 16 5C16 5.55228 15.5523 6 15 6H7.41406L19.707 18.293C20.0976 18.6835 20.0976 19.3165 19.707 19.707C19.3165 20.0976 18.6835 20.0976 18.293 19.707L6 7.41406V15C6 15.5523 5.55228 16 5 16C4.44772 16 4 15.5523 4 15Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowLeftDiagonal
