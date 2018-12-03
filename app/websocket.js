/*
  * https://github.com/websockets/ws
 */

export default class Websocket {
  constructor(socket) {
    this.ws = socket;
    this.server = null;

    this.start();
    this.server.on('connection', (ws) => {
      ws.on('message', this.incoming);
    });
  }

  async start() {
    this.server = new this.ws.Server({
      port: process.env.WS_PORT,
    });
  }

  incoming(msg) {
    console.log(`Received ${msg}`);
  }
}
