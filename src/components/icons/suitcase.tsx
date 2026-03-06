import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Suitcase: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7H6C3.79086 7 2 8.79086 2 11V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V11C22 8.79086 20.2091 7 18 7H16ZM14 5H10V7H14V5ZM16 9H8V19H16V9ZM18 19C19.1046 19 20 18.1046 20 17V11C20 9.89543 19.1046 9 18 9V19ZM6 19L6 9C4.89543 9 4 9.89543 4 11V17C4 18.1046 4.89543 19 6 19Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Suitcase
