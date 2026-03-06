import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Cake: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M12 5.5C12.8284 5.5 13.5 4.82843 13.5 4C13.5 3.17157 12.8284 1.5 12 1.5C11.1716 1.5 10.5 3.17157 10.5 4C10.5 4.82843 11.1716 5.5 12 5.5Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 6.5C12.5523 6.5 13 6.94772 13 7.5V9.5H19C20.1046 9.5 21 10.3954 21 11.5V20.5C21 21.6046 20.1046 22.5 19 22.5H5C3.89543 22.5 3 21.6046 3 20.5V11.5C3 10.3954 3.89543 9.5 5 9.5H11V7.5C11 6.94772 11.4477 6.5 12 6.5ZM19 11.5V14.5H5V11.5H19ZM5 16.5L5 20.5H19V16.5H5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Cake
