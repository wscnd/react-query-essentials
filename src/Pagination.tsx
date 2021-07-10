import * as React from "react";

import axios from "axios";
import { QueryObserverOptions, useQuery, UseQueryResult } from "react-query";

import type { PokemonResponse } from "../api/data";
import { Link, useParams } from "react-router-dom";

type PagedResponse = {
  total: number;
  items: PokemonResponse[];
  nextPageNumber: number | null;
  pageNumber: number;
};

const fetchPokemon = ({ page }: { page: number }) =>
  axios
    .get<PagedResponse>("http://localhost:3001/pokemon", {
      params: {
        pageNumber: page,
        pageSize: 10,
      },
    })
    .then((response) => response.data);

const usePokemonById = (
  id: string,
): UseQueryResult<PokemonResponse, unknown> => {
  return useQuery(["pokemon", id], () => {
    return axios
      .get<PokemonResponse>(`http://localhost:3001/pokemon/${id}`)
      .then((res) => res.data);
  });
};

const usePokemonWithOptions = (
  { page }: { page: number },
  options?: QueryObserverOptions<PagedResponse>,
) => {
  return useQuery({
    queryFn: () => fetchPokemon({ page }),
    queryKey: ["pokemon", { page }],
    ...options,
  });
};

export const PokemonListPagination = () => {
  const [page, setPage] = React.useState(1);

  const pokemonsQuery = usePokemonWithOptions(
    { page },
    { keepPreviousData: true }, // NOTE: better paginated queries
  );

  return (
    <div>
      <h1>Pokemons! </h1>
      <h4>Current Page: {page} </h4>

      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((page) => Math.max(page - 1, 1))}
        >
          Previous
        </button>{" "}
        <button
          disabled={
            pokemonsQuery.isPreviousData ||
            !Boolean(pokemonsQuery.data?.nextPageNumber)
          }
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
        <h5>{pokemonsQuery.isFetching ? <span>fetching...</span> : null} </h5>
      </div>
      <section>
        {pokemonsQuery.isLoading ? (
          "Loading Pokemons"
        ) : (
          <ul>
            {!!pokemonsQuery.data?.items.length &&
              pokemonsQuery.data.items.map((pokemon) => (
                <li key={pokemon.id}>
                  <Link to={`${pokemon.id}`}>{pokemon.name.english}</Link>{" "}
                  {pokemon.id}
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export const PokemonPagination = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const pokemonQuery = usePokemonById(pokemonId);

  return (
    <div>
      <div>
        {pokemonQuery.isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div>
              <h1>{pokemonQuery.data?.name?.english}</h1>
              <Link to={"/"}>Back</Link>
              <pre>type: {JSON.stringify(pokemonQuery.data?.type)}</pre>
              <pre>base: {JSON.stringify(pokemonQuery.data?.base)}</pre>
            </div>
            {pokemonQuery.isFetching ? <span>Updating...</span> : null}
          </>
        )}
      </div>
    </div>
  );
};
