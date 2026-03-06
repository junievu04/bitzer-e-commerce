import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ClipboardPaper: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.5 2.5C9.1038 2.5 7.89855 3.31753 7.33682 4.5H5C3.89543 4.5 3 5.39543 3 6.5V19.5C3 20.6046 3.89543 21.5 5 21.5H9.64494C9.55064 21.1831 9.5 20.8475 9.5 20.5V19.5H5L5 6.5H7V8.5H14V6.5H16V9H18V6.5C18 5.39543 17.1046 4.5 16 4.5H13.6632C13.1015 3.31753 11.8962 2.5 10.5 2.5ZM12 6.5V6C12 5.17157 11.3284 4.5 10.5 4.5C9.67157 4.5 9 5.17157 9 6V6.5H12Z'
        fill='currentColor'
      />
      <path d='M14 15.5V13.5H18V15.5H14Z' fill='currentColor' />
      <path d='M14 16.5V18.5H18V16.5H14Z' fill='currentColor' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11 12.5C11 11.3954 11.8954 10.5 13 10.5H19C20.1046 10.5 21 11.3954 21 12.5V19.5C21 20.6046 20.1046 21.5 19 21.5H13C11.8954 21.5 11 20.6046 11 19.5V12.5ZM13 19.5V12.5H19V19.5H13Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ClipboardPaper
