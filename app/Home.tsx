'use client'
import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { doc } from '../services/google-spreadsheet';
import { Search } from './Search';

const Home = (): ReactElement => {
  const [values, setValues] = useState<Array<{ name: string }>>([])
  const [isLoading, setLoading] = useState(true)
  const dataRef = useRef<Array<{ name: string }>>([])
  const { value, onChange } = useSearchInput('')

  useEffect(function firstRender () {
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

  const handleChange = async () => {
      try {
          await doc.loadInfo();
          const sheet = doc.sheetsByIndex[0];
          const rows = await sheet.getRows();

          rows[1].set('date', Date.now());
          await rows[1].save();
        } catch (error) {
          console.error(error);
        }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 24, gap: 16 }}>
      <div>
        <Search value={value} onChange={handleChange} />
      </div>
      <div>
        {!isLoading && values.map(({ name }) => (
          <div key={name}>
            {/*<Link to={name}>*/}
              {name}
            {/*</Link>*/}
          </div>
        ))}
      </div>
    </div>
  )
}

type searchInputType = (initialValue: string) => {
  readonly value: string
  readonly onChange: ({ target: { value } }: { target: { value: string } }) => void
}

export const useSearchInput: searchInputType = (initialValue: string) => {
  const [value, setSearchValue] = useState(initialValue)

  const handleChange: ({ target: { value } }: { target: { value: string } }) => void = ({ target: { value } }) => {
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

export default Home
