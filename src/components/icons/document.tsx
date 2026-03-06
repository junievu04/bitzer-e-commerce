import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Document: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 20.5V3.5C4 2.39543 4.89543 1.5 6 1.5H14.2324C14.7265 1.5 15.2031 1.68315 15.5703 2.01367L19.3379 5.4043C19.7593 5.78356 20 6.32371 20 6.89062V20.5C20 21.6046 19.1046 22.5 18 22.5H6C4.89543 22.5 4 21.6046 4 20.5ZM15 9H18V20.5H6V3.5H13V7C13 8.10457 13.8954 9 15 9ZM15 7V4.19043L18 6.89062V7H15Z'
        fill='currentColor'
      />
      <path
        d='M15 16.25C15.5523 16.25 16 16.6977 16 17.25C16 17.8023 15.5523 18.25 15 18.25H8.5C7.94772 18.25 7.5 17.8023 7.5 17.25C7.5 16.6977 7.94772 16.25 8.5 16.25H15Z'
        fill='currentColor'
      />
      <path
        d='M15 13.25C15.5523 13.25 16 13.6977 16 14.25C16 14.8023 15.5523 15.25 15 15.25H8.5C7.94772 15.25 7.5 14.8023 7.5 14.25C7.5 13.6977 7.94772 13.25 8.5 13.25H15Z'
        fill='currentColor'
      />
      <path
        d='M11.5 10.25C12.0523 10.25 12.5 10.6977 12.5 11.25C12.5 11.8023 12.0523 12.25 11.5 12.25H8.5C7.94772 12.25 7.5 11.8023 7.5 11.25C7.5 10.6977 7.94772 10.25 8.5 10.25H11.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Document
