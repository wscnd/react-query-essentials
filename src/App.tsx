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

function App() {
  const [show, toggle] = useState(true);
  // const berries = useBerries();
  // const pokemonInfo = usePokemon();

  // console.log("berries:", berries);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <PokemonSearch /> */}
        <PokemonCancellableSearch />
        {/* <ToggleView>
          <PokemonCount />
          <PokemonList queryInfo={pokemonInfo} />
        </ToggleView> */}
      </header>
    </div>
  );
}

export default App;
