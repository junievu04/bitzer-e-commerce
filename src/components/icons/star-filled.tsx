import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const StarFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M10.2198 4.07824C10.9629 2.62695 13.0371 2.62696 13.7802 4.07824L15.7082 7.84355L19.8647 8.42569C21.528 8.65864 22.1808 10.714 20.9568 11.864L18 14.6419L18.7142 18.6555C19.0032 20.2796 17.3126 21.5355 15.8411 20.7899L12 18.8435L8.15884 20.7899C6.68739 21.5355 4.99677 20.2796 5.28577 18.6555L5.99998 14.6419L3.04318 11.864C1.81914 10.714 2.47194 8.65864 4.13521 8.42569L8.29177 7.84355L10.2198 4.07824Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default StarFilled
