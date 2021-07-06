import React from "react";
import { usePokemon } from "./hooks/usePokemon";

type PokemonCountProps = {};

export const PokemonCount = () => {
  const { data: pokemon } = usePokemon();

  return (
    <span className="Spacing">
      You are looking at {pokemon?.length} pokemons!
    </span>
  );
};
