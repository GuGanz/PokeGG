const http = require("http");
const port = 9001;
const path = "pokemons";
const { URL } = require("url");
let pokemons = [];

function handleGet(args, res, params) {
  console.log("is get");
  console.log(`params: ${params}`);
  if (args.length === 1) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const payload = JSON.stringify({ pokemons: routeListPokemon() });
    res.end(payload);
  } else if (args.length === 2) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const payload = JSON.stringify({ pokemon: routeFetchPokemon(args[1]) });
    res.end(payload);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.end();
  }
}
function handlePut(args, res, data) {
  console.log("is put");
  console.log(args);
  if (args.length === 1 && data?.hasOwnProperty("name")) {
    console.log(`data: ${data.name}`);
    routeAddPokemon(data.name);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.end();
  }
}
function routeListPokemon() {
  return pokemons;
}
function routeFetchPokemon(pokemonName) {
  for (let i = 0; i < pokemons.length; i++) {
    let currentPokemon = pokemons[i];
    if (isPokemon(currentPokemon, pokemonName)) {
      return currentPokemon;
    }
  }
  return "";
}
function routeAddPokemon(pokemonName) {
  if (pokemonName !== "" && routeFetchPokemon(pokemonName) === "") {
    pokemons[pokemons.length] = capitalizeFirstLetter(pokemonName);
  }
}
function routeDeletePokemon(pokemonName) {
  let deleteIndex = -1;
  for (let i = 0; i < pokemons.length; i++) {
    let currentPokemon = pokemons[i];
    if (isPokemon(currentPokemon, pokemonName)) {
      deleteIndex = i;
      break;
    }
  }
  if (deleteIndex !== -1) {
    delete pokemons[deleteIndex];
  }
}
function routeUpdatePokemon(pokemonName) {
  let updateIndex = -1;
  for (let i = 0; i < pokemons.length; i++) {
    let currentPokemon = pokemons[i];
    if (isPokemon(currentPokemon, pokemonName)) {
      updateIndex = i;
      break;
    }
  }
  if (updateIndex !== -1) {
    pokemons[updateIndex] = pokemonName;
  }
}
function isPokemon(pokemon, pokemonName) {
  return pokemon.toLowerCase() === pokemonName.toLowerCase();
}

function capitalizeFirstLetter(str) {
  if (!str) return str; // Handle empty or null strings
  const firstChar = str.charAt(0);
  return firstChar === firstChar.toUpperCase()
    ? str // Return as is if the first letter is already uppercase
    : firstChar.toUpperCase() + str.substring(1);
}

const handleFunc = (req, res) => {
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
      handleGet(args, res, parsedUrl.searchParams);
      break;
    case "POST":
      console.log("is post");
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.end();
      break;
    case "PUT":
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const data = JSON.parse(body);
        handlePut(args, res, data);
      });
      break;
    case "PATCH":
      console.log("is patch");
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.end();
      break;
    case "DELETE":
      console.log("is delete");
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.end();
      break;
    default:
      console.log("unknown method");
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.end();
      break;
  }
};

const server = http.createServer(handleFunc);
server.listen(port, () => {
  console.log(`Server on at port ${port}`);
});
