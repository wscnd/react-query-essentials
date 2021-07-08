import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import { PokemonListRoutered, PokemonRoutered } from "./PokemonRouterQuery";
import {
  PrefetchPokemonListRoutered,
  PrefetchPokemonRoutered,
} from "./PrefetchingWithRoutered";

type AppWithRouterProps = {};

export const AppWithRouter = ({}: AppWithRouterProps) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Switch>
            <Route path="/:pokemonId">
              {/* <PokemonRoutered /> */}
              <PrefetchPokemonRoutered />
            </Route>
            <Route path="/">
              {/* <PokemonListRoutered /> */}
              <PrefetchPokemonListRoutered />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
};
