import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { Link } from 'react-router-dom'
// import { Demo } from './Demo'
// import { PatchedDemo } from './PatchedDemo'
// import ApplePayButton from './ApplePayButton';

const Home = (): ReactElement => {
  const [values, setValues] = useState([])
  const [isLoading, setLoading] = useState(true)
  const dataRef = useRef([])

  useEffect(function firstRender () {
    fetchData().then(data => {
      setValues(data)
      setLoading(false)
      dataRef.current = data
    })
      .catch(() => {})
  }, [])

  useEffect(function searchPokemon () {
    setValues(dataRef.current.filter(({ name }: { name: string }) => name.includes(searchInput.value.toLowerCase())))
  }, [setValues, dataRef.current])

  return (
    <div>
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

export const useSearchInput: {} = (initialValue: string) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setSearchValue] = useState(initialValue)

  useEffect(function firstRender () {
    inputRef.current?.focus()
  }, [inputRef.current])

  const handleChange: {} = ({ target: { value } }) => {
    setSearchValue(value)
  }

  return {
    ref: inputRef,
    value,
    onChange: handleChange
  }
}

async function fetchData (): Promise<{}> {
  const results = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000', {
    cache: 'no-cache'
  })
  const { results: data } = await results.json()
  return data
}

export default Home
