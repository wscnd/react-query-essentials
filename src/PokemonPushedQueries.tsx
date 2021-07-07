import React, { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import { usePokemonByName } from "./hooks/usePokemonByName";
import { usePokemonPushingQuery } from "./hooks/usePokemonPushingQuery";
import type { Pokemon as PokemonType } from "./PokemonList";

type PokemonSeededQueriesProps = {};

export const PokemonPushedQueries = ({}: PokemonSeededQueriesProps) => {
  const [pokemonId, setPokemonId] = useState("");

  return (
    <>
      {Boolean(pokemonId) ? (
        <Pokemon pokemonId={pokemonId} setPokemonId={setPokemonId} />
      ) : (
        <Pokemons setPokemonId={setPokemonId} />
      )}
    </>
  );
};

type NumberUseStateFn<S> = [S, Dispatch<SetStateAction<S>>];

type PokemonsProps = {
  pokemonId: NumberUseStateFn<string>[0];
  setPokemonId: NumberUseStateFn<string>[1];
};

const Pokemons = ({ setPokemonId }: Pick<PokemonsProps, "setPokemonId">) => {
  const pokemonPushedQuery = usePokemonPushingQuery();

  return (
    <div>
      <h1>Pokemons! </h1>
      {pokemonPushedQuery.isFetching ? <span>updating...</span> : null}
      <section>
        {pokemonPushedQuery.isLoading ? (
          "Loading Pokemons"
        ) : (
          <ul>
            {!!pokemonPushedQuery.data?.length &&
              pokemonPushedQuery.data.map((pokemon) => (
                <li key={pokemon.name}>
                  <a onClick={() => setPokemonId(pokemon.name)} href="#">
                    {pokemon.name}
                  </a>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

const Pokemon = ({ pokemonId, setPokemonId }: PokemonsProps) => {
  const queryClient = useQueryClient();
  const pokemonQuery = usePokemonByName({
    pokemonName: pokemonId,
  });

  console.log(
    queryClient
      .getQueryData<PokemonType[]>("pokemon")
      ?.find((pokemon) => pokemon.name === pokemonId),
  );

  return (
    <div>
      <h1>{pokemonId} page</h1>
      <button onClick={() => setPokemonId("")}>Go back to posts</button>
      <div>
        {pokemonQuery.isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div>
              <img
                src={pokemonQuery.data?.sprites?.front_default}
                width="200"
              />

              <h2>{pokemonQuery.data?.name}</h2>
              <span>
                {pokemonQuery.data?.url ? (
                  <h5>
                    this is information from the `pokemon` query key{" "}
                    {pokemonQuery.data.url}
                  </h5>
                ) : null}
              </span>
            </div>
          </>
        )}
        {pokemonQuery.isFetching ? <span>Fetching...</span> : null}
      </div>
    </div>
  );
};
