import { useQuery } from "react-query";
import axios from "axios";
import type { Pokemon } from "../PokemonList";

export type PokeApiResponse = {
  results: Pokemon[];
};

export const fetchPokemonList = async () => {
  await new Promise((res) => setTimeout(res, 2000));
  return axios
    .get<PokeApiResponse>("https://pokeapi.co/api/v2/pokemon")
    .then((response) => response.data.results);
};

export const usePokemon = () => {
  return useQuery<Pokemon[]>("pokemon", fetchPokemonList);
};
