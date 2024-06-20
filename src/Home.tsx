import React, {useState, useEffect, useRef, ReactElement, RefObject} from 'react'
import { Link } from 'react-router-dom'
import { Search } from './Search';

const Home = (): ReactElement => {
  const [values, setValues] = useState<Array<{ name: string }>>([])
  const [isLoading, setLoading] = useState(true)
  const dataRef = useRef([])
  const { value } = useSearchInput('')

  useEffect(function firstRender () {
    fetchData().then((data: Array<{ name: string }>) => {
      setValues(data)
      setLoading(false)
    })
      .catch(() => {})
  }, [])

  useEffect(function searchPokemon () {
    setValues(dataRef.current.filter(({ name }: { name: string }) => name.includes(value.toLowerCase())))
  }, [setValues, dataRef.current])

  return (
    <div>
      <Search />
      {!isLoading && values.map(({ name }) => (
        <div key={name}>
          <Link to={name}>
            {name}
          </Link>
        </div>
      ))}
    </div>
  )
}

type searchInputType = (initialValue: string) => {
  readonly ref: RefObject<HTMLInputElement>
  readonly value: string
  readonly onChange: ({ target: { value } }: { target: { value: string } }) => void
}

export const useSearchInput: searchInputType = (initialValue: string) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setSearchValue] = useState(initialValue)

  useEffect(function firstRender () {
    inputRef.current?.focus()
  }, [inputRef.current])

  const handleChange: ({ target: { value } }: { target: { value: string } }) => void = ({ target: { value } }) => {
    setSearchValue(value)
  }

  return {
    ref: inputRef,
    value,
    onChange: handleChange
  } as const
}

async function fetchData (): Promise<{}> {
  const results = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000', {
    cache: 'no-cache'
  })
  const { results: data } = await results.json()
  return data
}

export default Home
