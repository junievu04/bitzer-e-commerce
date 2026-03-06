import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowLeftRound: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M19.5 17.5C19.5 13.0817 15.9183 9.5 11.5 9.5C8.9873 9.5 6.74559 10.6572 5.27734 12.4717C5.26994 12.4808 5.26325 12.4907 5.25586 12.5H10.5C11.0523 12.5 11.5 12.9477 11.5 13.5C11.5 14.0523 11.0523 14.5 10.5 14.5H2.5V6.5C2.5 5.94772 2.94772 5.5 3.5 5.5C4.05228 5.5 4.5 5.94772 4.5 6.5V10.3604C6.30292 8.59267 8.7738 7.5 11.5 7.5C17.0228 7.5 21.5 11.9772 21.5 17.5C21.5 18.0523 21.0523 18.5 20.5 18.5C19.9477 18.5 19.5 18.0523 19.5 17.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowLeftRound
