import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CalendarDots: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M7.25 16.5C7.94036 16.5 8.5 15.9404 8.5 15.25C8.5 14.5596 7.94036 14 7.25 14C6.55964 14 6 14.5596 6 15.25C6 15.9404 6.55964 16.5 7.25 16.5Z'
        fill='currentColor'
      />
      <path
        d='M13.25 15.25C13.25 15.9404 12.6904 16.5 12 16.5C11.3096 16.5 10.75 15.9404 10.75 15.25C10.75 14.5596 11.3096 14 12 14C12.6904 14 13.25 14.5596 13.25 15.25Z'
        fill='currentColor'
      />
      <path
        d='M16.75 16.5C17.4404 16.5 18 15.9404 18 15.25C18 14.5596 17.4404 14 16.75 14C16.0596 14 15.5 14.5596 15.5 15.25C15.5 15.9404 16.0596 16.5 16.75 16.5Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 2C8.55228 2 9 2.44772 9 3V5H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V5H20C21.1046 5 22 5.89543 22 7V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V7C2 5.89543 2.89543 5 4 5H7V3C7 2.44772 7.44772 2 8 2ZM20 7H4V9H20V7ZM4 20V11H20V20H4Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CalendarDots
