'use client'
import React, { useState, useEffect } from 'react'

export default function PokemonImages ({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<string[]>([])

  useEffect(function fetchPokemon () {
    void fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(async results => await results.json())
      .then(({ sprites }: { sprites: { back_default: string } }) => {
        const pokemonAvatars = Object.values(sprites).filter(image => typeof image === 'string').reverse()

        setPokemon(pokemonAvatars)
      })
  }, [])

  return (
    <div>
      {pokemon.map(image => <img key={image} src={image} alt="pokemon image" />)}
    </div>
  )
}
