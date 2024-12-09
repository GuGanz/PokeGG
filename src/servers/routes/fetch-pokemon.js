export default function routeFetchPokemon(req, res, pokedex, args) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  const payload = JSON.stringify({ pokemon: pokedex.fetch(args[1]) });
  res.end(payload);
}
