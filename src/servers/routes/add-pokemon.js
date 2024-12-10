import Pokemon from "../../bll/pokemon/pokemon.js";

export default function routeAddPokemon(req, res, pokedex) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    if (
      !data?.hasOwnProperty("name") ||
      !data?.hasOwnProperty("type") ||
      !data?.hasOwnProperty("stage")
    ) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 400;
      res.end();
      return;
    }
    console.log(`data: ${data.name}`);
    const upperName = capitalizeFirstLetter(data.name);
    const newPokemon = new Pokemon(upperName, data.type, data.stage);
    pokedex.add(newPokemon);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end();
  });
}

function capitalizeFirstLetter(str) {
  if (!str) return str;
  const firstChar = str.charAt(0);
  return firstChar === firstChar.toUpperCase()
    ? str
    : firstChar.toUpperCase() + str.substring(1);
}
