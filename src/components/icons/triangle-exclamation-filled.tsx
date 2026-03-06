import type {FC} from 'react'
import BaseIcon, {type BaseIconProps} from './base'

const TriangleExclamationFilled: FC<BaseIconProps> = (props) => {
  return (
    <BaseIcon viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 3C10.6136 3 9.33863 3.75939 8.67833 4.97841L2.39893 16.5712C1.31619 18.5701 2.76349 21 5.0368 21H18.9631C21.2364 21 22.6837 18.5701 21.601 16.5712L15.3216 4.97841C14.6613 3.75939 13.3863 3 12 3ZM13.5326 16.4995C13.5326 15.6711 12.861 14.9995 12.0326 14.9995C11.2042 14.9995 10.5326 15.6711 10.5326 16.4995C10.5326 17.3279 11.2042 17.9995 12.0326 17.9995C12.861 17.9995 13.5326 17.3279 13.5326 16.4995ZM12.0326 14C12.5849 14 13.0326 13.5523 13.0326 13V8.5C13.0326 7.94772 12.5849 7.5 12.0326 7.5C11.4803 7.5 11.0326 7.94772 11.0326 8.5V13C11.0326 13.5523 11.4803 14 12.0326 14Z'
        fill='currentColor'
      />
    </BaseIcon>
  )
}

export default TriangleExclamationFilled
