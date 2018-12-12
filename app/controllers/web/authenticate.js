import Bcrypt from 'bcrypt';

import Crypto from 'crypto';

import Return from '../../return';

import User from '../../models/user';
import Session from '../../models/session';

export default class Authenticate {
  static async register(req, res) {
    if (req.body.email && req.body.password && req.body.name && req.body.contact) {
      try {
        const emailCheck = await User.findOne({ email: req.body.email });

        if (!emailCheck) {
          const newUser = new User({
            email: req.body.email,
            password: await Bcrypt.hash(
              req.body.password, parseInt(process.env.HASH_SALT_ROUNDS, 10),
            ),
            name: req.body.name,
            contact: req.body.contact,
          }).save();

          res.json({
            error: 0,
            message: 'You can now log in.',
          });
        } else {
          throw new Error('Username or Email is already taken.');
        }
      } catch (err) {
        res.json({
          error: 1,
          message: `${err}`,
        });
      }
    } else {
      res.json(Return.error);
    }
  }

  static async login(req, res) {
    if (req.body.email && req.body.password) {
      try {
        const findByEmail = await User.findOne({ email: req.body.email });

        if (findByEmail) {
          const passwordCompare = await Bcrypt.compare(req.body.password, findByEmail.password);

          if (passwordCompare) {
            const sessionToken = await Crypto.randomBytes(48).toString('hex');

            const session = await new Session({
              user: findByEmail._id,
              token: sessionToken,
            }).save();

            res.json({
              error: 0,
              token: sessionToken,
              user_id: findByEmail._id,
            });
          } else {
            throw new Error('Authentication details incorrect.');
          }
        } else {
          throw new Error('Authentication details incorrect.');
        }
      } catch (err) {
        res.json({
          error: 1,
          message: `${err}`,
        });
      }
    } else {
      res.json(Return.error);
    }
  }
}
