import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const SpeechBubbleDots: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M9 10C9 10.8284 8.32843 11.5 7.5 11.5C6.67157 11.5 6 10.8284 6 10C6 9.17157 6.67157 8.5 7.5 8.5C8.32843 8.5 9 9.17157 9 10Z'
        fill='currentColor'
      />
      <path
        d='M13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.1716 11.5 10.5 10.8284 10.5 10C10.5 9.17157 11.1716 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10Z'
        fill='currentColor'
      />
      <path
        d='M16.5 11.5C17.3284 11.5 18 10.8284 18 10C18 9.17157 17.3284 8.5 16.5 8.5C15.6716 8.5 15 9.17157 15 10C15 10.8284 15.6716 11.5 16.5 11.5Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.7647 17H6.50342L2 21V5.23529C2 4.00078 3.00078 3 4.23529 3H19.7647C20.9992 3 22 4.00078 22 5.23529V14.7647C22 15.9992 20.9992 17 19.7647 17ZM4 16.5486V5.23529C4 5.10534 4.10534 5 4.23529 5H19.7647C19.8947 5 20 5.10535 20 5.23529V14.7647C20 14.8947 19.8947 15 19.7647 15H5.74345L4 16.5486Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default SpeechBubbleDots
