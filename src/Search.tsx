import React, { forwardRef, useRef } from 'react'
import { useSearchInput } from './Home'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Search = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { value, onChange } = useSearchInput('')

  return (
    <>
      Search the pokemon: {forwardRef((_, ref) => <input ref={ref} value={value} onChange={onChange} />, ref)}
    </>
  )
}
