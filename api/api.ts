import express from "express";

import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import pokemon, { PokemonResponse } from "./data";

dotenv.config();

const delayTime = 1500;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// LIVE OBJECT
let pokemonDb = pokemon;

app.get("/", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, delayTime);
  });

  res.send({ pokemon: process.env.API_SERVER + "pokemon" });
});

app.get<
  "/pokemon",
  {},
  any,
  any,
  { pageNumber: number; pageSize: number },
  Record<string, any>
>("/pokemon", async (req, res) => {
  let { pageNumber = 1, pageSize = 10 } = req.query;

  pageNumber = Number(pageNumber);
  pageSize = Number(pageSize);

  const offset = (pageNumber - 1) * pageSize;
  // console.log("offset:", offset);
  const total = pokemonDb.length;
  // console.log("total:", total);
  const items = pokemonDb.slice(offset, offset + pageSize);
  const response = {
    total,
    items,
    nextPageNumber: offset + pageSize >= total ? null : pageNumber + 1,
    pageNumber,
  };

  await new Promise((resolve) => {
    setTimeout(resolve, delayTime);
  });

  res.send(response);
  console.log("response:", response);
});

app.get("/pokemon", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, delayTime);
  });

  res.send(pokemonDb);
});

app.get("/pokemon/:id", async (req, res) => {
  const { id } = req.params;

  await new Promise((resolve) => {
    setTimeout(resolve, delayTime);
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
    setTimeout(resolve, delayTime);
  });

  if (update.type.includes("error")) {
    res.status(500).end("An error occurred");
    return;
  }

  pokemonDb = pokemonDb.map((pokemon) => {
    let pokemonToUpdate = pokemon;
    if (pokemonToUpdate.id === Number(id)) {
      pokemonToUpdate = { ...pokemonToUpdate, ...update };
      console.log("updates:", update);
      console.log("updating", pokemonToUpdate.id);
    }
    return pokemonToUpdate;
  });

  res.send(pokemonDb.filter((pokemon) => pokemon.id === Number(id))[0]);
});

const port = 3001;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  console.log(process.env.API_SERVER);
});

app.get("/time", (req, res) => {
  res.send(new Date());
});
