'use client'
import React, { useState, useEffect, ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  match: { params: { name: string } }
}

function PokemonProfile ({ match: { params: { name } } }: Props): ReactElement {
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
   <>
    <Link to="/">&lt; Back</Link>
     <br />
     <br />
     <div style={{ textTransform: 'capitalize' }}>{name}</div>
     {pokemon.map(image => (
       <img key={image} src={image} alt="pokemon image" />
     ))}
   </>
  )
}

export default PokemonProfile
