export default function routeListPokemon(req, res, pokedex) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  const payload = JSON.stringify({ pokemons: pokedex.list() });
  res.end(payload);
}
