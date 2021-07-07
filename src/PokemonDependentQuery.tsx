import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { usePokemonDependentQuery } from "./hooks/usePokemonDependentQuery";
import { usePokemon } from "./hooks/usePokemon";

type MyPostDependentQueryProps = {};

export interface Pokemon {
  name: string;
  url: string;
}

export const PokemonDependentQuery = ({}: MyPostDependentQueryProps) => {
  const firstQuery = usePokemon();

  const dependentQuery = usePokemonDependentQuery({
    name: firstQuery.data ? firstQuery.data[0].name : "",
    url: firstQuery.data ? firstQuery.data[0].url : "",
  });

  console.log(dependentQuery.data);

  return (
    <>
      {firstQuery.isFetching ? (
        <span>Fetching main query</span>
      ) : firstQuery.isLoading ? (
        <span>Main query is loading ! </span>
      ) : (
        <div>
          Loaded: {firstQuery.data?.length} pokemons, will search for `
          {firstQuery.data?.[0].name}`
        </div>
      )}

      {dependentQuery.isIdle ? (
        <span>second query is idle</span>
      ) : dependentQuery.isFetching ? (
        <span>Second query is fetching! </span>
      ) : dependentQuery.isLoading ? (
        <span>Second query is loading ! </span>
      ) : dependentQuery.isSuccess ? (
        <>
          <div>{dependentQuery.data.name}</div>
          <img src={dependentQuery.data.sprites.front_default} alt="pokemon" />
        </>
      ) : null}
    </>
  );
};
