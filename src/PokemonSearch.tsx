import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePokemonByName } from "./hooks/usePokemonByName";
import { PokemonList } from "./PokemonList";

type PokemonSearchProps = {};

export const PokemonSearch = ({}: PokemonSearchProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const pokemon = usePokemonByName({ pokemonName: input });

  const onSubmitHandler = useCallback(() => {
    if (inputRef.current) {
      console.log(inputRef.current.value);
      setInput(String(inputRef.current.value).toLowerCase());
    }
  }, []);

  return (
    <div className="Spacing">
      <h2>Search Pokemon</h2>
      <input type="text" ref={inputRef} />
      <button type="submit" onClick={onSubmitHandler}>
        Search!
      </button>
      <span style={{ display: "block" }}>{input}</span>
      {pokemon.isSuccess && pokemon.data.sprites?.front_default ? (
        <div>
          <img src={pokemon.data.sprites.front_default} alt="pokemon" />
        </div>
      ) : pokemon.isError ? (
        <span>
          Error fetching <strong>{input}</strong>!
        </span>
      ) : null}
    </div>
  );
};
