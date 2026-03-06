import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const FlagPole: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.798 4.19154C15.1886 3.80102 15.1886 3.16785 14.798 2.77733C14.4075 2.3868 13.7743 2.38681 13.3838 2.77733L0.655899 15.5053C0.265375 15.8958 0.265376 16.5289 0.6559 16.9195C1.04642 17.31 1.67959 17.31 2.07011 16.9195L6.66641 12.3232L15.8588 21.5156L17.4727 16.0285C17.5686 15.7023 17.8237 15.4472 18.1499 15.3513L23.637 13.7374L14.4446 4.54501L14.798 4.19154ZM13.0304 5.95923L19.8405 12.7693L17.5855 13.4325C16.607 13.7203 15.8417 14.4856 15.5539 15.4641L14.8907 17.7191L8.08063 10.909L13.0304 5.95923Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default FlagPole
