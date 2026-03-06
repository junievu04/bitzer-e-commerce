import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Shield: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 2L22 6C22 8.39915 21.5856 10.743 20.876 12.8646C19.121 18.1123 15.5605 22 12 22C11.8926 22 11.7852 21.9965 11.6778 21.9895C7.75249 21.7331 3.89314 16.8399 2.52295 10.7018C2.18617 9.19294 2 7.60892 2 6L12 2ZM4.04688 7.33529L12 4.15405L12 12C9.50325 12 7.06756 11.7386 4.71882 11.2416C4.37486 9.99927 4.14123 8.68415 4.04688 7.33529ZM12 20C13.4809 20 15.4532 18.7878 17.1857 16.0543C17.6636 15.3003 18.0983 14.4652 18.4755 13.5683C18.5007 13.5085 18.5256 13.4484 18.5502 13.3881C16.4283 13.7898 14.2387 13.9999 12 13.9999L12 20Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Shield
