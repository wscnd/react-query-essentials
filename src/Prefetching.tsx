import React, { useEffect, useReducer } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchPokemonList, usePokemon } from "./hooks/usePokemon";

type QueryProps = {};

export const Prefetching = () => {
  const [show, toggle] = useReducer((s) => !s, false);
  const queryClient = useQueryClient();

  useEffect(() => {
    async function prefetch() {
      await queryClient.prefetchQuery("pokemon", fetchPokemonList);
    }
    prefetch();
  }, []);

  return (
    <div>
      <button onClick={toggle}>
        {show ? "Hide Pokemons" : "Show Pokemons"}
      </button>
      {show ? <Query /> : null}
    </div>
  );
};

export const Query = ({}: QueryProps) => {
  const queryInfo = usePokemon();

  return (
    <div>
      <h1>Pokemons </h1>
      <h5>{queryInfo.isFetching ? "fetching..." : null}</h5>
      <div>
        {queryInfo.isLoading ? (
          "loading pokemons..."
        ) : (
          <ul>
            {queryInfo.data?.length &&
              queryInfo.data.map((pokemon) => (
                <li key={pokemon.name}>{pokemon.name}</li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
