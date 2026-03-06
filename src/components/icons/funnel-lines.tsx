import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const FunnelLines: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M15 17C15.5523 17 16 17.4477 16 18C16 18.5523 15.5523 19 15 19H9C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17H15ZM18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H18ZM22 5C22.5523 5 23 5.44772 23 6C23 6.55228 22.5523 7 22 7H2C1.44772 7 1 6.55228 1 6C1 5.44772 1.44772 5 2 5H22Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default FunnelLines
