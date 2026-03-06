import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Person: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 10.5C13.6569 10.5 15 9.15685 15 7.5C15 5.84315 13.6569 4.5 12 4.5C10.3431 4.5 9 5.84315 9 7.5C9 9.15685 10.3431 10.5 12 10.5ZM9 16.5C6.94968 16.5 5.1876 17.7341 4.41604 19.5H19.584C18.8124 17.7341 17.0503 16.5 15 16.5H9ZM21.7101 19.5C21.8987 20.1337 22 20.805 22 21.5H2C2 20.805 2.10128 20.1337 2.28988 19.5C3.15043 16.6085 5.82898 14.5 9 14.5H15C18.171 14.5 20.8496 16.6085 21.7101 19.5ZM12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Person
