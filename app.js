import Mux from "./src/servers/mux.js";
import Server from "./src/servers/server.js";

const port = 9001;
const mux = new Mux();
const server = new Server(port, mux);

server.listenAndServe();
