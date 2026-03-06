import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const LockOpen: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M14 15.5C14 16.2403 13.5978 16.8866 13 17.2324V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V17.2324C10.4022 16.8866 10 16.2403 10 15.5C10 14.3954 10.8954 13.5 12 13.5C13.1046 13.5 14 14.3954 14 15.5Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15 7V10H6C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12C20 10.8954 19.1046 10 18 10H17V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7H9C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM18 12V20H6V12H18Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default LockOpen
