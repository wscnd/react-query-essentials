import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DisplayPokemon } from "./DisplayPokemon";
import { useBerries } from "./hooks/useBerries";
import { PokemonCount } from "./PokemonCount";

function App() {
  const [show, toggle] = useState(true);
  const berries = useBerries();

  console.log("berries:", berries);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => toggle((previous) => !previous)}>show</button>
        {show ? (
          <>
            <PokemonCount />
            <DisplayPokemon />
          </>
        ) : null}
      </header>
    </div>
  );
}

export default App;
