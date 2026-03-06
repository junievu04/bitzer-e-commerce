import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowLeftMax: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M4.50006 20V4C4.50006 3.44772 4.94778 3 5.50006 3C6.05235 3 6.50006 3.44772 6.50006 4V20C6.50006 20.5523 6.05235 21 5.50006 21C4.94778 21 4.50006 20.5523 4.50006 20ZM17.793 3.29297C18.1836 2.90244 18.8166 2.90244 19.2071 3.29297C19.5976 3.68349 19.5976 4.31651 19.2071 4.70703L11.9141 12L19.2071 19.293C19.5976 19.6835 19.5976 20.3165 19.2071 20.707C18.8166 21.0976 18.1836 21.0976 17.793 20.707L9.086 12L17.793 3.29297Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowLeftMax
