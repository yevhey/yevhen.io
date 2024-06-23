'use client'
import React from 'react'
import Link from 'next/link'
import PokemonTitle from '../PokemonTitle';
import PokemonImages from '../PokemonImages';

interface Props {
  params: { slug: string }
}
export default function PokemonProfile ({ params: { slug } }: Props) {
  return (
   <>
    <Link href="/">&lt; Back</Link>
     <br />
     <br />
     <PokemonTitle name={slug} />
     <PokemonImages name={slug} />
   </>
  )
}
