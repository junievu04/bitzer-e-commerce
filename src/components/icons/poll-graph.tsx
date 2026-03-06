import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const PollGraph: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path d='M9 11H7V17H9V11Z' fill='currentColor' />
      <path d='M11 7H13V17H11V7Z' fill='currentColor' />
      <path d='M17 12H15V17H17V12Z' fill='currentColor' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 5H19V19H5L5 5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default PollGraph
