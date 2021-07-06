import { useQuery } from "react-query";
import axios from "axios";

type Berry = {
  name: string;
  url: string;
};

export type BerryResponse = {
  results: Berry[];
};

export const useBerries = () => {
  return useQuery("berries", async () => {
    await new Promise((res) => setTimeout(res, 2000));

    return axios
      .get<BerryResponse>("https://pokeapi.co/api/v2/berry")
      .then(({ data }) => data.results);
  });
};
