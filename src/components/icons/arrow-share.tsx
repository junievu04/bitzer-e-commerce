import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const ArrowShare: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        d='M13 8V2L21.416 10.5723C21.7902 10.9534 22 11.4659 22 12C22 12.5341 21.7902 13.0466 21.416 13.4277L13 22V16H11V14H15V17.1074L19.9893 12.0264C19.9961 12.0193 20 12.0099 20 12C20 11.9901 19.9961 11.9807 19.9893 11.9736L15 6.8916V10H12C8.24012 10 5.087 12.594 4.23047 16.0898C6.15663 14.7714 8.48782 14 11 14V16C7.04184 16 3.62074 18.2996 2 21.6357V18C2 12.4772 6.47715 8 12 8H13Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default ArrowShare
