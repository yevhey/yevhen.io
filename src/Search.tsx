import React, { useRef } from 'react'
import { useSearchInput } from './Home'
import { SearchInput } from './SearchInput'

export const Search: () => JSX.Element = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { value, onChange } = useSearchInput('')

  return (
    <>
      Search the pokemon:
      <SearchInput ref={ref} value={value} onChange={onChange} />
    </>
  )
}
