import React from "react";
import { PokemonCount } from "./PokemonCount";
import { usePokemon } from "./usePokemon";

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
        <span className="Spacing">Updating...</span>
      ) : null}

      {queryInfo.isLoading ? (
        "...Loading..."
      ) : queryInfo.isError ? (
        ` ${queryInfo.error}`
      ) : (
        <>
          <PokemonCount />
          {queryInfo.data?.length &&
            queryInfo.data.map((pokemon) => (
              <div key={pokemon.name}>{pokemon.name}</div>
            ))}
        </>
      )}
    </>
  );
};
