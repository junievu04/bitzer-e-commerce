import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Buzzer: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11 6.5V5.5H9.5C8.94772 5.5 8.5 5.05228 8.5 4.5C8.5 3.94772 8.94772 3.5 9.5 3.5H14.5C15.0523 3.5 15.5 3.94772 15.5 4.5C15.5 5.05228 15.0523 5.5 14.5 5.5H13V6.5C17.4183 6.5 21 10.0817 21 14.5V17.5H3V14.5C3 10.0817 6.58172 6.5 11 6.5ZM11 8.5C7.68629 8.5 5 11.1863 5 14.5V15.5H19V14.5C19 11.1863 16.3137 8.5 13 8.5H11Z'
        fill='currentColor'
      />
      <path
        d='M3.5 18.5C2.94772 18.5 2.5 18.9477 2.5 19.5C2.5 20.0523 2.94772 20.5 3.5 20.5H20.5C21.0523 20.5 21.5 20.0523 21.5 19.5C21.5 18.9477 21.0523 18.5 20.5 18.5H3.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Buzzer
