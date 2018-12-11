import Return from '../../return';

import Gps from '../../models/gps';
/*
 * WebSocket request: { request: 'update', lat: 1, lon: 1, device: xxx, auth: xxx }
 */

class Map {
  constructor(server, ws, msg) {
    this.server = server;
    this.ws = ws;
    this.msg = msg;

    // console.log(msg);
    this.proceed();
  }

  async proceed() {
    try {
      // const gps = await Gps.distinct('device').sort({ created_at: 'desc' });
      const gps = await Gps.find();

      this.server.clients.forEach((client) => {
        client.send(JSON.stringify({
          broadcast: 'map',
          data: gps,
        }));
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = (server, ws, msg) => new Map(server, ws, msg);
