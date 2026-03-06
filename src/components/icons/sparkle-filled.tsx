import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const SparkleFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.9061 2.94165C12.547 2.1722 11.4529 2.1722 11.0938 2.94165L9.11485 7.18187C8.71752 8.03324 8.03318 8.71758 7.18181 9.11491L2.94159 11.0938C2.17214 11.4529 2.17214 12.5471 2.94159 12.9062L7.18181 14.8851C8.03318 15.2824 8.71752 15.9668 9.11485 16.8181L11.0938 21.0584C11.4529 21.8278 12.547 21.8278 12.9061 21.0584L14.885 16.8181C15.2824 15.9668 15.9667 15.2824 16.8181 14.8851L21.0583 12.9062C21.8277 12.5471 21.8277 11.4529 21.0583 11.0938L16.8181 9.11491C15.9667 8.71758 15.2824 8.03324 14.885 7.18187L12.9061 2.94165Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default SparkleFilled
