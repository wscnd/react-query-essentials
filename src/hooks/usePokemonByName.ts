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
};

export const usePokemonByName = ({ pokemonName }: usePokemonByNameProps) => {
  return useQuery(
    pokemonName,
    async () => {
      await new Promise((res) => setTimeout(res, 2000));

      return axios
        .get<PokeApiResponse>(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
        )
        .then((data) => {
          return data.data;
        });
    },
    {
      enabled: !!pokemonName,
    },
  );
};
