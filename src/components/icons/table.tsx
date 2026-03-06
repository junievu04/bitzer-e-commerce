import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Table: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.5 21.5H4.5C3.39543 21.5 2.5 20.6046 2.5 19.5V4.5C2.5 3.39543 3.39543 2.5 4.5 2.5H19.5C20.6046 2.5 21.5 3.39543 21.5 4.5V19.5C21.5 20.6046 20.6046 21.5 19.5 21.5ZM4.5 16V19.5H11V16H4.5ZM19.5 19.5H13V16H19.5V19.5ZM11 14H4.5V10H11V14ZM11 8H4.5V4.5L11 4.50004V8ZM19.5 8H13V4.50004L19.5 4.5V8ZM13 10H19.5V14H13V10Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Table
