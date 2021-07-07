import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { PokemonList } from "./PokemonList";
import { useBerries } from "./hooks/useBerries";
import { PokemonCount } from "./PokemonCount";
import { PokemonSearch } from "./PokemonSearch";
import { usePokemon } from "./hooks/usePokemon";
import { PokemonCancellableSearch } from "./PokemonCancellableSearch";
import { ToggleView } from "./ToggleView";
import { PokemonDependentQuery } from "./PokemonDependentQuery";
import { usePokemonWithInitialData } from "./hooks/usePokemonWithInitialData";
import data from "./initialPartialPokemon.json";
import { PokemonRelatedQueries } from "./PokemonRelatedQueries";

function App() {
  // const [show, toggle] = useState(true);
  // const berries = useBerries();
  // const pokemonInfo = usePokemon();
  // console.log("berries:", berries);
  //

  // const withInitialPokemon = usePokemonWithInitialData({
  //   initialData: data.results,
  // });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <PokemonSearch /> */}
        {/* <PokemonCancellableSearch /> */}
        {/* <ToggleView>
          <PokemonCount />
          <PokemonList queryInfo={pokemonInfo} />
        </ToggleView> */}
        {/* <PokemonDependentQuery /> */}

        {/* <PokemonList queryInfo={withInitialPokemon} /> */}
        <PokemonRelatedQueries />
      </header>
    </div>
  );
}

export default App;
