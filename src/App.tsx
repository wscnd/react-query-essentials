import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import axios from "axios";

export interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const queryInfo = useQuery<Pokemon[]>(
    "pokemon",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return axios("https://pokeapi.co/api/v2/pokemon").then(
        (res) => res.data.results,
      );
      // .then((data) => {
      //   throw new Error("Error message");
      // });
    },
    // { refetchOnWindowFocus: false },
  );

  console.log(queryInfo);

  return (
    <div className="App">
      {queryInfo.isFetching ? (
        <span className="Spacing">Updating...</span>
      ) : null}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {queryInfo.isLoading
          ? "...Loading..."
          : queryInfo.isError
          ? ` ${queryInfo.error}`
          : queryInfo.data?.length &&
            queryInfo.data.map((pokemon) => (
              <div key={pokemon.name}>{pokemon.name}</div>
            ))}
      </header>
    </div>
  );
}

export default App;
