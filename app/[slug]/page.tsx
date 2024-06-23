'use client'
import React, { useState, useEffect, ReactElement } from 'react'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export default function PokemonProfile ({ params: { slug } }: Props): ReactElement {
  const [pokemon, setPokemon] = useState<string[]>([])

  useEffect(function fetchPokemon () {
    void fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
      .then(async results => await results.json())
      .then(({ sprites }: { sprites: { back_default: string } }) => {
        const pokemonAvatars = Object.values(sprites).filter(image => typeof image === 'string').reverse()

        setPokemon(pokemonAvatars)
      })
  }, [])

  return (
   <>
    <Link href="/">&lt; Back</Link>
     <br />
     <br />
     <div style={{ textTransform: 'capitalize' }}>{slug}</div>
     {pokemon.map(image => (
       <img key={image} src={image} alt="pokemon image" />
     ))}
   </>
  )
}
