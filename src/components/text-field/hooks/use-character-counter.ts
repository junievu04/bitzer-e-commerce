import {useEffect, useState} from 'react'

const useCharacterCounter = (
  value?: string | number | readonly string[],
  defaultValue?: string | number | readonly string[],
) => {
  const initialLen =
    typeof value === 'string'
      ? value.length
      : typeof defaultValue === 'string'
        ? defaultValue.length
        : 0

  const [length, setLength] = useState(initialLen)

  useEffect(() => {
    setLength(initialLen)
  }, [initialLen])

  return [length, setLength] as const
}

export default useCharacterCounter
