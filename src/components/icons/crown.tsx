import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Crown: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6 9.07692L7.5 16H16.5L18 9.07692L15.001 10.5L12 6L9.00098 10.5L6 9.07692ZM9.11307 14L8.78562 12.4887C9.50938 12.5669 10.2419 12.2444 10.6652 11.6091L12.0005 9.60555L13.337 11.6096C13.7601 12.2441 14.4914 12.5663 15.2143 12.4889L14.8869 14H9.11307Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Crown
