import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Can: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5L4 19C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19V5C20.5523 5 21 4.55228 21 4C21 3.44772 20.5523 3 20 3H4ZM6 11V10H18V11H6ZM6 13V14H18V13H6ZM18 5V8H6V5H18ZM6 16H18V19H6V16Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Can
