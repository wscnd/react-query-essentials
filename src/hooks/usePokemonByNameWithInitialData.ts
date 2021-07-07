import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Pokemon } from "../PokemonList";

type usePokemonByNameWithInitialDataProps = {
  pokemonName: string;
};

export type PokeApiResponse = {
  name: string;
  id: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  url: string;
};

export const usePokemonByNameWithInitialData = ({
  pokemonName,
}: usePokemonByNameWithInitialDataProps) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["pokemon", pokemonName],
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
      initialData: () =>
        queryClient
          .getQueryData<PokeApiResponse[]>("pokemon")
          ?.find((pokemon) => pokemon.name === pokemonName),
    },
  );
};
