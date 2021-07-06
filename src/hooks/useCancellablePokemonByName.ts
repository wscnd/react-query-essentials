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

export const useCancellablePokemonByName = ({
  pokemonName,
}: usePokemonByNameProps) => {
  return useQuery(
    ["pokemon", pokemonName],
    () => {
      // NOTE: this doesn't have async keyword in it
      const source = axios.CancelToken.source();

      const promise: Promise<PokeApiResponse> & {
        cancel?: { (): void };
      } = new Promise((res) => setTimeout(res, 1000))
        .then(async () => {
          return axios.get<PokeApiResponse>(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
            { cancelToken: source.token },
          );
        })
        .then((res) => res.data);
      promise.cancel = () => {
        source.cancel("Query was cancelled by react-query");
      };
      return promise;
    },
    {
      enabled: !!pokemonName,
    },
  );
};
