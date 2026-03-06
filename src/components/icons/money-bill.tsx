import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const MoneyBill: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z'
        fill='currentColor'
      />
      <path
        d='M7 12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12Z'
        fill='currentColor'
      />
      <path
        d='M18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 6.5C2 5.39543 2.89543 4.5 4 4.5H20C21.1046 4.5 22 5.39543 22 6.5V17.5C22 18.6046 21.1046 19.5 20 19.5H4C2.89543 19.5 2 18.6046 2 17.5V6.5ZM4 6.5H20V17.5H4V6.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default MoneyBill
