export default function routeUpdatePokemon(req, res, pokedex, args) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);

    let pokemon = pokedex.fetch(args[1]);
    if (pokemon === null) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.end();
      return;
    }
    if (data?.hasOwnProperty("name")) {
      pokemon.name = data.name;
    }
    if (data?.hasOwnProperty("type")) {
      pokemon.type = data.type;
    }
    if (data?.hasOwnProperty("stage")) {
      pokemon.stage = data.stage;
    }
    console.log(`data: ${data.name}`);
    pokedex.update(args[1], pokemon);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end();
  });
}
