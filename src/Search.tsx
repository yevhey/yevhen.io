import React from 'react'
import { useSearchInput } from './Home'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Search = () => {
  const searchInput = useSearchInput('')

  return (
    <>
       {/* @ts-ignore */}
      Search the pokemon: <input {...searchInput} />
    </>
  )
}
