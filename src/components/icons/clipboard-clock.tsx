import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ClipboardClock: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.83682 4C7.39855 2.81753 8.6038 2 10 2C11.3962 2 12.6015 2.81753 13.1632 4H15.5C16.6046 4 17.5 4.89543 17.5 6V8.25204C16.8608 8.08751 16.1906 8 15.5 8V6H13.5V8H6.5V6H4.5L4.5 19H8.08152C8.37526 19.7257 8.77238 20.3984 9.25463 21H4.5C3.39543 21 2.5 20.1046 2.5 19V6C2.5 4.89543 3.39543 4 4.5 4H6.83682ZM11.5 5.5V6H8.5V5.5C8.5 4.67157 9.17157 4 10 4C10.8284 4 11.5 4.67157 11.5 5.5Z'
        fill='currentColor'
      />
      <path
        d='M16.5 14C16.5 13.4477 16.0523 13 15.5 13C14.9477 13 14.5 13.4477 14.5 14V16.4142L16.2929 18.2071C16.6834 18.5976 17.3166 18.5976 17.7071 18.2071C18.0976 17.8166 18.0976 17.1834 17.7071 16.7929L16.5 15.5858V14Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.5 22C18.8137 22 21.5 19.3137 21.5 16C21.5 12.6863 18.8137 10 15.5 10C12.1863 10 9.5 12.6863 9.5 16C9.5 19.3137 12.1863 22 15.5 22ZM15.5 20C17.7091 20 19.5 18.2091 19.5 16C19.5 13.7909 17.7091 12 15.5 12C13.2909 12 11.5 13.7909 11.5 16C11.5 18.2091 13.2909 20 15.5 20Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ClipboardClock
