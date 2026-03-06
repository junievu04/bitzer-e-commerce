import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowLeft: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M16.9141 4.70699C17.3047 4.31646 17.3047 3.68345 16.9141 3.29292C16.5236 2.9024 15.8906 2.9024 15.5001 3.29292L6.79304 12L15.5001 20.707C15.8906 21.0975 16.5236 21.0975 16.9141 20.707C17.3047 20.3165 17.3047 19.6834 16.9141 19.2929L9.62117 12L16.9141 4.70699Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowLeft
