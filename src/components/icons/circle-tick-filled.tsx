import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const CircleTickFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.0355 10.5355C17.4261 10.145 17.4261 9.51184 17.0355 9.12132C16.645 8.7308 16.0118 8.7308 15.6213 9.12132L10.6716 14.0711L8.55025 11.9497C8.15973 11.5592 7.52656 11.5592 7.13604 11.9497C6.74551 12.3403 6.74551 12.9734 7.13604 13.364L9.96447 16.1924C10.355 16.5829 10.9882 16.5829 11.3787 16.1924L17.0355 10.5355Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default CircleTickFilled
