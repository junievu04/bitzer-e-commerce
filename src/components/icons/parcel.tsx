import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Parcel: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17H17C17.5523 17 18 16.5523 18 16C18 15.4477 17.5523 15 17 15H14Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 3V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V3H2ZM20 5H16V13L12 11L8 13V5H4V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V5ZM10 5H14V9.76393L12 8.76393L10 9.76393V5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Parcel
