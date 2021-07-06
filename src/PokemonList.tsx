import React from "react";
import { UseQueryResult } from "react-query";
import { usePokemon } from "./hooks/usePokemon";

export interface Pokemon {
  name: string;
  url: string;
}

type PokemonProps = {
  queryInfo: UseQueryResult<Pokemon[], unknown>;
};

export const PokemonList = ({ queryInfo }: PokemonProps) => {
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
