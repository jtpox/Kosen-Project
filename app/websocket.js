import Fs from 'fs';

/*
  * https://github.com/websockets/ws
 */

export default class Websocket {
  constructor(socket) {
    this.ws = socket;
    this.server = null;

    this.start();
  }

  start() {
    this.server = new this.ws.Server({
      port: process.env.WS_PORT,
    });

    this.server.on('connection', (ws) => {
      ws.on('message', (msg) => {
        this.incoming(ws, msg);
      });
    });
  }

  incoming(ws, msg) {
    const message = JSON.parse(msg);
    // console.log(`./controllers/socket/${message.request}.js`);
    /*
     * Check if request exists in the controllers folder.
     */
    if (Fs.existsSync(`./app/controllers/socket/${message.request}.js`)) {
      let run = require(`./controllers/socket/${message.request}`)(this.server, ws, message); // Requires Websocket instance and message object.
      run = null;
    } else {
      ws.send(JSON.stringify({
        error: 1,
      }));
    }
  }
}
