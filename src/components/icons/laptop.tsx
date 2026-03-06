import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Laptop: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.71429 3.5C4.21523 3.5 3 4.71523 3 6.21429V16.5H21V6.21429C21 4.71523 19.7848 3.5 18.2857 3.5H5.71429ZM5 6.5H19V14.5H5V6.5Z'
        fill='currentColor'
      />
      <path
        d='M23 18.5C23 19.6046 22.1046 20.5 21 20.5H3C1.89543 20.5 1 19.6046 1 18.5H23Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Laptop
