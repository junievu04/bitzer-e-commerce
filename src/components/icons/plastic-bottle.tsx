import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const PlasticBottle: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 7.125V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V7.125L19 10.5V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V10.5L8 7.125ZM10 4H14V6H10V4ZM9.89813 8L7 11.2604V12H17V11.2604L14.1019 8H9.89813ZM7 14V16H17V14H7ZM17 18V20H7L7 18H17Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default PlasticBottle
