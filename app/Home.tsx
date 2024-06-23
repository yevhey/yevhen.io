import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import logInput from './log-input'
import { Search } from './Search';

export default function Home() {
  const didLogRef = useRef(false);
  const [values, setValues] = useState<Array<{ name: string }>>([])
  const [isLoading, setLoading] = useState(true)
  const dataRef = useRef<Array<{ name: string }>>([])
  const { value, onChange } = useSearchInput('')

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    onChange(value)
    logInput(`searched ${value}`)
  }

  useEffect(function firstRender () {
    if (!didLogRef.current) {
      didLogRef.current = true;

      logInput('opened /')
    }

    fetchData().then((data: Array<{ name: string }>) => {
      setValues(data)
      setLoading(false)
      dataRef.current = data
    })
      .catch(() => {})
  }, [])

  useEffect(function searchPokemon () {
    setValues(dataRef.current.filter(({ name }: { name: string }) => name.includes(value.toLowerCase())))
  }, [value, setValues, dataRef.current])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Search value={value} onChange={handleChange} />
      </div>
      <div>
        {!isLoading && values.map(({ name }) => (
          <div key={name}>
            <Link href={name}>
              {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

type searchInputType = (initialValue: string) => {
  readonly value: string
  readonly onChange: (value: string) => void
}

export const useSearchInput: searchInputType = (initialValue: string) => {
  const [value, setSearchValue] = useState(initialValue)

  const handleChange: (value: string) => void = (value) => {
    setSearchValue(value)
  }

  return {
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
