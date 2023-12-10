import React, { forwardRef, useRef } from 'react'
import { useSearchInput } from './Home'
import {SearchInput} from "./SearchInput";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Search = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { value, onChange } = useSearchInput('')

  return (
    <>
      Search the pokemon:
      <SearchInput ref={ref} value={value} onChange={onChange} />
    </>
  )
}
