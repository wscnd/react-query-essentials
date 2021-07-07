import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Pokemon } from "../PokemonList";

export type PokeApiResponse = {
  results: Pokemon[];
};

export const usePokemonPushingQuery = () => {
  const queryClient = useQueryClient();
  return useQuery<Pokemon[]>("pokemon", async () => {
    await new Promise((res) => setTimeout(res, 2000));
    const pokemons = axios
      .get<PokeApiResponse>("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.data.results);

    (await pokemons).forEach((pokemon) => {
      queryClient.setQueryData(["pokemon", pokemon.name], { ...pokemon });
    });
    return pokemons;
  });
};
