import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const BookmarkFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5 1.75C4.17157 1.75 3.5 2.42157 3.5 3.25V22.25L12 19.75L20.5 22.25V3.25C20.5 2.42157 19.8284 1.75 19 1.75H5ZM12.4136 7.61028C13.4628 6.46324 15.1639 6.46324 16.2131 7.61028C17.2623 8.75732 17.2623 10.617 16.2131 11.7641L12.9669 15.313C12.7031 15.6014 12.3582 15.747 12.0125 15.7499C11.6586 15.7539 11.3036 15.6083 11.0336 15.3131L7.7866 11.7633C6.7378 10.6167 6.7378 8.75771 7.7866 7.61112C8.83539 6.46452 10.5358 6.46452 11.5846 7.61112L11.9987 8.06385L12.4136 7.61028Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default BookmarkFilled
