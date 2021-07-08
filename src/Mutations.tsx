import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { PokemonResponse } from "../api/data";

type PokemonRouterQueryProps = {};

export const PokemonRouterQuery = ({}: PokemonRouterQueryProps) => {
  const [pokemonId, setPokemonId] = useState("");

  return (
    <>{Boolean(pokemonId) ? <PokemonMutation /> : <PokemonListMutation />}</>
  );
};

const usePokemon = (): UseQueryResult<PokemonResponse[], unknown> => {
  return useQuery("pokemon", () => {
    return axios
      .get<PokemonResponse[]>(`http://localhost:3001/pokemon`)
      .then((res) => res.data);
  });
};

export const PokemonListMutation = () => {
  const pokemonQuery = usePokemon();
  return (
    <div>
      <h1>Pokemons! </h1>
      {pokemonQuery.isFetching ? <span>updating...</span> : null}
      <section>
        {pokemonQuery.isLoading ? (
          "Loading Pokemons"
        ) : (
          <ul>
            {!!pokemonQuery.data?.length &&
              pokemonQuery.data.map((pokemon) => (
                <li key={pokemon.id}>
                  <Link
                    to={{
                      pathname: `/${pokemon.id}`,
                      state: {
                        name: pokemon.name.english,
                        type: pokemon.type,
                      },
                    }}
                  >
                    {pokemon.name.english}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

const usePokemonById = (
  id: string,
): UseQueryResult<PokemonResponse, unknown> => {
  return useQuery(["pokemon", id], () => {
    return axios
      .get<PokemonResponse>(`http://localhost:3001/pokemon/${id}`)
      .then((res) => res.data);
  });
};

export const PokemonMutation = () => {
  const { state } = useLocation<{ name: string; type: string }>();
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const queryClient = useQueryClient();

  const pokemonById = useMutation(
    (type: string[]) =>
      axios
        .patch(`http://localhost:3001/pokemon/${pokemonId}`, { type })
        .then((res) => res.data),
    {
      onSuccess: async (result) => {
        await queryClient.invalidateQueries("pokemon");
        console.log("result:", result);
      },
    },
  );

  const pokemonQuery = usePokemonById(pokemonId);

  const onSubmitHandler = (type: string[]) => {
    console.log("adding type", type);
    const response = pokemonById.mutate(type);
    console.log("response:", response);
  };

  return (
    <div>
      <h1>{state.name} page</h1>
      <Link to={"/"}>Back</Link>
      <div>
        {pokemonQuery.isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div>
              <h2>{pokemonQuery.data?.name?.english}</h2>
              <pre>type: {JSON.stringify(state.type)}</pre>
              <pre>base: {JSON.stringify(pokemonQuery.data?.base)}</pre>
            </div>

            <EditType
              type={pokemonQuery.data?.type}
              clearOnSubmit={true}
              onSubmit={onSubmitHandler}
              submitText={
                pokemonById.isLoading
                  ? "Loading..."
                  : pokemonById.isError
                  ? "Error"
                  : pokemonById.isSuccess
                  ? "Success!"
                  : "Submit new Type"
              }
            />
            {pokemonQuery.isFetching ? <span>Updating...</span> : null}
          </>
        )}
      </div>
    </div>
  );
};

type FormProps = {
  clearOnSubmit: boolean;
  type: string[] | undefined;
  onSubmit: (type: string[]) => void;
  submitText: string;
};

const EditType = ({ clearOnSubmit, submitText, onSubmit, type }: FormProps) => {
  const [newType, setNewType] = useState("");

  return (
    <div>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit([...type!, newType]);
          if (clearOnSubmit) {
            setNewType("");
          }
        }}
      >
        <label htmlFor="pokemon">
          Types: {JSON.stringify(type)} <br />
          <input
            placeholder="add new type"
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
        </label>
        <input type="submit" value={submitText} />
      </form>
    </div>
  );
};
