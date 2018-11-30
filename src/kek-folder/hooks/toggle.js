import React, {useState, useCallback} from 'react'

export default (initial) => {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(!value))

  return [value, toggle]
}
