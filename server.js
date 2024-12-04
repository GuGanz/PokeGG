const http = require("http");
const port = 9001;
const path = "pokemons";
const { URL } = require("url");
let pokemons = [];

function handleGet(parsedUrl, res) {
  console.log("is get");
  console.log(`params: ${parsedUrl.searchParams}`);
}
function handlePut(parsedUrl, res, data) {
  console.log("is put");
  console.log(`data: ${data.text}`);
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
      handleGet(parsedUrl, res);
      break;
    case "POST":
    case "PUT":
    case "PATCH":
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const data = JSON.parse(body);

        if (req.method === "PUT") {
          handlePut(parsedUrl, res, data);
        }
      });
      break;
    case "DELETE":
      console.log("is delete");
      break;
    default:
      console.log("unknown method");
      break;
  }

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  const payload = JSON.stringify({ text: "teste" });
  res.end(payload);
};

const server = http.createServer(handleFunc);
server.listen(port, () => {
  console.log(`Server on at port ${port}`);
});
