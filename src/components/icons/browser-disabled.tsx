import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const BrowserDisabled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M4.20711 2.79289C3.81658 2.40237 3.18342 2.40237 2.79289 2.79289C2.40237 3.18342 2.40237 3.81658 2.79289 4.20711L19.7929 21.2071C20.1834 21.5976 20.8166 21.5976 21.2071 21.2071C21.5976 20.8166 21.5976 20.1834 21.2071 19.7929L4.20711 2.79289Z'
        fill='currentColor'
      />
      <path
        d='M3 18V6.53552L5 8.53552V18H14.4645L16.4645 20H5C3.89543 20 3 19.1046 3 18Z'
        fill='currentColor'
      />
      <path
        d='M19 8V15.4645L21 17.4645L21.001 6C21.001 4.89543 20.1055 4 19.001 4H7.53555L11.5355 8H19Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default BrowserDisabled
