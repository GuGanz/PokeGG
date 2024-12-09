import Pokedex from "../bll/pokedex/pokedex.js";
import routeListPokemon from "./routes/list-pokemon.js";
import routeFetchPokemon from "./routes/fetch-pokemon.js";
import routeAddPokemon from "./routes/add-pokemon.js";
import { URL } from "node:url";

const path = "pokemons";
const pokedex = new Pokedex();

class Mux {
  constructor() {}
  handle(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    console.log(`path: ${parsedUrl.pathname}`);
    const args = parsedUrl.pathname.split("/").filter(Boolean);
    if (args.length < 1 || args[0] !== path) {
      res.statusCode = 404;
      res.end();
      return;
    }

    switch (req.method) {
      case "GET":
        if (args.length === 1) {
          routeListPokemon(req, res, pokedex);
          return;
        } else if (args.length === 2) {
          routeFetchPokemon(req, res, pokedex, args);
          return;
        }
        break;
      case "POST":
        break;
      case "PUT":
        if (args.length === 1) {
          routeAddPokemon(req, res, pokedex);
          return;
        }
        break;
      case "PATCH":
        break;
      case "DELETE":
        break;
      default:
        break;
    }
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.end();
  }
}

export default Mux;
