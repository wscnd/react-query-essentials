import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Pokemon } from "./Pokemon";

function App() {
  const [show, toggle] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => toggle((previous) => !previous)}>show</button>

        {show ? <Pokemon queryKey="pokemon1" /> : null}
        {show ? <Pokemon queryKey="pokemon1" /> : null}
      </header>
    </div>
  );
}

export default App;
