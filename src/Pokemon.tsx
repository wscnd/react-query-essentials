import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export interface Pokemon {
  name: string;
  url: string;
}

type PokemonProps = {};

export const Pokemon = ({}: PokemonProps) => {
  const queryInfo = useQuery<Pokemon[]>(
    "pokemon",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return axios("https://pokeapi.co/api/v2/pokemon").then(
        (res) => res.data.results,
      );
      // .then((data) => {
      //   throw new Error("Error message");
      // });
    },
    {
      // refetchOnWindowFocus: false ,
      // staleTime: 5000,
      cacheTime: 0,
    },
  );

  return (
    <>
      {queryInfo.isFetching ? (
        <span className="Spacing">Updating...</span>
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
