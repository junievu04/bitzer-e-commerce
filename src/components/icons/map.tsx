import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const Map: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.5 2L14.5 5.5L20.5771 2.66401C21.2401 2.35462 22 2.83858 22 3.5702V17.8631C22 18.2517 21.775 18.605 21.4229 18.7693L14.5 22L9.5 18.5L3.42289 21.336C2.7599 21.6454 2 21.1614 2 20.4298V6.13686C2 5.74834 2.22504 5.39498 2.57711 5.23068L9.5 2ZM13.5 18.8587V7.24131L10.5 5.14131V16.7587L13.5 18.8587ZM8.5 16.7596V4.67373L4 6.77373V18.8596L8.5 16.7596ZM20 17.2263L15.5 19.3263V7.24039L20 5.14039V17.2263Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default Map
