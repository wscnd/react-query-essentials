import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useCancellablePokemonByName } from "./hooks/useCancellablePokemonByName";

type PokemonSearchProps = {};

export const PokemonCancellableSearch = ({}: PokemonSearchProps) => {
  const [input, setInput] = useState("");

  const pokemon = useCancellablePokemonByName({ pokemonName: input });

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value.toLowerCase());
    },
    [],
  );

  return (
    <div className="Spacing">
      <h2>Search Pokemon</h2>
      <input type="text" value={input} onChange={onChangeHandler} />
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
