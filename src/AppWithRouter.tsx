import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import { PokemonListRoutered, PokemonRoutered } from "./PokemonRouterQuery";

type AppWithRouterProps = {};

export const AppWithRouter = ({}: AppWithRouterProps) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Switch>
            <Route path="/:pokemonId">
              <PokemonRoutered />
            </Route>
            <Route path="/">
              <PokemonListRoutered />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
};
