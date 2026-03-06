import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowUpTrend: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M22.4999 11.5C22.4999 12.0523 22.0522 12.5 21.4999 12.5C20.9476 12.5 20.4999 12.0523 20.4999 11.5V8.51465L13.0663 16.3867L9.04485 12.8682L3.20696 18.707C2.81643 19.0976 2.18342 19.0976 1.79289 18.707C1.40237 18.3165 1.40237 17.6835 1.79289 17.293L8.95403 10.1318L12.9335 13.6133L19.1806 7H15.9999C15.4476 7 14.9999 6.55228 14.9999 6C14.9999 5.44772 15.4476 5 15.9999 5H22.4999V11.5Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowUpTrend
