import Bcrypt from 'bcrypt';

import Crypto from 'crypto';

import Return from '../../return';

import Device from '../../models/device';

import DeviceSession from '../../models/device_session';

class Generate {
  constructor(server, ws, msg) {
    this.ws = ws;
    this.msg = msg;
    // console.log(msg);

    // this.ws.send(Return.error);
    this.proceed();
  }

  async proceed() {
    let token = Crypto.randomBytes(48).toString('hex');
    token = Bcrypt.hashSync(token, parseInt(process.env.HASH_SALT_ROUNDS, 10)); // This will be returned to the client. The client will then have to save this into local db.
    // console.log(token);
    try {
      const device = await new Device({
        user: null,
      }).save();
  
      const session = await new DeviceSession({
        device: device._id,
        token,
      }).save();

      this.ws.send(JSON.stringify({
        device_id: device._id,
        auth_token: token,
      }));
    } catch (err) {
      this.ws.send(JSON.stringify(Return.error));
    }
  }
}

module.exports = (server, ws, msg) => new Generate(server, ws, msg);
