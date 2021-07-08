import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Link, useParams } from "react-router-dom";
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
                  <Link to={`${pokemon.id}`}>{pokemon.name.english}</Link>
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
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const pokemonQuery = usePokemonById(pokemonId);

  const onSubmitHandler = async (type: string[]) => {
    console.log("adding type", type);
    const response = await axios.post(
      `http://localhost:3001/pokemon/${pokemonId}`,
      { type },
    );
    console.log(response);
  };

  return (
    <div>
      <h1>{pokemonId} page</h1>
      <Link to={"/"}>Back</Link>
      <div>
        {pokemonQuery.isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div>
              <h2>{pokemonQuery.data?.name?.english}</h2>
              <pre>type: {JSON.stringify(pokemonQuery.data?.type)}</pre>
              <pre>base: {JSON.stringify(pokemonQuery.data?.base)}</pre>
            </div>

            <EditType
              type={pokemonQuery.data?.type}
              clearOnSubmit={true}
              onSubmit={onSubmitHandler}
              submitText={"Create Pokemon"}
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
