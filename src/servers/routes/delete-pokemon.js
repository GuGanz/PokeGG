export default function routeDeletePokemon(req, res, pokedex, args) {
  pokedex.delete(args[1]);
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end();
}
