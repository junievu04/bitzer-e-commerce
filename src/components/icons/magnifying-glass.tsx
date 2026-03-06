import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const MagnifyingGlass: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.6617 14.5403C18.591 11.6283 18.2728 7.66619 15.7071 5.10051C12.7782 2.17158 8.02944 2.17158 5.10051 5.10051C2.17158 8.02944 2.17158 12.7782 5.10051 15.7071C7.66621 18.2728 11.6283 18.591 14.5404 16.6617L18.5356 20.6568C19.1214 21.2426 20.0711 21.2426 20.6569 20.6568C21.2427 20.0711 21.2427 19.1213 20.6569 18.5355L16.6617 14.5403ZM14.2929 6.51472C16.4408 8.6626 16.4408 12.145 14.2929 14.2929C12.145 16.4408 8.6626 16.4408 6.51472 14.2929C4.36684 12.145 4.36684 8.6626 6.51472 6.51472C8.6626 4.36684 12.145 4.36684 14.2929 6.51472Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default MagnifyingGlass
