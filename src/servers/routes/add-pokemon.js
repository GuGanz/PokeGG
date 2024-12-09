export default function routeAddPokemon(req, res, pokedex) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    if (!data?.hasOwnProperty("name")) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 400;
      res.end();
      return;
    }
    console.log(`data: ${data.name}`);
    pokedex.add(data.name);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end();
  });
}
