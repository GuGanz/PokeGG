import http from "node:http";

class Server {
  constructor(port, mux) {
    this.port = port;
    this.mux = mux;
  }
  listenAndServe() {
    const server = http.createServer(this.mux.handle);
    server.listen(this.port, () => {
      console.log(`Server on at port ${this.port}`);
    });
  }
}

export default Server;
