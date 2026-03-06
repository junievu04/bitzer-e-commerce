import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const FlashFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M8.30532 2C7.87489 2 7.49275 2.27543 7.35664 2.68377L4.02331 12.6838C3.80746 13.3313 4.28943 14 4.97199 14H7.91776L6.23396 19.773C5.90919 20.8865 6.7443 22 7.90418 22C8.34156 22 8.76288 21.8353 9.08427 21.5386L19.7051 11.7348C20.374 11.1174 19.9371 10 19.0268 10H15.9179L18.1458 3.31623C18.3617 2.6687 17.8797 2 17.1971 2H8.30532Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default FlashFilled
