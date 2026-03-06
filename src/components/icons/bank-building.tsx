import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const BankBuilding: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.9025 2.7966C12.6411 2.60394 12.3248 2.5 12 2.5C11.6752 2.5 11.3589 2.60394 11.0975 2.7966L2 9.5H22L12.9025 2.7966ZM12 4.61588L8.08583 7.5H15.9142L12 4.61588Z'
        fill='currentColor'
      />
      <path
        d='M6 11.5C6.55228 11.5 7 11.9477 7 12.5V17.5C7 18.0523 6.55228 18.5 6 18.5C5.44772 18.5 5 18.0523 5 17.5V12.5C5 11.9477 5.44772 11.5 6 11.5Z'
        fill='currentColor'
      />
      <path
        d='M13 12.5C13 11.9477 12.5523 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V17.5C11 18.0523 11.4477 18.5 12 18.5C12.5523 18.5 13 18.0523 13 17.5V12.5Z'
        fill='currentColor'
      />
      <path
        d='M18 11.5C18.5523 11.5 19 11.9477 19 12.5V17.5C19 18.0523 18.5523 18.5 18 18.5C17.4477 18.5 17 18.0523 17 17.5V12.5C17 11.9477 17.4477 11.5 18 11.5Z'
        fill='currentColor'
      />
      <path
        d='M3 19.5C2.44772 19.5 2 19.9477 2 20.5C2 21.0523 2.44772 21.5 3 21.5H21C21.5523 21.5 22 21.0523 22 20.5C22 19.9477 21.5523 19.5 21 19.5H3Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default BankBuilding
