import Return from '../../return';

import Device from '../../models/device';

import Gps from '../../models/Gps';

export default class Index {
  /*
   * List all devices associated with the account that is logged in.
   */
  static async list(req, res) {
    try {
      const devices = await Device.find({ user: req.currentUser._id })
        .populate('user', '-password');

      res.json({
        error: 0,
        devices,
      });
    } catch (err) {
      res.json({
        error: 1,
        message: `${err}`,
      })
    }
  }

  static async add(req, res) {
    if (req.body.device_id) {
      try {
        const device = await Device.findOne({ _id: req.body.device_id });

        if (device) {
          if (!device.user) {
            await Device.findOneAndUpdate({
              _id: req.body.device_id,
            }, {
              user: req.currentUser._id,
            });

            res.json({
              error: 0,
              message: 'The device is now linked to your account.',
            });
          } else {
            throw new Error('Device is already associated with an account.');
          }
        } else {
          throw new Error('Device does not exist.');
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

  /*
   * Get current location of one of the devices.
   */
  static async location(req, res) {
    if (req.params.id) {
      try {
        const device = await Device.findOne({ _id: req.params.id, user: req.currentUser._id })
          .populate('user', '-password');

        if (device) {
          const location = await Gps.findOne({ device: req.params.id })
            .populate('device');

          res.json({
            error: 0,
            location,
          });
        } else {
          throw new Error('Device is not associated with your account.');
        }
      } catch (err) {
        res.json({
          error: 1,
          msg: `${err}`,
        });
      }
    } else {
      res.json(Return.error);
    }
  }
}
