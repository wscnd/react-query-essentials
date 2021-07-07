import React, { Dispatch, SetStateAction, useState } from "react";
import { usePokemon } from "./hooks/usePokemon";
import { usePokemonByName } from "./hooks/usePokemonByName";

type PokemonRelatedQueriesProps = {};

export const PokemonRelatedQueries = ({}: PokemonRelatedQueriesProps) => {
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
              pokemonQuery.data.map((pokemon) => (
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
  const pokemonQuery = usePokemonByName({ pokemonName: pokemonId });
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
