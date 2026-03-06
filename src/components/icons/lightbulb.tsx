import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Lightbulb: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.5 9.5C19.5 12.1716 18.1032 14.5169 16 15.8454V18.5H8V15.8454C5.89683 14.5169 4.5 12.1716 4.5 9.5C4.5 5.35786 7.85786 2 12 2C16.1421 2 19.5 5.35786 19.5 9.5ZM14.9319 14.1546L14 14.7432V16.5H10V14.7432L9.06813 14.1546C7.52063 13.177 6.5 11.457 6.5 9.5C6.5 6.46243 8.96243 4 12 4C15.0376 4 17.5 6.46243 17.5 9.5C17.5 11.457 16.4794 13.177 14.9319 14.1546Z'
        fill='currentColor'
      />
      <path
        d='M9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22H15C15.5523 22 16 21.5523 16 21C16 20.4477 15.5523 20 15 20H9Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Lightbulb
