import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ApplePayButton from './ApplePayButton';

export default function Home() {
  const searchInput = useSearchInput('');
  const [values, setValues] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const dataRef = useRef([]);

  useEffect(function firstRender() {
    fetchData().then(data =>{
      setValues(data);
      setLoading(false);
      dataRef.current = data;
    });
  }, []);

  useEffect(function searchPokemon() {
    setValues(dataRef.current.filter(({ name }) => name.includes(searchInput.value.toLowerCase())));
  }, [searchInput.value]);

  return (
    <>
      <ApplePayButton />
      <br />
      <br />
      Search the pokemon: <input {...searchInput} />
      <br />
      <br />
      {!isLoading && values.map(({ name }) =>(
        <div key={name}>
          <Link to={name}>
            {name}
          </Link>
        </div>
      ))}
    </>
  );
};

function useSearchInput(initialValue) {
  const inputRef = useRef();
  const [value, setSearchValue] = useState(initialValue);

  useEffect(function firstRender() {
    inputRef.current.focus();
  }, [inputRef]);

  function handleChange({ target: { value } }) {
    setSearchValue(value);
  }

  return {
    ref: inputRef,
    value,
    onChange: handleChange,
  };
}

function fetchData() {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=1000', {
    cache: 'no-cache',
  })
    .then(results => results.json())
    .then(({ results }) => results);
}