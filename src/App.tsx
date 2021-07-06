import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { PokemonList } from "./PokemonList";
import { useBerries } from "./hooks/useBerries";
import { PokemonCount } from "./PokemonCount";
import { usePokemon } from "./hooks/usePokemon";

function App() {
  const [show, toggle] = useState(true);
  const berries = useBerries();
  const pokemonInfo = usePokemon();

  // console.log("berries:", berries);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => toggle((previous) => !previous)}>show</button>
        {/* {show ? (
          <>
            <PokemonCount />
            <PokemonList queryInfo={pokemonInfo} />
          </>
        ) : null} */}
      </header>
    </div>
  );
}

export default App;
