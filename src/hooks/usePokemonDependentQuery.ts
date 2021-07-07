import axios from "axios";
import { useQuery } from "react-query";
import { PokeApiResponse } from "./usePokemonByName";

type UsePokemonDependentQuery = {
  url: string;
  name: string;
};

const usePokemonDependentQuery = ({ url, name }: UsePokemonDependentQuery) => {
  return useQuery<PokeApiResponse>(
    name,
    async () => {
      await new Promise((res) => setTimeout(res, 2000));
      return axios.get(url).then((res) => res.data);
    },
    {
      enabled: Boolean(name && url),
    },
  );
};

export { usePokemonDependentQuery };
