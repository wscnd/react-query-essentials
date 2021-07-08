import React, { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { usePokemon } from "./hooks/usePokemon";
import { fetchPokemonByName, usePokemonByName } from "./hooks/usePokemonByName";

export const PrefetchPokemonListRoutered = () => {
  const pokemonQuery = usePokemon();
  const queryClient = useQueryClient();

  return (
    <div>
      <h1>Pokemons! </h1>
      {pokemonQuery.isFetching ? <span>updating...</span> : null}
      <section>
        {pokemonQuery.isLoading ? (
          "Loading Pokemons"
        ) : (
          <ul>
            {!!pokemonQuery.data?.length &&
              pokemonQuery.data.map((pokemon) => (
                <li
                  key={pokemon.name}
                  onMouseEnter={async () => {
                    await queryClient.prefetchQuery(
                      ["pokemon", pokemon.name],
                      () => fetchPokemonByName(pokemon.name),
                      { staleTime: 10000 , },
                    );
                    console.log(`hovered ${pokemon.name}`);
                  }}
                >
                  <Link to={`${pokemon.name}`}>{pokemon.name}</Link>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};
export const PrefetchPokemonRoutered = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const pokemonQuery = usePokemonByName({
    pokemonName: pokemonId,
    queryConfigs: { staleTime: 5000 },
  });

  return (
    <div>
      <h1>{pokemonId} page</h1>
      <Link to={"/"}>Back</Link>
      <div>
        {pokemonQuery.isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div>
              <img src={pokemonQuery.data?.sprites.front_default} width="200" />

              <h2>{pokemonQuery.data?.name}</h2>
            </div>
            {pokemonQuery.isFetching ? <span>Updating...</span> : null}
          </>
        )}
      </div>
    </div>
  );
};
