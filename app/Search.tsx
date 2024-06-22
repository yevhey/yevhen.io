import React, { useEffect, useRef } from 'react'
import { SearchInput } from './SearchInput'

export const Search: ({ value, onChange }: { value: string, onChange: ({ target: { value } }: { target: { value: string } }) => void }) => JSX.Element = ({ value, onChange }: { value: string, onChange: ({ target: { value } }: { target: { value: string } }) => void }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(function firstRender () {
    ref.current?.focus()
  }, [ref.current])

  return (
    <>
      Search the pokemon:&nbsp;
      <SearchInput ref={ref} value={value} onChange={onChange} />
    </>
  )
}
