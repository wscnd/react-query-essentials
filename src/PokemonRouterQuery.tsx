import React, { Dispatch, SetStateAction, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePokemon } from "./hooks/usePokemon";
import { usePokemonByName } from "./hooks/usePokemonByName";

type PokemonRouterQueryProps = {};

export const PokemonRouterQuery = ({}: PokemonRouterQueryProps) => {
  const [pokemonId, setPokemonId] = useState("");

  return (
    <>{Boolean(pokemonId) ? <PokemonRoutered /> : <PokemonListRoutered />}</>
  );
};

type NumberUseStateFn<S> = [S, Dispatch<SetStateAction<S>>];

type PokemonsProps = {};

export const PokemonListRoutered = () => {
  const pokemonQuery = usePokemon();

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
              [...pokemonQuery.data, ...pokemonQuery.data.sort()].map(
                (pokemon) => (
                  <li key={pokemon.name}>
                    <Link to={`${pokemon.name}`}>{pokemon.name}</Link>
                  </li>
                ),
              )}
          </ul>
        )}
      </section>
    </div>
  );
};

export const PokemonRoutered = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const pokemonQuery = usePokemonByName({ pokemonName: pokemonId });

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
