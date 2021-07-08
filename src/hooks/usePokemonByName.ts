import { useQuery } from "react-query";
import axios from "axios";

type usePokemonByNameProps = {
  pokemonName: string;
};

export type PokeApiResponse = {
  name: string;
  id: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  url?: string;
};

export const fetchPokemonByName = async (pokemonName: string) => {
  await new Promise((res) => setTimeout(res, 2000));

  return axios
    .get<PokeApiResponse>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((data) => {
      return data.data;
    });
};

export const usePokemonByName = ({ pokemonName }: usePokemonByNameProps) => {
  return useQuery(
    ["pokemon", pokemonName],
    () => fetchPokemonByName(pokemonName),
    {
      enabled: !!pokemonName,
      // retry: 1,
      retry: false,
      retryDelay: /** 1000 seconds or a fancy function**/ (failureCount) =>
        Math.min(1000 * 2 ** failureCount, 30000),
    },
  );
};
