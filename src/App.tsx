import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
function App() {

  console.log(useQuery);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
      </header>
    </div>
  );
}

export default App;
