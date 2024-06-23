import React, { useEffect, useRef } from 'react'
import logInput from './log-input';

export default function PokemonTitle({ name }: { name: string }) {
  const didLogRef = useRef(false);

  useEffect(() => {
    if (!didLogRef.current) {
      didLogRef.current = true;

      logInput(`opened ${name}`)
    }
  }, []);

  return <div style={{ textTransform: 'capitalize' }}>{name}</div>
}
