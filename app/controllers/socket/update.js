import Return from '../../return';

import Auth from '../../middlewares/socket/auth';

import Gps from '../../models/gps';
/*
 * WebSocket request: { request: 'update', lat: 1, lon: 1, device: xxx, auth: xxx }
 */

class Update {
  constructor(server, ws, msg) {
    this.server = server;
    this.ws = ws;
    this.msg = msg;

    // console.log(msg);
    this.proceed();
  }

  async proceed() {
    try {
      if (await Auth.isLogged(this.msg.device, this.msg.auth) && this.msg.lat && this.msg.lon) {

        Gps.find({ device: this.msg.device }).remove().exec(); // Remove previous location.

        const gps = await new Gps({
          device: this.msg.device,
          lat: this.msg.lat,
          lon: this.msg.lon,
        }).save();

        this.ws.send(Return.success);
        await this.broadcast();
      } else {
        this.ws.send(Return.error);
      }
    } catch (err) {
      // console.log(err);
      this.ws.send(Return.error);
    }
  }

  async broadcast() {
    try {
      // const gps = await Gps.distinct('device').sort({ created_at: 'desc' });
      const gps = await Gps.find();

      this.server.clients.forEach((client) => {
        client.send(JSON.stringify({
          broadcast: 'site',
          data: gps,
        }));
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = (server, ws, msg) => new Update(server, ws, msg);
