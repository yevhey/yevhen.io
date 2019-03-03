import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const searchInput = useSearchInput('');
  const values = useFetchAndSearch(searchInput.value);

  return (
    <>
      Focused input: <input {...searchInput} />
      <br />
      <br />
      Fetched data:
      {values.map(({ name }) => <div key={name}>{name}</div>)}
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

function useFetchAndSearch(searchValue) {
  const [values, setValues] = useState([]);
  const searchData = useRef([]);

  useEffect(function fetchData() {
    fetch('https://pokeapi.co/api/v2/nature', {
      cache: 'no-cache',
    })
    .then(results => results.json())
    .then(({ results }) => {
      setValues(results);
      searchData.current = results;
    });
  }, []);

  useEffect(function searchPokemon() {
    setValues(searchData.current.filter(({ name }) => name.includes(searchValue)));
  }, [searchValue]);

  return values;
}
