import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowRightRound: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M4.5 17.5C4.5 13.0817 8.08172 9.5 12.5 9.5C15.0127 9.5 17.2544 10.6572 18.7227 12.4717C18.7301 12.4808 18.7368 12.4907 18.7441 12.5H13.5C12.9477 12.5 12.5 12.9477 12.5 13.5C12.5 14.0523 12.9477 14.5 13.5 14.5H21.5V6.5C21.5 5.94772 21.0523 5.5 20.5 5.5C19.9477 5.5 19.5 5.94772 19.5 6.5V10.3604C17.6971 8.59267 15.2262 7.5 12.5 7.5C6.97715 7.5 2.5 11.9772 2.5 17.5C2.5 18.0523 2.94772 18.5 3.5 18.5C4.05228 18.5 4.5 18.0523 4.5 17.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowRightRound
