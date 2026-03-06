import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Paperplane: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.50049 2L21.0523 11.2764C21.3264 11.4134 21.4995 11.6935 21.4995 12C21.4995 12.3064 21.3264 12.5865 21.0523 12.7236L2.50049 22V2ZM4.50049 11V5.23614L18.0275 12L4.50049 18.7639V13H9.49951C10.0518 13 10.4995 12.5523 10.4995 12C10.4995 11.4477 10.0518 11 9.49951 11H4.50049Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Paperplane
