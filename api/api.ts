import express from "express";

import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import pokemon, { PokemonResponse } from "./data";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// LIVE OBJECT
let pokemonDb = pokemon;

app.get("/", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  res.send({ pokemon: process.env.API_SERVER + "pokemon" });
});

app.get("/pokemon/", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  res.send(pokemonDb);
});

app.get("/pokemon/:id", async (req, res) => {
  const { id } = req.params;

  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  const foundPokemon = pokemonDb.find((p) => {
    return p.id === Number(id);
  });

  res.send(foundPokemon);
});

app.patch("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  const update: PokemonResponse = req.body;

  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  pokemonDb = pokemonDb.map((pokemon) => {
    let pokemonToUpdate = pokemon;
    if (pokemonToUpdate.id === Number(id)) {
      pokemonToUpdate = { ...pokemonToUpdate, ...update };
      pokemonToUpdate = { ...pokemonToUpdate, ...update };
      console.log("updates:", update);
      console.log("updating", pokemonToUpdate.id);
    }
    return pokemonToUpdate;
  });

  res.send(pokemonDb.filter((pokemon) => pokemon.id === Number(id)));
});

const port = 3001;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  console.log(process.env.API_SERVER);
});
