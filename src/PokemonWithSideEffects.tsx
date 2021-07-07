import React, { Dispatch, SetStateAction, useReducer, useState } from "react";
import { usePokemon } from "./hooks/usePokemon";
import { usePokemonByName } from "./hooks/usePokemonByName";
import { usePokemonWithConfiguration } from "./hooks/usePokemonWithConfiguration";

type PokemonWithSideEffectsProps = {};

export const PokemonWithSideEffects = ({}: PokemonWithSideEffectsProps) => {
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
  const [count, increment] = useReducer((s) => s + 1, 0);

 /**
  * these lifecycle methods get called on every query instance
  *
  * if instead wants to call only once per query use it insice the callback function passed to the `useQuery | useMutation`
  */
  const pokemonQuery = usePokemonWithConfiguration({
    onSuccess: (data) => {
      increment();
    },
    onError: (error) => {},
    onSettled: (data, error) => {},
  });

  return (
    <div>
      <h1>Pokemons! </h1>
      <h6>fetched {count} times</h6>
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
