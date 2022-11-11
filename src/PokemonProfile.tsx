import React, { useState, useEffect, ReactElement } from 'react'
import { Link, withRouter } from 'react-router-dom'

interface Props {
  match: { params: { name: string } }
}

function PokemonProfile ({ match: { params: { name } } }: Props): ReactElement {
  const [pokemon, setPokemon] = useState([])

  useEffect(function fetchPokemon () {
    void fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(results => results.json())
      .then(({ sprites }) => {
        setPokemon(Object.values(sprites).filter(image => typeof image === 'string').reverse())
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

export default withRouter(PokemonProfile)
