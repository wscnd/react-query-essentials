import * as React from "react";

import axios from "axios";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQueryClient,
} from "react-query";

import type { PokemonResponse } from "../api/data";

import { Link } from "react-router-dom";

type PagedResponse = {
  total: number;
  items: PokemonResponse[];
  nextPageNumber: number | undefined;
  pageNumber: number;
};

//https://gist.github.com/ivandoric/2f770c7b8c165d76a431e34c98312d76
const fetchPokemon = ({ pageParam = 1, queryKey }: QueryFunctionContext) => {
  console.log("queryKey:", queryKey);
  console.log("pageParam:", pageParam);

  return axios
    .get<PagedResponse>("http://localhost:3001/pokemon", {
      params: {
        pageNumber: pageParam,
        pageSize: 10,
      },
    })
    .then((response) => response.data);
};

const useInfinitePokemonWithOptions = (
  options?: UseInfiniteQueryOptions<PagedResponse>,
) => {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
    ...options,
  });
};

export const PokemonInfiniteList = () => {
  const queryClient = useQueryClient();

  const pokemonsQuery = useInfinitePokemonWithOptions({
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPageNumber;
    },
  });

  const fetchMorePokemons = React.useCallback(async () => {
    await pokemonsQuery.fetchNextPage();
    console.log(
      pokemonsQuery.data?.pages[pokemonsQuery.data?.pages.length - 1]
        .nextPageNumber,
    );
  }, [pokemonsQuery]);

  return (
    <div>
      <h1>Pokemons! </h1>
      <h4>
        Current Page:{" "}
        {
          pokemonsQuery.data?.pages[pokemonsQuery.data?.pages.length - 1]
            .pageNumber
        }
      </h4>

      <div>
        <button onClick={fetchMorePokemons}>
          {pokemonsQuery.isFetchingNextPage ? "fetching..." : "fetch more"}
        </button>
        <h5>{pokemonsQuery.isFetching ? <span>fetching...</span> : null} </h5>
      </div>
      <section>
        {pokemonsQuery.isLoading ? (
          "Loading Pokemons"
        ) : (
          <ul>
            {!!pokemonsQuery.data?.pages &&
              pokemonsQuery.data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.items.map((pokemon, index) => (
                    <li key={index} className="pokemon">
                      <Link to={`/pokemon/${pokemon.id}`}>
                        {pokemon.name.english} - {pokemon.id}
                      </Link>
                    </li>
                  ))}
                  <br />
                  <br />
                  <br />
                </React.Fragment>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};
