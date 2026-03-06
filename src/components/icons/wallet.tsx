import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Wallet: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21 9V11.2676C21.5978 11.6134 22 12.2597 22 13V15C22 15.7403 21.5978 16.3866 21 16.7324V19C21 20.1046 20.1046 21 19 21H4C2.89543 21 2 20.1046 2 19V7C2 4.79086 3.79086 3 6 3H16C17.1046 3 18 3.89543 18 5V7H19C20.1046 7 21 7.89543 21 9ZM16 5V7H9C8.44772 7 8 7.44772 8 8C8 8.55228 8.44772 9 9 9H19V11H15C13.8954 11 13 11.8954 13 13V15C13 16.1046 13.8954 17 15 17H19V19H4V7C4 5.89543 4.89543 5 6 5H16ZM20 13H15V15H20V13Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Wallet
