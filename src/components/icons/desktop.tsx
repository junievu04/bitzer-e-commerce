import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Desktop: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.0005 17H20C21.1046 17 22 16.1046 22 15V5C22 3.89543 21.1046 3 20 3H4C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H11.0005V19H7.00049C6.4482 19 6.00049 19.4477 6.00049 20C6.00049 20.5523 6.4482 21 7.00049 21H17.0005C17.5528 21 18.0005 20.5523 18.0005 20C18.0005 19.4477 17.5528 19 17.0005 19H13.0005V17ZM4 5H20V15H4V5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Desktop
