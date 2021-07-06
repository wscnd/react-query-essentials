import React from "react";
import { DisplayPokemon } from "./DisplayPokemon";
import { usePokemon } from "./usePokemon";

type PokemonCountProps = {};

export const PokemonCount = () => {
  const { data: pokemon } = usePokemon();

  return (
    <span className="Spacing">
      You are looking at {pokemon?.length} pokemons!
    </span>
  );
};
