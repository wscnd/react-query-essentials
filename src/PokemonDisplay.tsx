import React from "react";
import { usePokemon } from "./hooks/usePokemon";

export interface Pokemon {
  name: string;
  url: string;
}

type PokemonProps = {};

export const DisplayPokemon = () => {
  const queryInfo = usePokemon();
  return (
    <>
      {queryInfo.isFetching ? (
        <span className="Spacing">Fetching...</span>
      ) : null}

      {queryInfo.isLoading
        ? "...Loading..."
        : queryInfo.isError
        ? ` ${queryInfo.error}`
        : queryInfo.data?.length &&
          queryInfo.data.map((pokemon) => (
            <div key={pokemon.name}>{pokemon.name}</div>
          ))}
    </>
  );
};
